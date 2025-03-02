import { useState } from "react";
import "./Plagiarism.css";
import Markdown from 'react-markdown';

function Plagiarism() {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (!text.trim()) {
            setResult("Please enter text to check plagiarism.");
            return;
        }

        setLoading(true);
        setResult("");

        try {
            const response = await fetch(
                "http://141.148.196.41:5000/v1/tools/plagcheck",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text }),
                }
            );
            const data = await response.json();
            console.log(data);
            setResult(data.response);
            // setResult(data.result || 'No plagiarism detected.');
        } catch (error) {
            // setResult('Error checking plagiarism. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="plagiarismSection">
            <h1>Plagiarism Detecter</h1>
            <div className="plagiarismDiv">
                <div className="plagiarismInput">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to check Plagiarism"
                    />
                    <button onClick={handleClick} disabled={loading}>
                        {loading ? "Checking..." : "Submit"}
                    </button>
                </div>
                <div className="plagiarismOutput">
                    <h4>Analysis of the Content</h4>
                    {loading ? (
                        <p className="loading">Checking plagiarism...</p>
                    ) : (
                        <Markdown>
                            {result}
                        </Markdown>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Plagiarism;
