import React from "react";
import "./FiltersProfile.css"

function FiltersProfile() {
    return (
        <div className="profileFiltersContainer">
            <div className="profileFiltersApplied">Filters applied</div>
            <form className="profileFiltersForm">
            <label><input type="checkbox" id="cbox1" value="first_checkbox"/>ASC</label>
            <label><input type="checkbox" id="cbox1" value="first_checkbox"/>DESC</label>
            <label><input type="checkbox" id="cbox1" value="first_checkbox"/>DEFAULT</label>
            </form>
        </div>
    )
}

export default FiltersProfile;