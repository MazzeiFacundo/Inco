import React, { useEffect, useState } from "react";
import "./CardDetail.css"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetail, getCurrentProductDetail } from "../../features/products/productsSlice"
import NavBar from "../NavBar/NavBar";
import ImgGallery from "../ImgGallery/ImgGallery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

function CardDetail() {

    const dispatch = useDispatch();
    const currentProduct = useSelector(productDetail)

    let params = useParams()

    useEffect(() => {
        const productDetails = dispatch(getCurrentProductDetail(params.id))
    }, []);

    return (
        <div className="cardDetailsContainer">
            <NavBar></NavBar>
            <div className="goBackCardDetailContainer">
                <FontAwesomeIcon icon={faCircleChevronLeft} className='btnGoBack' />
                <a className="goBackCardDetail" href="/home">Go back</a>
            </div>
            {
                (currentProduct || []).map((e) => {
                    console.log(currentProduct)
                    return (
                        <div className="detailsContainer">
                            <div className="detailsImgContainer">
                                <img className="detailsImg" src={`http://localhost:3001/display/getPhotoProduct?id=${e.id}`} alt="none" />
                            </div>
                            <div className="galleryContainer">
                                <ImgGallery id={e.id}></ImgGallery>
                            </div>
                            <div className="detailsTextContainer">
                                <div className="detailsTypeOf">{e.typeOfProduct}</div>
                                <div className="detailsName">{e.name}</div>
                                <div className="detailsDescription">{e.description}</div>
                                <div className="detailsPrice">{e.price}</div>
                            </div>
                            <div className="detailsTextContainer">
                                <div className="detailsTypeOf">{e.User.fullName}</div>
                                <div className="detailsTypeOf">{e.User.email}</div>
                                <div className="detailsTypeOf">{e.User.userName}</div>
                                <div className="detailsTypeOf">{e.User.telephone}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CardDetail;