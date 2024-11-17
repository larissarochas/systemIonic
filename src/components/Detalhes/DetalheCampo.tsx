import "./DetalheCampo.css";

interface DetalheCampoProps {
    title: string,
    text: string
}

const DetalheCampo = ({title, text}: DetalheCampoProps) => {
    return (
        <div id="detalhe-campo">
            <div id="detalhe-campo-top">
                <p>
                    <strong>{title}:</strong>
                </p>
            </div>
            <div id="detalhe-campo-bottom">
                <p>{text}</p>
            </div>
        </div>
    )
}

export default DetalheCampo;