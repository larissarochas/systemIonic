import { GrSearch } from "react-icons/gr";
import { FaFilter } from "react-icons/fa";

import "./SearchBox.css";

const SearchBox = () => {
    // Por enquanto sem funções

    return (
        <div id="search-box">
            <div id="search-box-top" className="search-box-line">
                <input
                 type="text" 
                 name="search-bar" 
                 id="search-bar" 
                 placeholder="Pesquisar..."
                />
                <button id="search-submit">
                    <GrSearch id="search-submit-icon" />
                </button>
            </div>
            <div id="search-box-bottom" className="search-box-line">
                <label id="search-box-filter-label" htmlFor="search-box-filter">
                    <FaFilter id="search-box-filter-icon" />
                    <p>Filtrar por:</p>
                </label>
                <button id="search-box-filter">Nome do Paciente</button>
            </div>
        </div>
    )
}

export default SearchBox;