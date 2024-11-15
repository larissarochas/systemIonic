import "./FichaCampo.css";

interface FichaCampo {
    head: string,
    info: string,
    style?: string
}

// Falta adicionar icones no campo de horário, e no data

const FichaCampo = ({head, info, style="align-start"}: FichaCampo) => {
    return (
        <div id="field">
            <div id="field-top">
                <p>{head}</p>
            </div>
            <div id="field-bottom" className={style}>
                <p>{info}</p>
            </div>
        </div>
    )
}

export default FichaCampo;