import React from "react";
import './filtersButtons.css'

interface IFilterButtons {
    buttonTitle: string;
    buttonColor: string;
    onFiltering(): any;
}

function FilterButtons( {buttonTitle, buttonColor, onFiltering} : IFilterButtons) {
    return (
       <button className="FilterButton-container" onClick={onFiltering} style={{backgroundColor: buttonColor}}>

            <p className="FilterButton-title"> {buttonTitle} </p>
       </button>
    )

}

export default FilterButtons;