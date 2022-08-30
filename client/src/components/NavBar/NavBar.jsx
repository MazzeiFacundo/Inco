import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faDoorOpen, faHome, faClipboard } from "@fortawesome/free-solid-svg-icons";
import logo from "./Inco.png"

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
                    <a className="navText" href='/Home'>
                        <img className="logoNav" src={logo} />
                    </a>
                </div>
            </div>
            <div className="textNavRight">
                <div className="profileDiv">
                    {/* <FontAwesomeIcon icon={faClipboard} className='profileIcon'></FontAwesomeIcon> */}
                    <a className="navText" href='/listProduct'>List a product</a>
                </div>
                <div className="profileDiv">
                    {/* <FontAwesomeIcon icon={faAddressCard} className='profileIcon'></FontAwesomeIcon> */}
                    <a className="navText" href='/profile'>My profile</a>
                </div>
                <div className="logOutDiv">
                    {/* <FontAwesomeIcon icon={faDoorOpen} className='profileIcon'></FontAwesomeIcon> */}
                    <a onClick={(e) => handleClick(e)} className="navText" href='/'>Log out</a>
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