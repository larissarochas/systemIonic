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

    const elementos = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ]

    return (
        <IonPage>
            <Header text="Pendentes" goBack={true} />
            <ContentContainer>
                <UserCard name="Matheus Silveira" proced="Fisioterapia" date="22/02/2024" type="pending" handleClick={switchPage} delay={0} />
                <UserCard name="Felipe Oscar Weverton" proced="Hidromassagem" date="22/02/2024" type="pending" handleClick={switchPage} delay={1} />
                {elementos.map((item, idx) => (
                    <UserCard name="Felipe Oscar Weverton" proced="Hidromassagem" date="22/02/2024" type="pending" handleClick={switchPage} delay={2 + idx} key={idx} />
                ))}
            </ContentContainer>
        </IonPage>
    )
}

export default Pendentes;