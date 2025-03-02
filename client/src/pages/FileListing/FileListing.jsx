import { useEffect, useState } from "react";
import "./FileListing.css";
import { FaLockOpen, FaTimes } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { UserState } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
// import { use } from "react";

const sampleData = [
    {
        id: 1,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Deep Learning for Image Recognition",
        author: "John Doe",
        description:
            "An overview of deep learning techniques used for image recognition.",
        site: "IEEE Explore",
        date: "2023-01-15",
        category: "Research Paper",
    },
    {
        id: 2,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Neural Networks and Their Applications",
        author: "Alice Smith",
        description: "Exploring neural networks in modern AI systems.",
        site: "Springer",
        date: "2022-08-10",
        category: "Research Paper",
    },
    {
        id: 3,
        img: "https://plus.unsplash.com/premium_photo-1663952767406-291a3424a5de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWVyaWFsJTIwdHJlZXN8ZW58MHx8MHx8fDA%3D",
        title: "Automated Tree Enumeration using LiDAR",
        author: "Michael Johnson",
        description: "A study on using LiDAR data for automated tree counting.",
        site: "ScienceDirect",
        date: "2023-05-10",
        category: "Research Paper",
    },
    {
        id: 4,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Tree Classification Using Machine Learning",
        author: "Sarah Lee",
        description:
            "An approach to tree classification based on convolutional neural networks.",
        site: "IEEE Explore",
        date: "2021-12-05",
        category: "Research Paper",
    },
    {
        id: 5,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Forest Monitoring through AI-Based Tree Counting",
        author: "David Brown",
        description:
            "Using AI and satellite imagery to monitor deforestation and tree density.",
        site: "Springer",
        date: "2022-03-18",
        category: "Research Paper",
    },
    {
        id: 6,
        img: "https://plus.unsplash.com/premium_photo-1664637350832-362f1c02344e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWVyaWFsJTIwdHJlZXN8ZW58MHx8MHx8fDA%3D",
        title: "Tree Enumeration Using UAV Imagery",
        author: "Emily Clark",
        description:
            "A novel approach using UAV imagery for tree counting and classification.",
        site: "Remote Sensing Journal",
        date: "2023-09-08",
        category: "Research Paper",
    },
    {
        id: 7,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Automating Tree Inventory in Urban Areas",
        author: "Robert White",
        description:
            "A study on using AI for tree enumeration in urban landscapes.",
        site: "Springer",
        date: "2022-05-16",
        category: "Research Paper",
    },
    {
        id: 8,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Advances in Tree Counting with AI",
        author: "Jessica Green",
        description:
            "Exploring AI-based techniques for large-scale tree enumeration.",
        site: "Nature AI",
        date: "2023-02-11",
        category: "Research Paper",
    },
    {
        id: 9,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Tree Canopy Estimation Using Deep Learning",
        author: "Daniel Carter",
        description:
            "Using deep learning models to estimate tree canopy and count trees.",
        site: "IEEE Explore",
        date: "2021-11-30",
        category: "Research Paper",
    },
    {
        id: 10,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Satellite-Based Tree Mapping",
        author: "GeoAI Lab",
        description:
            "Using satellite data to map tree distributions and density.",
        site: "Springer",
        date: "2022-10-12",
        category: "Research Paper",
    },
    {
        id: 11,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Remote Sensing for Tree Inventory",
        author: "Anna Scott",
        description:
            "Using multispectral remote sensing for tree enumeration and classification.",
        site: "Remote Sensing Journal",
        date: "2023-08-05",
        category: "Research Paper",
    },
    {
        id: 12,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "AI-Assisted Forest Census",
        author: "Kevin Brown",
        description:
            "Developing AI tools for large-scale tree enumeration and forest inventory.",
        site: "Nature AI",
        date: "2022-12-21",
        category: "Research Paper",
    },
    {
        id: 13,
        img: "https://images.unsplash.com/photo-1446080501695-8e929f879f2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFlcmlhbCUyMHRyZWVzfGVufDB8fDB8fHww",
        title: "Tree Enumeration Estimation Using Drones",
        author: "Sophia Martin",
        description:
            "Applying drone-based image analysis for tree density and enumeration.",
        site: "IEEE Explore",
        date: "2023-06-30",
        category: "Research Paper",
    },
    {
        id: 14,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Automated Forest Monitoring Using AI",
        author: "Paul Adams",
        description:
            "How AI is used to track tree count and forest health over time.",
        site: "Springer",
        date: "2022-07-22",
        category: "Research Paper",
    },
    {
        id: 15,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Mapping Tree Population Trends",
        author: "Rachel Stevens",
        description:
            "Understanding how tree population trends change with climate factors.",
        site: "Google Dataset Search",
        date: "2021-10-18",
        category: "Research Paper",
    },
    {
        id: 16,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Automated Woodland Surveys with AI",
        author: "Henry Walker",
        description: "Using AI and big data for large-scale woodland surveys.",
        site: "ScienceDirect",
        date: "2023-04-15",
        category: "Research Paper",
    },
    {
        id: 17,
        img: "https://cdn.prod.website-files.com/662bddd94c96d8c999af25ce/66eb099ccd369dcc20b672cb_uptiq-logo.svg",
        title: "Forest Change Detection Using ML",
        author: "Natalie Ford",
        description:
            "Applying machine learning for detecting tree population changes.",
        site: "Remote Sensing Journal",
        date: "2022-02-14",
        category: "Research Paper",
    },
];

const filterSettings = [
    {
        name: "Research Paper",
        id: 1,
        criteria: { site: ["IEEE Explore", "Springer", "ScienceDirect"] },
    },
    {
        name: "Datasets",
        id: 2,
        criteria: { site: ["Kaggle", "Google Dataset Search"] },
    },
];

const PLACEHOLDER_IMAGE =
    "https://plus.unsplash.com/premium_photo-1663952767406-291a3424a5de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWVyaWFsJTIwdHJlZXN8ZW58MHx8MHx8fDA%3D";

function FileListing() {
    const [currentSearch, setCurrentSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedFilters, setSelectedFilters] = useState({});
    const [results, setResults] = useState([]);
    const [tags, setTags] = useState([]);
    const [journalTags, setJournalTags] = useState([]);
    const [authorTags, setAuthorTags] = useState([]);
    const [otherTags, setOtherTags] = useState([]);
    const [topicTags, setTopicTags] = useState([]);
    const navigate = useNavigate();

    const handleClick = (e) => {};

    const updateTagsOnSearch = (tags) => {
        localStorage.setItem("RP_user_tags", tags);
    };

    const searchElastic = async (query) => {
        setCurrentSearch(query);
        setTags(generateCombinations(query));
        try {
            const response = await fetch(
                "http://141.148.196.41:5000/v1/search/elastic",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query: query }),
                }
            );
            const data = await response.json();
            console.log(data);
            setResults(data.results);
            generateTags(data);
            updateTagsOnSearch(data.tags);
        } catch (error) {
            console.error("ERROR searching ElasticDB", error);
        } finally {
            // setLoading(false);
        }
    };

    const generateTags = (data) => {
        const parameters = data.parameters;
        const results = data.results;
        const authors = new Set();
        const journals = new Set();
        const topics = new Set();
        const others = [];

        results.forEach((result) => {
            result.authors.split(", ").forEach((author) => authors.add(author));

            if (result.journal) journals.add(result.journal);

            if (result.topic) topics.add(result.topic);
        });

        if (parameters.isVerified === true) {
            others.push("Verified");
        }
        if (parameters.date) {
            others.push(parameters.date);
        }

        setAuthorTags(Array.from(authors));
        setJournalTags(Array.from(journals));
        setTopicTags(Array.from(topics));
        setOtherTags(others);
        console.log(authors, journals, topics, others);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedFilters({});
    };

    const handleFilterChange = (key, value) => {
        setSelectedFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };

    const filteredData = sampleData.filter((file) => {
        return (
            (selectedCategory === "All" ||
                file.category === selectedCategory) &&
            Object.entries(selectedFilters).every(
                ([key, value]) => value === "" || file[key] === value
            ) &&
            (currentSearch === "" ||
                file.title.toLowerCase().includes(currentSearch.toLowerCase()))
        );
    });

    function generateCombinations(phrase) {
        const words = phrase.split(" ");
        const combinations = [];
        for (let i = 0; i < words.length; i++) {
            for (let j = i; j < words.length; j++) {
                combinations.push(words.slice(i, j + 1).join(" "));
            }
        }
        return combinations;
    }

    const phrase = "Tree enumeration";
    console.log(generateCombinations(phrase));

    // Output: ['Tree', 'Tree enumeration', 'enumeration']

    useEffect(() => {
        const search = localStorage.getItem("search") || "";
        setTags(generateCombinations(search));
        searchElastic(search);
    }, []);

    const handleTagClick = (tag) => {
        searchElastic(tag);
    };

    const removeTag = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const selectedFilterOptions = filterSettings.find(
        (filter) => filter.name === selectedCategory
    )?.criteria;

    return (
        <section className="file-listing">
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={currentSearch}
                    onChange={(e) => searchElastic(e.target.value)}
                />
                <button className="searchtext" onClick={handleClick}>
                    Search
                </button>
            </div>
            <div className="MainContainer">
                <div className="MenuContainer">
                    <Form>
                        <Form.Group>
                            <Form.Label>Select Category</Form.Label>
                            <Form.Select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="All">All</option>
                                {filterSettings.map((filter) => (
                                    <option key={filter.id} value={filter.name}>
                                        {filter.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {selectedCategory !== "All" &&
                            selectedFilterOptions &&
                            Object.keys(selectedFilterOptions).map((key) => (
                                <Form.Group key={key}>
                                    <Form.Label>
                                        {key.charAt(0).toUpperCase() +
                                            key.slice(1)}
                                    </Form.Label>
                                    <Form.Select
                                        value={selectedFilters[key] || ""}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                key,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Select {key}</option>
                                        {selectedFilterOptions[key].map(
                                            (option, index) => (
                                                <option
                                                    key={index}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            )
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            ))}
                    </Form>
                </div>
                <div className="contentMainContainer">
                    <div className="contentContainer">
                        {/* <div className="tags-container">
                            {tags.map((tag) => (
                                <span key={tag} className="tag">
                                    <button onClick={() => handleTagClick(tag)}>
                                        {tag}
                                    </button>
                                    <FaTimes
                                        className="remove-tag"
                                        onClick={() => removeTag(tag)}
                                    />
                                </span>
                            ))}
                        </div> */}
                        <div className="tags-container">
                            Tags:
                            {authorTags.map((tag) => (
                                <span key={tag} className="tag">
                                    <button onClick={() => handleTagClick(tag)}>
                                        {tag}
                                    </button>
                                    <FaTimes
                                        className="remove-tag"
                                        onClick={() => removeTag(tag)}
                                    />
                                </span>
                            ))}
                            {journalTags.map((tag) => (
                                <span key={tag} className="tag">
                                    <button onClick={() => handleTagClick(tag)}>
                                        {tag}
                                    </button>
                                    <FaTimes
                                        className="remove-tag"
                                        onClick={() => removeTag(tag)}
                                    />
                                </span>
                            ))}
                            {topicTags.map((tag) => (
                                <span key={tag} className="tag">
                                    <button onClick={() => handleTagClick(tag)}>
                                        {tag}
                                    </button>
                                    <FaTimes
                                        className="remove-tag"
                                        onClick={() => removeTag(tag)}
                                    />
                                </span>
                            ))}
                            {otherTags.map((tag) => (
                                <span key={tag} className="tag">
                                    <button onClick={() => handleTagClick(tag)}>
                                        {tag}
                                    </button>
                                    <FaTimes
                                        className="remove-tag"
                                        onClick={() => removeTag(tag)}
                                    />
                                </span>
                            ))}
                        </div>
                        {/* {filteredData.map((file) => (
                            <div className="FilterResultcard" key={file.id}>
                                <div className="filter-result-img">
                                    <img src={file.img} alt="random.png" />
                                </div>
                                <div className="filterContent">
                                    <h1>{file.title}</h1>
                                    <p>- {file.author}</p>
                                    <p>{file.description}</p>
                                    <a href={file.site}>{file.site}</a>
                                </div>
                                <div className="otherDetails">
                                    <p>{file.date}</p>
                                    <button>
                                        Open <FaLockOpen />
                                    </button>
                                </div>
                            </div>
                        ))} */}
                        {results.map((result, idx) => (
                            <div
                                className="FilterResultcard"
                                key={idx}
                                onClick={() => navigate("/viewer")}
                            >
                                <div className="filter-result-img">
                                    <img
                                        src={result.img || PLACEHOLDER_IMAGE}
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="filterContent">
                                    <h1>{result.title}</h1>
                                    <p>- {result.authors}</p>
                                    <p>{result.description}</p>
                                    <a href={result.journal}>
                                        {result.journal}
                                    </a>
                                </div>
                                <div className="otherDetails">
                                    <p>{result.date}</p>
                                    <button>
                                        Open <FaLockOpen />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FileListing;
