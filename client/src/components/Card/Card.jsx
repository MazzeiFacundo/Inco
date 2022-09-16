import React from "react";
import "./Card.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp, faExchangeAlt, faDoorOpen, faBed, faBath} from "@fortawesome/free-solid-svg-icons";


function Card(
    { 
        id,
        name,
        description, 
        price,
        location,
        productWidth,
        productHeight,
        rooms,
        dorms,
        bathrooms,
        typeOfProduct, 
        UserIdUser, 
        typeOfDeals 
    }) {
    return (
        <div className="cardContainer">
            <img className="imgCard" src={`http://localhost:3001/display/getPhotoProduct?id=${id}`} alt="none" />
            <div className="allTextCardContainer">
                <div className="cardTitleContainer">
                    <div className="cardTitle">{name}</div>
                </div>
                <div className="cardHeadersContainer">
                    {/* <div className="cardText">{typeOfDeals}</div>
                    <div className="cardText">{typeOfProduct}</div> */}
                    <div className="cardTextPrice">{"USD " + "$" + price}</div>
                    <FontAwesomeIcon icon={faExchangeAlt} className='heightIcon'></FontAwesomeIcon>
                    <div className="cardText">{"Width: " + productWidth + "m"}<sup>2</sup></div>
                    <FontAwesomeIcon icon={faLongArrowAltUp} className='heightIcon'></FontAwesomeIcon>
                    <div className="cardText">{"Height: " + productHeight + "m"}<sup>2</sup></div>
                    <FontAwesomeIcon icon={faDoorOpen} className='heightIcon'></FontAwesomeIcon>
                    <div className="cardText">{rooms + " Rooms"}</div>
                    <FontAwesomeIcon icon={faBed} className='heightIcon'></FontAwesomeIcon>
                    <div className="cardText">{dorms + " Dormitory"}</div>
                    <FontAwesomeIcon icon={faBath} className='heightIcon'></FontAwesomeIcon>
                    <div className="cardText">{bathrooms + " Bathrooms"}</div>
                </div>
                <div className="cardTextLocation">{"Location: " + location}</div>
                <div className="cardDescContainer">
                    <div className="cardDescription">{description}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;