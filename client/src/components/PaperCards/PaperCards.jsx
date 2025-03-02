import { useState, useEffect } from "react";
import placeholder from "../../assets/image.png";
import "./PaperCards.css";

const searchElasticForTags = async (tags) => {
    console.log(tags);
    try {
        const response = await fetch(
            "https://chinmaydesai.site/api/v1/search/search-by-tags",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tags),
            }
        );

        if (!response.ok) throw new Error("Failed to fetch papers");

        const data = await response.json();
        console.log(data.response);
        return data.response; // Assuming it returns an array of papers
    } catch (error) {
        console.error("Error fetching papers:", error);
        return [];
    }
};

const PaperCards = () => {
    const [papers, setPapers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Doing Something");

        try {
            const storedTags = localStorage.getItem("RP_user_tags") || "";
            console.log(storedTags);
            if (storedTags.length === 0) {
                setError("No tags found in local storage.");
                return;
            }

            searchElasticForTags(storedTags).then((data) => {
                if (data.length === 0) {
                    setError("No papers found for the selected tags.");
                } else {
                    setPapers(data);
                }
            });
        } catch (err) {
            console.error("Error reading local storage:", err);
            setError("Something went wrong.");
        }
    }, []);

    return (
        <section className="popular-section">
            <div className="container">
                <div className="section-header">
                    <h2>Recommended Papers for You</h2>
                    <a href="#" className="view-all">
                        View all <span className="arrow">›</span>
                    </a>
                </div>
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="paper-card-grid">
                        {papers.slice(0, 5).map((paper, index) => (
                            <div className="paper-card" key={index}>
                                <img
                                    src={paper.img || placeholder}
                                    alt={paper.title}
                                    className="paper-img"
                                />
                                <div className="paper-details">
                                    <h3>{paper.title}</h3>
                                    <p className="author">{paper.author}</p>
                                    <div className="rating">
                                        <span className="score">
                                            {paper.authors || "N/A"}
                                        </span>
                                    </div>
                                    <a href="#" className="open-link">
                                        Open
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PaperCards;
