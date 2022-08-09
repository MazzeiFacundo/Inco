import React, { useEffect, useState } from "react";
import "./CardDetail.css"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetail, getCurrentProductDetail, currentProductDetails } from "../../features/products/productsSlice"
import NavBar from "../NavBar/NavBar";

function CardDetail() {

    const dispatch = useDispatch();
    const currentProduct = useSelector(productDetail)
    let params = useParams()
    console.log(params.id)

    useEffect(() => {
        const productDetails = dispatch(getCurrentProductDetail(params.id))
    }, []);

    return (
        <div className="cardDetailsContainer">
            <NavBar></NavBar>

            {
                (currentProduct || []).map((e) => {
                    console.log(currentProduct)
                    return (
                        <div className="detailsContainer">
                            <div className="detailsImgContainer">
                                <img className="detailsImg" src={`http://localhost:3001/display/getPhotoProduct?id=${e.id}`} alt="none" />
                            </div>
                            <div className="detailsTextContainer">
                                <div className="detailsTypeOf">{e.typeOfProduct}</div>
                                <div className="detailsName">{e.name}</div>
                                <div className="detailsDescription">{e.description}</div>
                                <div className="detailsPrice">{e.price}</div>
                            </div>
                        </div>
                    )
                })
            }

            {/* {
                currentProduct ?
                    <div className="cardContainer">
                        <img className="imgCard" src={`http://localhost:3001/display/getPhotoProduct?id=${currentProduct.id}`} alt="none" />
                        <div className="cardTextContainer">
                            <div className="cardTitle">{currentProduct.name}</div>
                            <div>{currentProduct.typeOfDeals}</div>
                            <div>{currentProduct.typeOfProduct}</div>
                            <div>{currentProduct.price}</div>
                            <div className="cardDescription">{currentProduct.description}</div>
                        </div></div> : <div>Loading</div>
            } */}
        </div>
    )
}

export default CardDetail;