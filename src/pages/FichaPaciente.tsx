import { IonAlert, IonPage, useIonRouter } from "@ionic/react";
import Header from "../components/layout/Header";
import ContentContainer from "../components/layout/ContentContainer";
import FichaCampo from "../components/FichaPaciente/FichaCampo";

import "./FichaPaciente.css";
import FichaButton from "../components/FichaPaciente/FichaButton";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../main";
import { useParams } from "react-router";
import { SQLiteValues } from "jeep-sqlite";

const formatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL"
})

interface FichaProps {
    consulta_id: number,
    paciente_nome: string,
    paciente_ddd: number,
    paciente_celular: string,
    paciente_cpf: string,
    consulta_data: Date,
    consulta_horario: string,
    procedimento_nome: string,
    forma_pagamento: string,
    consulta_valor: number,
    consulta_pagamento: Date,
}

const FichaPaciente = () => {
    const notification = useContext(AppContext)?.notificationContext;
    const db = useContext(AppContext)?.databaseContext;
    const [info, setInfo] = useState<FichaProps | null>();
    const {id} = useParams<{id: string}>();
    const [alert, setAlert] = useState(false);
    const router = useIonRouter();

    useEffect(() => {
        if (db?.initialized) {
            db.SQLQuery(`SELECT consultas.id as consulta_id,
                                 pacientes.nome as paciente_nome,
                                 pacientes.ddd as paciente_ddd,
                                 pacientes.celular as paciente_celular,
                                 pacientes.cpf as paciente_cpf,
                                 consultas.data as consulta_data,
                                 consultas.horario as consulta_horario,
                                 procedimentos.nome as procedimento_nome,
                                 formas_pagamento.tipo as forma_pagamento,
                                 consultas.valor as consulta_valor,
                                 consultas.data_pagamento as consulta_pagamento
                    FROM consultas
                    JOIN pacientes on pacientes.id = consultas.paciente_id
                    JOIN procedimentos on procedimentos.id = consultas.procedimento_id
                    JOIN formas_pagamento on formas_pagamento.id = consultas.forma_pagamento
                    WHERE consultas.id = ${id}
                `)
            .then((data: SQLiteValues | void) => {
                if (data?.values) {
                    const result = data.values[0];
                    setInfo({
                        consulta_id: result.consulta_id,
                        consulta_data: result.consulta_data,
                        consulta_horario: result.consulta_horario,
                        consulta_pagamento: result.consulta_pagamento,
                        consulta_valor: result.consulta_valor,
                        paciente_celular: result.paciente_celular,
                        paciente_cpf: result.paciente_cpf,
                        paciente_ddd: result.paciente_ddd,
                        paciente_nome: result.paciente_nome,
                        procedimento_nome: result.procedimento_nome,
                        forma_pagamento: result.forma_pagamento
                    })
                }
            });
        }
    }, [db?.initialized])

    const accept = async () => {
        if (db?.initialized) {
            await db.SQLAction(`UPDATE consultas SET status = 1 WHERE id = ${id}`);

            notification?.setNotification({
                duration: 4,
                status: "accepted",
                msg: "Você acaba de aceitar um atendimento!"
            });
            router.goBack();
        }
    }

    const decline = async (reason: {0: string}) => {
        if (db?.initialized) {
            reason[0] = reason[0] !== "" ? reason[0] : "Nenhum motivo informado.";

            await db.SQLAction(`UPDATE consultas SET status = 2, observacao = '${reason[0]}' WHERE id = ${id}`);

            notification?.setNotification({
                duration: 4,
                status: "denied",
                msg: "Você acaba de recusar um atendimento!"
            });
            router.goBack();
        }
    }

    const showAlert = () => {
        setAlert(true);
    }

    return (
        <IonPage>
            <Header text="Ficha Paciente" goBack={true} />
            <ContentContainer>
                <div className="ficha-container">
                    <FichaCampo head="Código" info={info?.consulta_id.toString() ?? ""} />
                    <FichaCampo head="Nome paciente" info={info?.paciente_nome ?? ""} />
                    <div id="ficha-telefone">
                        <FichaCampo head="DDD" info={info?.paciente_ddd.toString() ?? ""} style="align-middle"/>
                        <FichaCampo head="Celular" info={info?.paciente_celular ?? ""} />
                    </div>
                    <FichaCampo head="CPF" info={info?.paciente_cpf ?? ""} />
                </div>
                <div id="dados-servico-header">
                    <div id="dados-servico-header-line"></div>
                    <div id="dados-servico-header-box">
                        <p>Dados Serviço</p>
                    </div>
                </div>
                <div className="ficha-container">
                    <div className="dados-servico-divided-container">
                        <FichaCampo head="Data:" info={info?.consulta_data.toString() ?? ""} style="align-middle" />
                        <FichaCampo head="Horário:" info={info?.consulta_horario ?? ""} style="align-middle" />
                    </div>
                    <FichaCampo head="Procedimento" info={info?.procedimento_nome ?? ""} />
                    <FichaCampo head="Forma de Pagamento" info={info?.forma_pagamento ?? ""} />
                    <div className="dados-servico-divided-container">
                        <FichaCampo head="Valor" info={formatter.format(info?.consulta_valor ?? 0) ?? ""} />
                        <FichaCampo head="Pagamento" info={info?.consulta_pagamento.toString() ?? ""} style="align-middle" />
                    </div>
                </div>
                <div id="ficha-buttons">
                    <FichaButton type="recusar" handleClick={showAlert} />
                    <FichaButton type="aceitar" handleClick={accept} />
                </div>
                <IonAlert
                 header="Recusar"
                 isOpen={alert}
                 onDidDismiss={() => setAlert(false)}
                 buttons={[
                    {
                        role: "cancel",
                        text: "Cancelar",
                        cssClass: "alert-button"
                    },
                    {
                        role: "confirm",
                        text: "Confirmar",
                        cssClass: "alert-button",
                        handler: (data) => decline(data)
                    }
                 ]}
                 inputs={[
                    {
                        placeholder: "Motivo",
                        id: "alert-input"
                        
                    }
                 ]}
                ></IonAlert>
            </ContentContainer>
        </IonPage>
    )
}

export default FichaPaciente;