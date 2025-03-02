import "./Home.css";
import placeholder from "../../assets/image.png";
import { FaSearch, FaComments, FaHandshake } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaperCards from "../../components/PaperCards/PaperCards";

function Home() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // localStorage.setItem(
        //     "tags",
        //     JSON.stringify([
        //         "Chinmay Desai",
        //         "climate",
        //         "impact",
        //         "effect",
        //         "Shaanveer Singh",
        //         "IoT",
        //         "Gautam Rai",
        //     ])
        // );
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value);
        localStorage.setItem("search", e.target.value);
    };

    return (
        <>
            <main>
                <section className="hero-section">
                    <div className="container">
                        <h1>Explore Research Papers at your fingertips</h1>
                        <div className="search-container">
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="Search for Papers you need"
                                    value={search}
                                    onChange={handleChange}
                                />
                                <button
                                    className="search-btn"
                                    onClick={() => navigate("/filterlist")}
                                >
                                    Search
                                </button>
                            </div>
                            <div className="filter-buttons">
                                <button className="filter-btn">Category</button>
                                <button className="filter-btn">Year</button>
                                <button className="filter-btn">Author</button>
                                <button className="filter-btn">
                                    Citations
                                </button>
                                <button className="filter-btn">Keywords</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="browse-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>Browse Paper in your field</h2>
                            <a href="#" className="view-all">
                                View all <span className="arrow">›</span>
                            </a>
                        </div>
                        <div className="category-list">
                            <div className="category-item">
                                <div className="category-icon">
                                    <i className="fas fa-link"></i>
                                </div>
                                <span>Blockchain ⚙️</span>
                            </div>
                            <div className="category-item">
                                <div className="category-icon">
                                    <i className="fas fa-link"></i>
                                </div>
                                <span>IoT 🌐</span>
                            </div>
                            <div className="category-item">
                                <div className="category-icon">
                                    <i className="fas fa-link"></i>
                                </div>
                                <span>Remote Sensing 🎮</span>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* Use the new PaperCards component here instead of the original section */}
                <PaperCards />

                <section className="how-it-works-section">
                    <div className="container">
                        <h2>How it works</h2>
                        <p className="section-subtitle">
                            Effortlessly find, connect, and research the perfect
                            papers for yourself.
                        </p>

                        <div className="features-container">
                            <div className="feature">
                                <div className="feature-icon">
                                    <FaSearch size={40} color="#3D7A81" />{" "}
                                    {/* Search icon */}
                                </div>
                                <h3>Explore</h3>
                                <p>
                                    Browse through various different platforms.
                                </p>
                            </div>

                            <div className="feature">
                                <div className="feature-icon">
                                    <FaComments size={40} color="#3D7A81" />{" "}
                                    {/* Message icon */}
                                </div>
                                <h3>Connect</h3>
                                <p>Find the perfect paper for your projects</p>
                            </div>

                            <div className="feature">
                                <div className="feature-icon">
                                    <FaHandshake size={40} color="#3D7A81" />{" "}
                                    {/* Hire icon */}
                                </div>
                                <h3>Get quotes and hire</h3>
                                <p>
                                    Receive quotes from interested contractors.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;
