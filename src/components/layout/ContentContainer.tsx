import { IonContent } from "@ionic/react"

import "./ContentContainer.css";

interface Container {
    type?: string,
    children: React.ReactNode
}

const ContentContainer = ({type="container_default", children}: Container) => {
    return (
        <IonContent fullscreen>
            <div id="container" className={type}>
                {children}
            </div>
        </IonContent>
    )
}

export default ContentContainer;