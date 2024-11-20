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