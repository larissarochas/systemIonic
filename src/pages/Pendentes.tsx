import { IonPage, useIonRouter } from "@ionic/react";
import Header from "../components/layout/Header";
import ContentContainer from "../components/layout/ContentContainer";
import UserCard from "../components/UserCard";

const Pendentes = () => {
    const router = useIonRouter();

    const switchPage = () => {
        // incompleto por enquanto
        router.push("/ficha/2");
    }

    return (
        <IonPage>
            <Header text="Pendentes" goBack={true} />
            <ContentContainer>
                <UserCard name="Matheus Silveira" proced="Fisioterapia" date="22/02/2024" type="pending" handleClick={switchPage} />
                <UserCard name="Felipe Oscar Weverton" proced="Hidromassagem" date="22/02/2024" type="pending" handleClick={switchPage} />
            </ContentContainer>
        </IonPage>
    )
}

export default Pendentes;