import { IonHeader, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { FaAngleLeft } from "react-icons/fa";
import "./Header.css";

interface HeaderProps {
    type?: string,
    text: string,
    goBack: boolean;
}

const Header = ({type="small-header", text, goBack}: HeaderProps) => {
    const router = useIonRouter();

    const returnPage = () => {
        router.goBack();    
    }

    return (
        <IonHeader id="header" className={type}>
            <IonToolbar id="toolbar">
                {goBack && (
                    // <IonButtons id="header-icon-container" slot="start">
                    //     <IonButton id="header-icon" onClick={returnPage}>
                    //         <IonIcon id="icon" icon={chevronBack}></IonIcon>
                    //     </IonButton>
                    // </IonButtons>
                    <button id="header-icon-container" onClick={returnPage}>
                        <FaAngleLeft id="header-icon" />
                    </button>
                )}
                <IonTitle id="header-title">{text}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header;