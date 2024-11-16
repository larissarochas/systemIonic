import { IonPage } from "@ionic/react";
import Header from "../components/layout/Header";
import ContentContainer from "../components/layout/ContentContainer";
import SearchBox from "../components/Relatorios/SearchBox";
import UserCard from "../components/UserCard";

import "./Relatorios.css";

const Relatorios = () => {
    const switchPage = () => {
        // Abrir relatório do paciente
    }

    return (
        <IonPage id="relatorios-page">
            <Header text="Relatórios" goBack={true} />
            <ContentContainer>
                <SearchBox />
                <div id="consultas-list">
                    <UserCard name="José da Silva Ferreira" proced="Crosspilates" date="08/12/2024" type="accepted" handleClick={switchPage} delay={0} />
                    <UserCard name="Maria Talíta Pereira" proced="Microagulhamento" date="28/03/2025" type="denied" handleClick={switchPage} delay={1} />
                </div>
            </ContentContainer>
        </IonPage>
    )
}

export default Relatorios;