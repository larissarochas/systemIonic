import "./FichaButton.css";

interface FichaButton {
    type: string,
    handleClick: () => void
}

const FichaButton = ({type, handleClick}: FichaButton) => {
    return (
        <button className={`ficha-button ${type}`} onClick={handleClick}>
            <p>{type === "aceitar" ? "Aceitar" : "Recusar"}</p>
        </button>
    )
}

export default FichaButton;