import React from "react";
import "./CardProfile.css"

function CardProfile({ id, name, description, price, typeOfProduct, image, UserIdUser, typeOfDeals }) {
    return (
        <div className="cardContainerP">
            <img className="imgCardP" src={`http://localhost:3001/display/getPhotoProduct?id=${id}`} alt="none"/>
            <div className="cardTextContainerP">
                <div className="cardTitleP">{name}</div>
                <div>{typeOfProduct}</div>
                <div>{price}</div>
                <div className="cardDescriptionP">{description}</div>
            </div>
        </div>
    )
}

export default CardProfile;