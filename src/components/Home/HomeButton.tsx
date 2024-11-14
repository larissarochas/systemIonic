import { useIonRouter } from "@ionic/react";

import "./HomeButton.css";

interface Button {
    text: string,
    link: string
}

const HomeButton = ({text, link}: Button) => {
    const router = useIonRouter();

    const handleRoute = () => {
        router.push(link);
    }

    return (
        <button onClick={handleRoute} className="home_button">
            {text}
        </button>
    )
}

export default HomeButton;