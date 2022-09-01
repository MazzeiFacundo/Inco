import React, { useEffect, useState } from "react";
import "./CardDetail.css"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetail, getCurrentProductDetail } from "../../features/products/productsSlice"
import NavBar from "../NavBar/NavBar";
import ImgGallery from "../ImgGallery/ImgGallery";
import BottomHeader from "../BottomHeader/BottomHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp, faExchangeAlt, faDoorOpen, faBed, faBath } from "@fortawesome/free-solid-svg-icons";

function CardDetail() {

    const dispatch = useDispatch();
    const currentProduct = useSelector(productDetail)

    let params = useParams()

    useEffect(() => {
        const productDetails = dispatch(getCurrentProductDetail(params.id))
    }, []);

    return (
        <div className="detail-p-general-container">
            <NavBar></NavBar>
            {/* <div className="goBackCardDetailContainer">
                <FontAwesomeIcon icon={faCircleChevronLeft} className='btnGoBack' />
                <a className="goBackCardDetail" href="/home">Go back</a>
            </div> */}
            {
                (currentProduct || []).map((e) => {
                    console.log(currentProduct)
                    return (
                        <div className="detail-p-container">
                            <div className="detail-p-gallery-component-container">
                                <div className="detail-p-img-container">
                                    <img className="detail-p-img" src={`http://localhost:3001/display/getPhotoProduct?id=${e.id}`} alt="none" />
                                </div>
                                <ImgGallery className="detail-p-gallery-imgs-container" id={e.id}></ImgGallery>
                            </div>

                            <div className="detail-p-all-text-container">
                                <div className="detail-p-name-text">{e.name}</div>
                                <div className="detail-p-type-of-text-container">
                                    {e.typeOfDeals.map((el) => {
                                        return (
                                            <div className="detail-p-type-of-text">{e.typeOfProduct + " for " + el.name.toLowerCase()}</div>
                                        )
                                    })}
                                </div>
                                <div className="detail-p-price-text">{"USD " + "$" + e.price}</div>

                                <div className="detail-p-accomodations-container">
                                    <FontAwesomeIcon icon={faDoorOpen} className='detail-p-accomodations-icon'></FontAwesomeIcon>
                                    <div className="detail-p-accomodations-text">{e.rooms + " Rooms"}</div>
                                    <FontAwesomeIcon icon={faBed} className='detail-p-accomodations-icon'></FontAwesomeIcon>
                                    <div className="detail-p-accomodations-text">{e.dorms + " Dormitory"}</div>
                                    <FontAwesomeIcon icon={faBath} className='detail-p-accomodations-icon'></FontAwesomeIcon>
                                    <div className="detail-p-accomodations-text">{e.bathrooms + " Bathrooms"}</div>
                                </div>
                              
                                <div className="detail-p-measurements-container">
                                    <FontAwesomeIcon icon={faExchangeAlt} className='detail-p-measurements-icon'></FontAwesomeIcon>
                                    <div className="detail-p-measurements-text">{"Width: " + e.productWidth + "m"}<sup>2</sup></div>
                                    <FontAwesomeIcon icon={faLongArrowAltUp} className='detail-p-measurements-icon'></FontAwesomeIcon>
                                    <div className="detail-p-measurements-text">{"Height: " + e.productHeight + "m"}<sup>2</sup></div>
                                </div>

                                <div className="detail-p-description-text-container">
                                    <div className="detail-p-description-text">{e.description}</div>
                                </div>
                                <div className="detail-p-user-data-container">
                                    <img className="detail-p-user-img" src={`http://localhost:3001/users/getPhotoUser?userName=${e.User.userName}`} alt="none" />
                                    <div className="detail-p-user-text-container">
                                        <div className="detail-p-user-name-text">{e.User.fullName}</div>
                                        <div className="detail-p-user-email-text">{e.User.email}</div>
                                        <div className="detail-p-user-tel-text">{"Contact number: " + e.User.telephone}</div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    )
                })
            }
            <BottomHeader></BottomHeader>
        </div>
    )
}

export default CardDetail;