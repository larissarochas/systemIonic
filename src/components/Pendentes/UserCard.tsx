import { useIonRouter } from "@ionic/react";
import "./UserCard.css";

interface Card {
    name: string,
    proced: string,
    date: string
}

const UserCard = ({name, proced, date}: Card) => {
    const router = useIonRouter();

    const switchPage = () => {
        // incompleto por enquanto
        router.push("/ficha/2");
    }

    return (
        <div className="card" onClick={switchPage}>
            <div className="card-color"></div>
            <div className="card-content">
                <div className="card-content-top">
                    <h2>{name}</h2>
                </div>
                <div className="card-content-bottom">
                    <div className="card-content-bottom-left">
                        <p>Procedimento:</p>
                        <p>{proced}</p>
                    </div>
                    <div className="card-content-bottom-right">
                        <p>Data:</p>
                        <p>{date}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;