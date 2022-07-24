import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css"

export default function NavBar() {
    const location = useLocation();

    return (
        <nav className="nav">
            <Link className="navText" to='/mazzeiPortfolio'>Home</Link>
            <Link className="navText" to='/mazzeiPortfolio/summary'>Summary</Link>
            <Link className="navText" to='/mazzeiPortfolio/myProjects'>Projects</Link>
            <Link className="navText" to='/mazzeiPortfolio/contact'>Contact</Link>

            {/* <Link className="textNav" to='/'>Web Developer</Link>
            <Link className="navText" to='/'>Home</Link>
            <Link className="navText" to='/summary'>Summary</Link>
            <Link className="navText" to='/myProjects'>Projects</Link>
            <Link className="navText" to='/contact'>Contact</Link> */}
        </nav>
    )
}