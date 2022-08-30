import React from "react";
import "./CardProfile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp, faExchangeAlt, faDoorOpen, faBed, faBath} from "@fortawesome/free-solid-svg-icons";

function CardProfile({ id,
    name,
    description, 
    price,
    productWidth,
    productHeight,
    rooms,
    dorms,
    bathrooms,
    typeOfProduct, 
    UserIdUser, 
    typeOfDeals  }) {
    return (
        <div className="cardContainerP">
            <img className="imgCardP" src={`http://localhost:3001/display/getPhotoProduct?id=${id}`} alt="none"/>
            <div className="cardTextContainerP">
                <div className="cardTitleP">{name}</div>
                <div className="cardTextPriceP">{"USD " + "$" + price}</div>
                {/* <div>{typeOfProduct}</div>
                <div>{price}</div> */}
                <div className="cardHeadersContainerP">
                    {/* <div className="cardText">{typeOfDeals}</div>
                    <div className="cardText">{typeOfProduct}</div> */}
                    <FontAwesomeIcon icon={faExchangeAlt} className='heightIcon'></FontAwesomeIcon>
                    <div className="cardTextP">{"Width: " + productWidth + "m"}<sup>2</sup></div>
                    <FontAwesomeIcon icon={faLongArrowAltUp} className='heightIcon'></FontAwesomeIcon>
                    <div className="cardTextP">{"Height: " + productHeight + "m"}<sup>2</sup></div>
                    <FontAwesomeIcon icon={faDoorOpen} className='heightIcon'></FontAwesomeIcon>
                    <div className="cardTextP">{rooms + " Rooms"}</div>
                    <FontAwesomeIcon icon={faBed} className='heightIcon'></FontAwesomeIcon>
                    <div className="cardTextP">{dorms + " Dormitory"}</div>
                    <FontAwesomeIcon icon={faBath} className='heightIcon'></FontAwesomeIcon>
                    <div className="cardTextP">{bathrooms + " Bathrooms"}</div>
                </div>
                {/* <div className="cardDescriptionP">{description}</div> */}
            </div>
        </div>
    )
}

export default CardProfile;