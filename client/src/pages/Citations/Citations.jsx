import { useState } from 'react';
import './Citations.css';
import Markdown from 'react-markdown';


function Citations() {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (!text.trim()) {
            setResult('Please enter text to check citation.');
            return;
        }

        setLoading(true);
        setResult('');

        try {
            const response = await fetch('http://141.148.196.41:5000/v1/tools/citations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();
            setResult(data.response);
        } catch (error) {
            setResult('Error checking citation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='citationSection'>
            <h1>Citation Generator</h1>
            <div className="citationDiv">
                <div className="citationInput">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Enter text to check citation'
                    />
                    <button onClick={handleClick} disabled={loading}>
                        {loading ? 'Checking...' : 'Submit'}
                    </button>
                </div>
                <div className="citationOutput">
                    {/* <h1>Citations</h1> */}
                    {loading ? (
                        <p className="loading">Checking citation...</p>
                    ) : (
                        <>
                            <h4>Citations</h4>
                            <Markdown>{result}</Markdown>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Citations;
