import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css"
import user1 from "C:/Users/facum/Facu Programacion/PI-Videogames-main/client/src/resources/5700c04197ee9a4372a35ef16eb78f4e.png"

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();


    async function handleClick(e) {
        e.preventDefault();
        window.localStorage.removeItem("userCredentials");
        navigate("/");
        window.location.reload();
    }

    return (
        <nav className="nav">

            <Link className="navText" to='/Home'>Home</Link>
            <Link className="navText" to='/mazzeiPortfolio/myProjects'>Projects</Link>
            <Link className="navText" to='/profile'>Profile</Link>
            <Link onClick={(e) => handleClick(e)} className="navText" to='/'>Exit</Link>

            {/* <Link className="textNav" to='/'>Web Developer</Link>
            <Link className="navText" to='/'>Home</Link>
            <Link className="navText" to='/summary'>Summary</Link>
            <Link className="navText" to='/myProjects'>Projects</Link>
            <Link className="navText" to='/contact'>Contact</Link> */}
        </nav>
    )
}