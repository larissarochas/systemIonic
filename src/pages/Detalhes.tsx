import { IonPage } from "@ionic/react"
import Header from "../components/layout/Header";
import ContentContainer from "../components/layout/ContentContainer";
import DetalheCampo from "../components/Detalhes/DetalheCampo";

import "./Detalhes.css";

const Detalhes = () => {
    return (
        <IonPage>
            <Header text="Detalhes" goBack={true} />
            <ContentContainer>
                <div id="detalhes-paciente-dados" className="detalhes-container">
                    <h2>Paciente Dados</h2>
                    <DetalheCampo title="Nome" text="José Roberto da Silva" />
                    <DetalheCampo title="Celular" text="(65) 99923-2423" />
                    <DetalheCampo title="CPF" text="030.233.754-43" />
                </div>
                <div id="detalhes-informacoes-consulta" className="detalhes-container">
                    <h2>Informações Consulta</h2>
                    <div className="detalhes-informacoes-consulta-divided-middle">
                        <DetalheCampo title="Data" text="04/11/2024" />
                        <DetalheCampo title="Horário" text="11:00 AM" />
                    </div>
                    <DetalheCampo title="Procedimento" text="Fisioterapia" />
                    <DetalheCampo title="Forma de Pagamento" text="Cartão de Crédito" />
                    <div className="detalhes-informacoes-consulta-divided-middle">
                        <DetalheCampo title="Valor" text="R$ 600,00" />
                        <DetalheCampo title="Pagamento" text="04/11/2024" />
                    </div>
                    <div id="detalhes-informacoes-consulta-status-container">
                        <p id="detalhes-informacoes-consulta-status-left">
                            <strong>Status: </strong>
                        </p>
                        <p id="detalhes-informacoes-consulta-status-right" className="detalhes-informacoes-consulta-status-accepted">
                            Aceito
                        </p>
                    </div>
                    <p id="detalhes-informacoes-consulta-observacoes">
                        <strong>Observações: </strong>
                        Nenhuma
                    </p>
                </div>
            </ContentContainer>
        </IonPage>
    )
}

export default Detalhes;
