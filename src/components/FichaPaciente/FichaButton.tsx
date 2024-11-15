import "./FichaButton.css";

interface FichaButton {
    type: string
}

const FichaButton = ({type}: FichaButton) => {
    return (
        <button className={`ficha-button ${type}`}>
            <p>{type === "aceitar" ? "Aceitar" : "Recusar"}</p>
        </button>
    )
}

export default FichaButton;