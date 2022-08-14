import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import user1 from "C:/Users/facum/Facu Programacion/PI-Videogames-main/client/src/resources/5700c04197ee9a4372a35ef16eb78f4e.png"
import { faAddressCard, faDoorOpen, faHome } from "@fortawesome/free-solid-svg-icons";

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

            <div className="textNavLeft">
                <div className="homeDiv">
                    <FontAwesomeIcon icon={faHome} className='profileIcon'></FontAwesomeIcon>
                    <Link className="navText" to='/Home'>Home</Link>
                </div>
            </div>
            <div className="textNavRight">
                <div className="profileDiv">
                    <FontAwesomeIcon icon={faAddressCard} className='profileIcon'></FontAwesomeIcon>
                    <Link className="navText" to='/profile'>My profile</Link>
                </div>
                <div className="logOutDiv">
                    <FontAwesomeIcon icon={faDoorOpen} className='profileIcon'></FontAwesomeIcon>
                    <Link onClick={(e) => handleClick(e)} className="navText" to='/'>Exit</Link>
                </div>
            </div>

            {/* <Link className="textNav" to='/'>Web Developer</Link>
            <Link className="navText" to='/'>Home</Link>
            <Link className="navText" to='/summary'>Summary</Link>
            <Link className="navText" to='/myProjects'>Projects</Link>
            <Link className="navText" to='/contact'>Contact</Link> */}
        </nav>
    )
}