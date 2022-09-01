import React from "react";
import "./BottomHeader.css"

function BottomHeader() {

    return (
        <div className="bottom-h-general-container">
            <div className="bottom-h-main-text">
            The Inco project is strictly and exclusively for demonstration and it does not intend to provide a service of any kind.
            </div>
            <div className="bottom-h-presentation-text">
            This website was created and is maintained by Facundo Mazzei, you can reach me via:
                <a className="bottom-h-single-links" href="https://www.linkedin.com/in/facundomazzei/" target="_blank">LinkedIn</a>
                <a className="bottom-h-single-links" href="https://github.com/MazzeiFacundo" target="_blank">Github</a>
                <a className="bottom-h-single-links">facundomazzeidev@gmail.com</a>
            </div>      
        </div>
    )
}

export default BottomHeader;