import React from "react";
import "./Filters.css"

function Filters() {
    return (
        <div className="filtersContainer">
            <div className="filtersApplied">Filters applied</div>
            <form className="filtersForm">
            <label><input type="checkbox" id="cbox1" value="first_checkbox"/>ASC</label>
            <label><input type="checkbox" id="cbox1" value="first_checkbox"/>DESC</label>
            <label><input type="checkbox" id="cbox1" value="first_checkbox"/>DEFAULT</label>
            </form>
        </div>
    )
}

export default Filters;