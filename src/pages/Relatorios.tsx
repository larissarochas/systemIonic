import { IonPage, useIonRouter } from "@ionic/react";
import Header from "../components/layout/Header";
import ContentContainer from "../components/layout/ContentContainer";
import SearchBox from "../components/Relatorios/SearchBox";
import UserCard from "../components/UserCard";

import "./Relatorios.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../main";
import { SQLiteValues } from "jeep-sqlite";
import { data } from "../components/db/useDb";

interface ConsultaProps {
    paciente_nome: string,
    procedimento_nome: string,
    consulta_data: string,
    consulta_status: number,
    consulta_id: number
}

const Relatorios = () => {
    const db = useContext(AppContext)?.databaseContext;
    const [consultas, setConsultas] = useState<ConsultaProps[]>([]);
    const [filtered, setFiltered] = useState<ConsultaProps[]>([]);
    const router = useIonRouter();

    useEffect(() => {
        if (db?.initialized) {
            db.SQLQuery(`SELECT pacientes.nome as paciente_nome,
                                procedimentos.nome as procedimento_nome,
                                consultas.data as consulta_data,
                                consultas.status as consulta_status,
                                consultas.id as consulta_id
                        FROM consultas
                        JOIN pacientes on pacientes.id = consultas.paciente_id
                        JOIN procedimentos on procedimentos.id = consultas.procedimento_id
                        WHERE consultas.status != 3 ORDER BY pacientes.nome
                `)
            .then((data: SQLiteValues | void) => {
                if (data?.values) {
                    const results = data.values.map(v => ({
                        consulta_data: v.consulta_data,
                        consulta_status: v.consulta_status,
                        consulta_id: v.consulta_id,
                        paciente_nome: v.paciente_nome,
                        procedimento_nome: v.procedimento_nome
                    }));

                    setConsultas(results);
                }
            })
        }
    }, [db?.initialized])

    useEffect(() => {
        filter("");
    }, [consultas])

    const switchPage = (id: number) => {
        router.push(`/detalhes/${id}`);
    }

    const filter = (text: string) => {
        if (consultas.length > 0) {
            setFiltered(consultas.filter(consulta => consulta.paciente_nome.toLowerCase().includes(text.toLowerCase())));
        }
    }

    return (
        <IonPage id="relatorios-page">
            <Header text="Relatórios" goBack={true} />
            <ContentContainer>
                <SearchBox handleFilter={filter} />
                <div id="consultas-list">
                    {filtered.length > 0 && filtered.map((consulta, idx) => (
                        <UserCard 
                         name={consulta.paciente_nome}
                         proced={consulta.procedimento_nome}
                         date={data(consulta.consulta_data)}
                         type={consulta.consulta_status === 1 ? "accepted" : "denied"} 
                         handleClick={() => switchPage(consulta.consulta_id)} 
                         delay={idx} 
                         key={idx} 
                        />
                    ))}
                </div>
            </ContentContainer>
        </IonPage>
    )
}

export default Relatorios;