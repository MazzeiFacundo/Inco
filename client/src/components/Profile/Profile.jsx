import "./Profile.css"
import CardProfile from "../CardProfile/CardProfile";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { showUserData, getCurrentUser } from "../../features/products/productsSlice"
import FiltersProfile from "../FiltersProfile/FiltersProfile";

function Profile() {

    const dispatch = useDispatch();
    const currentUser = useSelector(showUserData)

    useEffect(() => {
        const userCredentials = window.localStorage.getItem("userCredentials");
        const userToken = JSON.parse(userCredentials);
        const newUser = dispatch(getCurrentUser(userToken))
    }, []);

    const userProducts = currentUser.products

    return (
        <div className="profileContainer">
            <NavBar></NavBar>
            <div className="userData">
                <div className="userHeadline">
                    <img className="imgUser" src={`http://localhost:3001/users/getPhotoUser?userName=${currentUser.userName}`} alt="none" />
                    <div className="userHeadLineText">
                        <div className="userNameProfile">{currentUser.fullName}</div>
                        <div className="amountOfProducts">{currentUser.email}</div>
                        <div>tel: {currentUser.telephone}</div>
                    </div>
                </div>
                <div className="descriptionProfile">
                    <div className="descriptionProfileText">{currentUser.description}</div>
                </div>
                {console.log(currentUser)}

            </div>

            {console.log(currentUser.products)}
            <div className="userProducts">
                {
                    (userProducts || []).map((e) => {
                        return <CardProfile
                            key={e.id}
                            id={e.id}
                            name={e.name}
                            description={e.description}
                            price={e.price}
                            typeOfProduct={e.typeOfProduct}
                            image={e.image}
                        ></CardProfile>
                    })
                }
            </div>
            <FiltersProfile></FiltersProfile>
        </div>
    )
}

export default Profile;