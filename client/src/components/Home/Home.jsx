import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import BottomHeader from "../BottomHeader/BottomHeader";
import "./Home.css"
import { showAll, showAllAsc, showAllDesc, showAllProducts, showProducts, getProductsSearched } from "../../features/products/productsSlice"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Home() {

    const dispatch = useDispatch();
    const currentProducts = useSelector(showProducts)
    const navigate = useNavigate();

    useEffect(() => {
        const newProducts = dispatch(showAllProducts())
        const userCredentials = window.localStorage.getItem("userCredentials");
        const userToken = JSON.parse(userCredentials);
        console.log(userToken)
        if (!userToken) {
            navigate("/");
        }
    }, []);

    const [input, setInput] = useState("")

    function handleClick(e) {
        e.preventDefault()
        dispatch(getProductsSearched(input));
        setInput("")
    }

    function handleClear(e) {
        e.preventDefault()
        dispatch(getProductsSearched(""));
        setInput("")
    }

    function handleChange(e) {
        e.preventDefault();
        setInput(e.target.value);
    }


    return (
        <div className="homeContainer">
            <NavBar></NavBar>
            <div className="ara">
            <Filters></Filters>
                <div className="homeCardContainer">
                    <div className="searchContainer">
                        <input onChange={(e) => handleChange(e)} value={input} className="searchInputHome" placeholder="Search properties..."></input>
                        <button onClick={(e) => handleClick(e)} className="searchButtonHome">Search</button>
                        <button onClick={(e) => handleClear(e)} className="searchButtonHome">Reset</button>
                    </div>

                    {console.log(currentProducts)}

                    {
                        currentProducts.map((e) => {
                            return <a className="linkHome" href={"/Home/" + e.id}>
                                <Card
                                    key={e.id}
                                    id={e.id}
                                    name={e.name}
                                    description={e.description}
                                    price={e.price}
                                    productWidth={e.productWidth}
                                    productHeight={e.productHeight}
                                    rooms={e.rooms}
                                    dorms={e.dorms}
                                    bathrooms={e.bathrooms}
                                    typeOfProduct={e.typeOfProduct}
                                    typeOfDeals={e.typeOfDeals.map((e) => {
                                        return e.name
                                    })}
                                ></Card>
                            </a>
                        })
                    }
                </div>
            </div>
            <BottomHeader></BottomHeader>
        </div>
    )
}

export default Home;