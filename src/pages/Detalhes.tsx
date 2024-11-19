import { IonPage } from "@ionic/react";
import Header from "../components/layout/Header";
import ContentContainer from "../components/layout/ContentContainer";
import DetalheCampo from "../components/Detalhes/DetalheCampo";

import "./Detalhes.css";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../main";
import { SQLiteValues } from "jeep-sqlite";
import FichaCampo from "../components/FichaPaciente/FichaCampo";

interface DetalhesProps {
    consulta_id: number;
    paciente_id: number;
    paciente_nome: string;
    paciente_ddd: number;
    paciente_celular: string;
    paciente_cpf: string;
    procedimento_id: number;
    procedimento_nome: string;
    consulta_data: Date;
    consulta_horario: string;
    consulta_valor: number;
    consulta_forma_pagamento: number;
    consulta_data_pagamento: Date;
    consulta_status: number;
    consulta_observacao: string | null;
    forma_pagamento_id: number;
    forma_pagamento_tipo: string;
    status_id: number;
    status_nome: string;
}

const Detalhes = () => {
    const db = useContext(AppContext)?.databaseContext;
    const [info, setInfo] = useState<DetalhesProps | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (db?.initialized) {
            db.SQLQuery(`
                SELECT 
                    consultas.id AS consulta_id,
                    pacientes.id AS paciente_id,
                    pacientes.nome AS paciente_nome,
                    pacientes.ddd AS paciente_ddd,
                    pacientes.celular AS paciente_celular,
                    pacientes.cpf AS paciente_cpf,
                    procedimentos.id AS procedimento_id,
                    procedimentos.nome AS procedimento_nome,
                    consultas.data AS consulta_data,
                    consultas.horario AS consulta_horario,
                    consultas.valor AS consulta_valor,
                    consultas.forma_pagamento AS consulta_forma_pagamento,
                    consultas.data_pagamento AS consulta_data_pagamento,
                    consultas.status AS consulta_status,
                    consultas.observacao AS consulta_observacao,
                    formas_pagamento.id AS forma_pagamento_id,
                    formas_pagamento.tipo AS forma_pagamento_tipo,
                    status.id AS status_id,
                    status.nome AS status_nome
                FROM consultas
                JOIN pacientes ON pacientes.id = consultas.paciente_id
                JOIN procedimentos ON procedimentos.id = consultas.procedimento_id
                JOIN formas_pagamento ON formas_pagamento.id = consultas.forma_pagamento
                JOIN status ON status.id = consultas.status
                WHERE consultas.id = ${id};
            `)
            .then((data: SQLiteValues | void) => {
                if (data?.values) {
                    const result = data.values[0];

                    setInfo({
                        paciente_id: result.paciente_id,
                        paciente_nome: result.paciente_nome,
                        paciente_ddd: result.paciente_ddd,
                        paciente_celular: result.paciente_celular,
                        paciente_cpf: result.paciente_cpf,
                        procedimento_id: result.procedimento_id,
                        procedimento_nome: result.procedimento_nome,
                        consulta_data: new Date(result.consulta_data),
                        consulta_horario: result.consulta_horario,
                        consulta_valor: result.consulta_valor,
                        consulta_forma_pagamento: result.consulta_forma_pagamento,
                        consulta_data_pagamento: new Date(result.consulta_data_pagamento),
                        consulta_status: result.consulta_status,
                        consulta_id: result.consulta_id,
                        consulta_observacao: result.consulta_observacao,
                        forma_pagamento_id: result.forma_pagamento_id,
                        forma_pagamento_tipo: result.forma_pagamento_tipo,
                        status_id: result.status_id,
                        status_nome: result.status_nome
                    });
                }
            })
        }
    }, [db?.initialized]);

    return (
        <IonPage>
            <Header text="Detalhes" goBack={true} />
            <ContentContainer>
                <div className="ficha-container">
                    <FichaCampo head="Procedimento:" info={info?.procedimento_nome ?? ""} />
                    <div className="dados-servico-divided-container">
                        <FichaCampo head="Data:" info={info?.consulta_data.toLocaleDateString("pt-BR") ?? ""} style="align-middle" />
                        <FichaCampo head="Horário:" info={info?.consulta_horario ?? ""} style="align-middle" />
                    </div>
                    <FichaCampo head="Paciente:" info={info?.paciente_nome ?? ""} />
                    <FichaCampo head="CPF:" info={info?.paciente_cpf ?? ""} />
                    <FichaCampo head="Celular:" info={(info?.paciente_celular && info?.paciente_ddd) ? `(${info.paciente_ddd}) ${info.paciente_celular}` : ""} />
                    <FichaCampo head="Forma de Pagamento:" info={info?.forma_pagamento_tipo ?? ""} />
                    <div className="dados-servico-divided-container">
                        <FichaCampo head="Pagamento:" info={info?.consulta_data_pagamento.toLocaleDateString("pt-BR") ?? ""} style="align-middle" />
                        <FichaCampo head="Valor:" info={info?.consulta_valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) ?? ""} style="align-middle" />
                    </div>
                    <div id="detalhes-bottom-info">
                        <div id="detalhes-informacoes-consulta-status-container">
                            <p id="detalhes-informacoes-consulta-status-left">
                                <strong>Status: </strong>
                            </p>
                            <p
                                id="detalhes-informacoes-consulta-status-right"
                                className={info?.consulta_status === 1 ? "detalhes-informacoes-consulta-status-accepted" : "detalhes-informacoes-consulta-status-denied"}
                            >
                                {info?.status_nome ?? ""}
                            </p>
                        </div>
                        <p id="detalhes-informacoes-consulta-observacoes">
                            <strong>Observações: </strong>
                            {info?.consulta_observacao ?? "Nenhuma."}
                        </p>
                    </div>
                </div>

                {/* Código Antigo */}

                {/* <div id="detalhes-paciente-dados" className="detalhes-container">
                    <h2>Paciente Dados</h2>
                    <DetalheCampo title="Nome" text={info?.paciente_nome ?? ""} />
                    <DetalheCampo title="Celular" text={info?.paciente_celular ?? ""} />
                    <DetalheCampo title="CPF" text={info?.paciente_cpf ?? ""} />
                </div>
                <div id="detalhes-informacoes-consulta" className="detalhes-container">
                    <h2>Informações da Consulta</h2>
                    <div className="detalhes-informacoes-consulta-divided-middle">
                        <DetalheCampo title="Data" text={info?.consulta_data?.toLocaleDateString("pt-BR") ?? ""} />
                        <DetalheCampo title="Horário" text={info?.consulta_horario ?? ""} />
                    </div>
                    <DetalheCampo title="Procedimento" text={info?.procedimento_nome ?? ""} />
                    <DetalheCampo title="Forma de Pagamento" text={info?.forma_pagamento_tipo ?? ""} />
                    <div className="detalhes-informacoes-consulta-divided-middle">
                        <DetalheCampo 
                            title="Valor" 
                            text={info?.consulta_valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? ""} 
                        />
                        <DetalheCampo 
                            title="Pagamento" 
                            text={info?.consulta_data_pagamento?.toLocaleDateString("pt-BR") ?? ""} 
                        />
                    </div>
                    <div id="detalhes-informacoes-consulta-status-container">
                        <p id="detalhes-informacoes-consulta-status-left">
                            <strong>Status: </strong>
                        </p>
                        <p
                            id="detalhes-informacoes-consulta-status-right"
                            className={info?.consulta_status === 1 ? "detalhes-informacoes-consulta-status-accepted" : "detalhes-informacoes-consulta-status-denied"}
                        >
                            {info?.status_nome ?? ""}
                        </p>
                    </div>
                    <p id="detalhes-informacoes-consulta-observacoes">
                        <strong>Observações: </strong>
                        {info?.consulta_observacao ?? "Nenhuma."}
                    </p>
                </div> */}
            </ContentContainer>
        </IonPage>
    );
};

export default Detalhes;
