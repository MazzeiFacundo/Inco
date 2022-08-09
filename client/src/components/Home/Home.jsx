import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import "./Home.css"
import { showAll, showAllAsc, showAllDesc, showAllProducts, showProducts, getProductsSearched } from "../../features/products/productsSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {

    const dispatch = useDispatch();
    const currentProducts = useSelector(showProducts)
    const navigate = useNavigate();

    useEffect(() => {
        const newProducts = dispatch(showAllProducts())
        const userCredentials = window.localStorage.getItem("userCredentials");
        const userToken = JSON.parse(userCredentials);
        console.log(userToken)
        if(!userToken) {
            navigate("/");
        }
      }, []);

      const [input, setInput] = useState("")

    function handleClick(e) {
        e.preventDefault()
        dispatch(getProductsSearched(input));
        setInput("")
    }

    function handleChange(e) {
        e.preventDefault();
        setInput(e.target.value);
    }


    return (
        <div className="homeContainer">
            <NavBar></NavBar>
            <div className="homeCardContainer">
            <div className="searchContainer">
                <input onChange={(e) => handleChange(e)} className="searchInputHome" placeholder="Search properties..."></input>
                <button onClick={(e) => handleClick(e)} className="searchButtonHome">Search</button>
            </div>
                {console.log(currentProducts)}
                {
                    currentProducts.map((e) => {
                        return <Card 
                        key={e.id}
                        id={e.id}
                        name={e.name}
                        description={e.description}
                        price={e.price}
                        typeOfProduct={e.typeOfProduct}
                        typeOfDeals={e.typeOfDeals.map((e) => {
                            return e.name
                        })}
                        ></Card>
                    })
                }
            </div>
            <Filters></Filters>
        </div>
    )
}

export default Home;