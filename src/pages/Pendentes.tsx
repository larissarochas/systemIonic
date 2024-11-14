import { IonPage } from "@ionic/react";
import Header from "../components/layout/Header";
import ContentContainer from "../components/layout/ContentContainer";
import UserCard from "../components/Pendentes/UserCard";

const Pendentes = () => {
    return (
        <IonPage>
            <Header text="Pendentes" goBack={true} />
            <ContentContainer>
                <UserCard name="Matheus Silveira" proced="Fisioterapia" date="22/02/2024"/>
                <UserCard name="Felipe Oscar Weverton" proced="Hidromassagem" date="22/02/2024"/>
            </ContentContainer>
        </IonPage>
    )
}

export default Pendentes;