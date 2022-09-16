import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    showAllProducts,
    showAllProductsASC,
    showAllProductsDESC,
    showProducts,
    getProductsSearched,

    showAllProductsOneRoom,
    showAllProductsTwoRooms,
    showAllProductsThreeRooms,
    showAllProductsFourRoomsPlus,

    showAllProductsOneDorm,
    showAllProductsTwoDorms,
    showAllProductsThreeDorms,
    showAllProductsFourDormsPlus,

    showAllProductsOneBath,
    showAllProductsTwoBaths,
    showAllProductsThreeBaths,
    showAllProductsFourBathsPlus,

} from "../../features/products/productsSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp, faLongArrowAltDown } from "@fortawesome/free-solid-svg-icons";

import "./Filters.css"



function Filters() {

    const dispatch = useDispatch();
    function handleASC(e) {
        e.preventDefault();
        dispatch(showAllProductsASC())
    }

    function handleDESC(e) {
        e.preventDefault();
        dispatch(showAllProductsDESC())
    }

    function handleRooms(e) {
        e.preventDefault()
        console.log(e.target.value)
        if (e.target.value === "1") dispatch(showAllProductsOneRoom())
        if (e.target.value === "2") dispatch(showAllProductsTwoRooms())
        if (e.target.value === "3") dispatch(showAllProductsThreeRooms())
        if (e.target.value === "4") dispatch(showAllProductsFourRoomsPlus())
    }

    function handleDorms(e) {
        e.preventDefault()
        console.log(e.target.value)
        if (e.target.value === "1") dispatch(showAllProductsOneDorm())
        if (e.target.value === "2") dispatch(showAllProductsTwoDorms())
        if (e.target.value === "3") dispatch(showAllProductsThreeDorms())
        if (e.target.value === "4") dispatch(showAllProductsFourDormsPlus())
    }

    function handleBathrooms(e) {
        e.preventDefault()
        console.log(e.target.value)
        if (e.target.value === "1") dispatch(showAllProductsOneBath())
        if (e.target.value === "2") dispatch(showAllProductsTwoBaths())
        if (e.target.value === "3") dispatch(showAllProductsThreeBaths())
        if (e.target.value === "4") dispatch(showAllProductsFourBathsPlus())
    }

    function handleClear(e) {
        e.preventDefault()
        dispatch(getProductsSearched(""));
    }

    return (
        <div className="filters-general-container">
            <div className="filters-header">Filters applied</div>
            <div className="filters-container">
                <div className="filters-single-container-order">
                    <label>Price order</label>
                    <div className="filters-single-btns-container">
                        <button className="filters-single-btn-icon" onClick={(e) => handleASC(e)}>Ascending
                            <FontAwesomeIcon className="filters-single-icon" icon={faLongArrowAltUp}></FontAwesomeIcon>
                        </button>
                        <button className="filters-single-btn-icon" onClick={(e) => handleDESC(e)}>Descending
                            <FontAwesomeIcon className="filters-single-icon" icon={faLongArrowAltDown}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>

                <div className="filters-single-container">
                    <label>Rooms</label>
                    <div className="filters-single-btns-container">
                        <button value={1} onClick={(e) => handleRooms(e)} className="filters-single-btn">1</button>
                        <button value={2} onClick={(e) => handleRooms(e)} className="filters-single-btn">2</button>
                        <button value={3} onClick={(e) => handleRooms(e)} className="filters-single-btn">3</button>
                        <button value={4} onClick={(e) => handleRooms(e)} className="filters-single-btn">4+</button>
                    </div>
                </div>
                <div className="filters-single-container">
                    <label>Dorms</label>
                    <div className="filters-single-btns-container">
                        <button value={1} onClick={(e) => handleDorms(e)} className="filters-single-btn">1</button>
                        <button value={2} onClick={(e) => handleDorms(e)} className="filters-single-btn">2</button>
                        <button value={3} onClick={(e) => handleDorms(e)} className="filters-single-btn">3</button>
                        <button value={4} onClick={(e) => handleDorms(e)} className="filters-single-btn">4+</button>
                    </div>
                </div>
                <div className="filters-single-container">
                    <label>Bathrooms</label>
                    <div className="filters-single-btns-container">
                        <button value={1} onClick={(e) => handleBathrooms(e)} className="filters-single-btn">1</button>
                        <button value={2} onClick={(e) => handleBathrooms(e)} className="filters-single-btn">2</button>
                        <button value={3} onClick={(e) => handleBathrooms(e)} className="filters-single-btn">3</button>
                        <button value={4} onClick={(e) => handleBathrooms(e)} className="filters-single-btn">4+</button>
                    </div>
                </div>
            </div>
            <div className="filters-single-btns-reset-container">
                <button onClick={(e) => handleClear(e)} className="filters-single-btn-reset">Reset filters</button>
            </div>
        </div>
    )
}

export default Filters;