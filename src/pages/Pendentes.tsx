import { IonPage, useIonRouter } from "@ionic/react";
import Header from "../components/layout/Header";
import ContentContainer from "../components/layout/ContentContainer";
import UserCard from "../components/UserCard";
import { useContext, useEffect, useState } from "react";
import Notification from "../components/Notification";
import { AppContext } from "../main";
import { SQLiteValues } from "jeep-sqlite";

const Pendentes = () => {
    const db = useContext(AppContext)?.databaseContext;
    const [consultas, setConsultas] = useState<SQLiteValues | void>();
    const notificationContext = useContext(AppContext)?.notificationContext;
    const router = useIonRouter();

    function reload() {
        db?.SQLQuery(`
            SELECT pacientes.nome as paciente_nome,
                    procedimentos.nome as procedimento_nome, consultas.data as consulta_data,
                    consultas.id as consulta_id
            FROM consultas
            JOIN pacientes ON pacientes.id = consultas.paciente_id JOIN procedimentos ON procedimentos.id = consultas.procedimento_id
            WHERE consultas.status = 3
            `)
        .then((data) => setConsultas(data));
    }

    useEffect(() => {
        if (db?.initialized) {
            reload();
        }
    }, [db?.initialized, notificationContext?.notification])

    const switchPage = (id: number) => {
        router.push(`/ficha/${id}`);
    }

    return (
        <IonPage>
            <Header text="Pendentes" goBack={true} />
            <ContentContainer>
                <Notification />
                {consultas?.values && consultas.values.map((consulta, idx) => (
                    <UserCard 
                     name={consulta.paciente_nome} 
                     proced={consulta.procedimento_nome} 
                     date={new Date(consulta.consulta_data).toLocaleDateString("pt-BR")} 
                     type="pending" 
                     handleClick={() => switchPage(consulta.consulta_id)}
                     delay={idx} 
                     key={consulta.consulta_id}
                    />
                ))}
            </ContentContainer>
        </IonPage>
    )
}

export default Pendentes;