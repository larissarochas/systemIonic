import { IonButton, IonButtons, IonHeader, IonIcon, IonItem, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { chevronBack } from "ionicons/icons";

import "./Header.css";

interface Header {
    type?: string,
    text: string,
    goBack: boolean;
}

const Header = ({type="small-header", text, goBack}: Header) => {
    const router = useIonRouter();

    const returnPage = () => {
        router.goBack();    
    }

    return (
        <IonHeader id="header" className={type}>
            <IonToolbar id="toolbar">
                {goBack && (
                    <IonButtons id="header-icon-container" slot="start">
                        <IonButton id="header-icon" onClick={returnPage}>
                            <IonIcon id="icon" icon={chevronBack}></IonIcon>
                        </IonButton>
                    </IonButtons>
                )}
                <IonTitle id="header-title">{text}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header;