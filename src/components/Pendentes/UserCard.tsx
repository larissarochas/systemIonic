import "./UserCard.css";

interface Card {
    name: string,
    proced: string,
    date: string
}

const UserCard = ({name, proced, date}: Card) => {
    return (
        <div className="card">
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