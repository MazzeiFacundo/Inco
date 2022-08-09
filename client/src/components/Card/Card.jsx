import React from "react";
import "./Card.css"

function Card({ id, name, description, price, typeOfProduct, UserIdUser, typeOfDeals }) {
    return (
        <div className="cardContainer">
            <img className="imgCard" src={`http://localhost:3001/display/getPhotoProduct?id=${id}`} alt="none"/>
            <div className="cardTextContainer">
                <div className="cardTitle">{name}</div>
                <div>{typeOfDeals}</div>
                <div>{typeOfProduct}</div>
                <div>{price}</div>
                <div className="cardDescription">{description}</div>
            </div>
        </div>
    )
}

export default Card;