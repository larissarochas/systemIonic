import { IonPage } from "@ionic/react";
import Header from "../components/layout/Header";
import ContentContainer from "../components/layout/ContentContainer";
import FichaCampo from "../components/FichaPaciente/FichaCampo";

import "./FichaPaciente.css";
import FichaButton from "../components/FichaPaciente/FichaButton";

const FichaPaciente = () => {
    return (
        <IonPage>
            <Header text="Ficha Paciente" goBack={true} />
            <ContentContainer>
                <div className="ficha-container">
                    <FichaCampo head="Código" info="1325" />
                    <FichaCampo head="Nome paciente" info="José Alencar" />
                    <div id="ficha-telefone">
                        <FichaCampo head="DDD" info="65" style="align-middle"/>
                        <FichaCampo head="Celular" info="99234-5322" />
                    </div>
                    <FichaCampo head="CPF" info="020.252.345-65" />
                </div>
                <div id="dados-servico-header">
                    <div id="dados-servico-header-line"></div>
                    <div id="dados-servico-header-box">
                        <p>Dados Serviço</p>
                    </div>
                </div>
                <div className="ficha-container">
                    <div className="dados-servico-divided-container">
                        <FichaCampo head="Data:" info="10/06/2024" style="align-middle" />
                        <FichaCampo head="Horário:" info="11:00 AM" style="align-middle" />
                    </div>
                    <FichaCampo head="Procedimento" info="Fisioterapia" />
                    <FichaCampo head="Forma de Pagamento" info="Cartão de Crédito" />
                    <div className="dados-servico-divided-container">
                        <FichaCampo head="Valor" info="R$ 200,00" />
                        <FichaCampo head="Pagamento" info="02/01/2024" style="align-middle" />
                    </div>
                </div>
                <div id="ficha-buttons">
                    <FichaButton type="recusar" />
                    <FichaButton type="aceitar" />
                </div>
            </ContentContainer>
        </IonPage>
    )
}

export default FichaPaciente;