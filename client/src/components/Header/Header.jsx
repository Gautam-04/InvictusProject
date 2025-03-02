import React from "react";
import "./Header.css";
// Import the icon from assets folder
import icon from "../../assets/icon.svg";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <header className="header">
            {/* Logo and Title */}
            <div className="logo-container">
                <div className="logo">
                    {/* Replace inline SVG with imported image */}
                    <img
                        src={icon}
                        alt="RP Finder Logo"
                        width="24"
                        height="24"
                    />
                </div>
                <span className="header-title">RP Finder</span>
            </div>

            {/* Navigation Links */}
            <nav className="navigation">
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/citations" className="nav-link">
                            Citation
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/plagiarism" className="nav-link">
                            Plagiarism
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/filterlist" className="nav-link">
                            Search RPFinder
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Right Side Controls */}
            <div className="controls">
                {/* User Profile */}
                <button className="control-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {/* Login Button */}
                <button className="login" onClick={() => navigate("/auth")}>
                    Login
                </button>
            </div>
        </header>
    );
}

export default Header;
