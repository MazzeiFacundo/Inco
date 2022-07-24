import React from "react";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css"

function Home() {
    return (
        <div className="homeContainer">
            <SearchBar></SearchBar>
            <NavBar></NavBar>
        </div>
    )
}

export default Home;