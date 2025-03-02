import React, { useState, useEffect } from "react";
import "./PaperViewer.css";

const TextHighlighter = () => {
    const [highlights, setHighlights] = useState([
        {
            text: "The project aims to develop software that utilizes image and video analytics to automate tree enumeration in forest areas, facilitating efficient monitoring and informed decision-making for developmental projects. Traditional methods, such as manual surveys, are time-consuming and prone to errors. The software will employ the YOLO object detection model, specifically trained to detect trees from aerial or satellite imagery for tree enumeration, along with database management using MongoDB. This approach enables precise monitoring, early detection of changes, cost-effective forest management, and enhanced conservation efforts.",
            comments: ["Very interesting perspective on remote sensing"],
            id: 1,
        },
        {
            text: "The classification of tree species is designed to provide detailed insights into the biodiversity of the forested land. This module directly classifies the image cropped to the trees bounding boxes derived from the previous module and not the whole image. This provides a more accurate and individual classification for the trees. (More detailed description after development)",
            comments: ["I don't think that would be feasible"],
            id: 2,
        },
    ]);
    const [selectedText, setSelectedText] = useState("");
    const [activeHighlightId, setActiveHighlightId] = useState(null);
    const [comment, setComment] = useState("");
    const [menuPosition, setMenuPosition] = useState(null);

    useEffect(() => {
        highlightExistingText();
    }, [activeHighlightId]);

    const highlightExistingText = () => {
        document.querySelectorAll(".highlight").forEach((span) => {
            const highlightId = Number(span.getAttribute("data-id"));
            span.style.backgroundColor =
                highlightId === activeHighlightId ? "lightblue" : "yellow";
        });
    };

    const handleMouseUp = () => {
        const selection = window.getSelection();
        const text = selection.toString().trim();

        if (text) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setMenuPosition({
                top: rect.top + window.scrollY,
                left: rect.left,
            });
            setSelectedText(text);
        } else {
            setMenuPosition(null);
            setSelectedText("");
        }
    };

    const handleStartThread = () => {
        if (selectedText) {
            const newHighlight = {
                text: selectedText,
                comments: [],
                id: highlights.length + 1,
            };

            setHighlights((prev) => [...prev, newHighlight]);
            setActiveHighlightId(newHighlight.id);

            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const span = document.createElement("span");
                span.className = "highlight";
                span.textContent = selectedText;
                span.dataset.id = newHighlight.id;
                span.style.backgroundColor = "lightblue";

                range.deleteContents();
                range.insertNode(span);
                selection.removeAllRanges();

                attachHighlightClickHandlers();
            }

            setMenuPosition(null);
            setComment("");
            setSelectedText("");
        }
    };

    const attachHighlightClickHandlers = () => {
        document.querySelectorAll(".highlight").forEach((span) => {
            span.onclick = (e) => {
                const highlightId = Number(e.target.getAttribute("data-id"));
                setActiveHighlightId(highlightId);
            };
        });
    };

    const handleCommentSubmit = () => {
        if (comment.trim() && activeHighlightId !== null) {
            setHighlights((prev) =>
                prev.map((h) =>
                    h.id === activeHighlightId
                        ? { ...h, comments: [...h.comments, comment] }
                        : h
                )
            );
            setComment("");
        }
    };

    return (
        <div className="container" onMouseUp={handleMouseUp}>
            <div className="ieee-paper">
                <h1 className="title">
                    MapMyForest: Automated Tree Enumeration and Forest Analysis
                    Using Aerial Imagery and Deep Learning Models
                </h1>
                <p className="authors">
                    Author Name(s) - Chinmay Desai, Gautam Rai, Shaanveer Singh,
                    Atharva Deore
                </p>

                <section className="abstract">
                    <h5>Abstract</h5>
                    <p>
                        The project aims to develop software that utilizes image
                        and video analytics to automate tree enumeration in
                        forest areas, facilitating efficient monitoring and
                        informed decision-making for developmental projects.
                        Traditional methods, such as manual surveys, are
                        time-consuming and prone to errors. The software will
                        employ the YOLO object detection model, specifically
                        trained to detect trees from aerial or satellite imagery
                        for tree enumeration, along with database management
                        using MongoDB. This approach enables precise monitoring,
                        early detection of changes, cost-effective forest
                        management, and enhanced conservation efforts.
                    </p>
                </section>

                <section className="keywords">
                    <h5>Keywords</h5>
                    <p>
                        YOLO, CNN, tree enumeration, machine learning,
                        deforestation, Environmental Impact Assessment (EIA),
                        image analytics, sustainability.
                    </p>
                </section>

                <section className="introduction">
                    <h5>I. Introduction</h5>
                    <p>
                        Tree enumeration in India presents significant
                        challenges, as we still rely heavily on manual methods
                        to count the number of trees that need to be cut before
                        developing a particular area. When the area is vast, the
                        data collected is often inaccurate, rendering it
                        ineffective. Moreover, these traditional methods cannot
                        provide sufficient details regarding conservation rules
                        and regulations that must be followed during the
                        deforestation process.
                    </p>
                    <p>
                        This is where the solution, MapMyForest, comes into the
                        picture. The aim of this research paper is to address
                        the challenges of tree enumeration and analysis using
                        aerial imagery. The paper focuses on how the imagery
                        will be processed to gather accurate information, such
                        as the environmental impact, regulations to be followed,
                        and more. Our solution allows users to upload aerial
                        images, which will be analyzed to enumerate the number
                        of trees. The objective is further to identify
                        endangered trees and provide specific recommendations
                        for handling them.
                    </p>
                    <p>
                        Additionally, the aim is to deliver a comprehensive
                        analysis and outline the relevant laws and regulations
                        that must be adhered to, depending on the specific
                        domain under consideration. The paper is subdivided into
                        a number of sections. The major objectives dealt with
                        are mentioned in Section II. Literature survey and the
                        work done in the domain is elaborated in Section III.
                        Block diagram representation and the methodology worked
                        upon is elaborated in Section IV. Section V elaborates
                        on the results obtained and the performance measures
                        obtained for tree enumeration. The conclusion is further
                        mentioned in Section VI.
                    </p>
                </section>
                <section className="methodology">
                    <h5>III. Methodology</h5>
                    <p>
                        The MapMyForest project aims to provide an automated
                        platform for landowners to assess the forest cover on
                        their land. By uploading drone, aerial, or satellite
                        imagery, users can enumerate trees on their land and
                        identify the variety of tree species present compiled
                        into a comprehensive report.
                    </p>
                    <p>
                        The workflow of the proposed system is depicted in Fig.
                        4.1. Upon accessing the front-end interface, the user is
                        presented with the landing page. By providing valid
                        credentials, the user gains access to the system,
                        enabling functionalities such as the addition of new
                        projects, as well as the modification or deletion of
                        existing ones. On selecting a specific project, the
                        system displays detailed information about the project,
                        including geospatial data visualized on a map, any
                        previously uploaded imagery, and the current processing
                        status of the project. The "Upload Images"
                        functionality, accessible via the sidebar, allows the
                        user to upload multiple images into the system. Upon
                        completion of the upload process, the user can initiate
                        the image processing pipeline by clicking the Submit
                        button. At this point, the system prompts the user to
                        revisit the application once the processing is complete.
                        Additionally, a notification email is dispatched to the
                        user upon pipeline completion. Once processing is
                        completed, the user is provided with a comprehensive
                        project report. This report includes metrics such as the
                        total tree count, the distribution of tree species, and
                        insights relevant to potential land development
                        opportunities.
                    </p>
                    <h6>A. Tree Enumeration</h6>
                    <p>
                        Tree enumeration is conducted using aerial or satellite
                        imagery provided by the user. The images are processed
                        using the DeepForest library’s pre-trained model
                        fine-tuned over our custom dataset designed to identify
                        tree crowns in high-resolution images. The steps
                        involved are as follows:
                    </p>
                    <p>
                        Data Input: Users upload aerial or satellite imagery
                        through the platform’s interface. These images are
                        associated with specific user projects. Parallel
                        Processing: To enhance performance and reduce processing
                        time, the platform uses multithreading and batch
                        processing. This enables simultaneous inference of
                        multiple images, distributing computational tasks evenly
                        across multiple available threads. Tree Detection: The
                        DeepForest model is applied to the images, identifying
                        and counting tree crowns. The output includes the total
                        tree count and spatial distribution data. This module
                        outputs an image with annotations for all the trees
                        detected, a dataframe with the bounding boxes of the
                        trees and the total count of trees in that image.
                    </p>
                    <h6>B. Species Classification</h6>
                    <p>
                        The classification of tree species is designed to
                        provide detailed insights into the biodiversity of the
                        forested land. This module directly classifies the image
                        cropped to the trees bounding boxes derived from the
                        previous module and not the whole image. This provides a
                        more accurate and individual classification for the
                        trees. (More detailed description after development)
                    </p>
                </section>
                <section className="conclusion">
                    <h5>IV. Conclusion</h5>
                    <p>
                        This project effectively demonstrates the feasibility of
                        using aerial imagery and machine learning algorithms to
                        automate tree enumeration, along with on-ground video
                        footage for tree classification in forest areas. By
                        deploying the YOLO model for tree recognition and a CNN
                        model for tree classification, the project significantly
                        enhances the accuracy and efficiency of forestry
                        Environmental Impact Assessments (EIA). This novel
                        methodology reduces reliance on traditional,
                        labor-intensive approaches, providing a scalable and
                        cost-effective solution for monitoring forest
                        ecosystems. The integration of a project management
                        system and automated report generation offers detailed
                        insights into the environmental impact of deforestation
                        activities. These reports not only highlight the extent
                        of ecological damage but also provide guidance on
                        adhering to legal compliance throughout the
                        deforestation process. This comprehensive approach
                        ensures informed decision-making and promotes
                        sustainable development practices, making it a valuable
                        tool for environmental authorities, forestry
                        corporations, and other stakeholders.
                    </p>
                </section>
                <section className="citations">
                    <h5>IV. Reference</h5>
                    <ol>
                        <li>
                            “Satellite Image Analytics for Tree Enumeration for
                            Diversion of Forest Land”, SSRN, Saniya Kakade Et
                            all, July 2024
                        </li>
                        <li>
                            Ms. Shubhangi Mahule, Thatikonda Pranathi, Thadepu
                            Bhuvan Ranjan, Tirumani Asha Kiran, Arrolla
                            Siddhartha “Intelligent Forest Assessment: Advanced
                            Tree Detection and Enumeration with AI” , ISSN
                            2582-7421, May 2024
                        </li>
                        <li>
                            Martin Brandt, Rasmus Fensholta, “Deep learning
                            enables image-based tree counting, crown
                            segmentation, and height prediction at the national
                            scale” PNAS Nexus, 2023.
                        </li>
                        <li>
                            Remote Sensing Application for Analysis of Forest
                            Change Detection, 2022 International Conference for
                            Advancement in Technology (ICONAT) Swati Mohod, et
                            al
                        </li>
                        <li>
                            F.Z. Bassine, A. Errami, M. Khaldoun “Real-time
                            Algorithm for Tree Detection, Recognition and
                            Counting in a Video Sequence”, J . Mater. Environ.
                            Sci., Volume 11, Issue 3, Page 367-377, 2020.
                        </li>
                    </ol>
                </section>
            </div>

            {menuPosition && (
                <div
                    className="floating-menu"
                    style={{ top: menuPosition.top, left: menuPosition.left }}
                >
                    <button onClick={handleStartThread}>
                        Start New Thread
                    </button>
                </div>
            )}

            {activeHighlightId !== null && (
                <div className="sidebar">
                    <button
                        className="close-btn"
                        onClick={() => setActiveHighlightId(null)}
                    >
                        ✖
                    </button>

                    <h3>Selected Text:</h3>
                    <p>
                        {
                            highlights.find((h) => h.id === activeHighlightId)
                                ?.text
                        }
                    </p>

                    <h3>Comments:</h3>
                    {highlights
                        .find((h) => h.id === activeHighlightId)
                        ?.comments.map((cmt, i) => (
                            <div key={i} className="comment">
                                {cmt}
                            </div>
                        ))}

                    <textarea
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="sendbutton"
                    >
                        Send
                    </button>
                </div>
            )}

            <style>
                {`
          .container {
            display: flex;
            position: relative;
          }
          .content {
            width: 70%;
            cursor: text;
          }
          .highlight {
            cursor: pointer;
          }
          .floating-menu {
            position: absolute;
            background: white;
            border: 1px solid #ccc;
            padding: 5px 10px;
            border-radius: 5px;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
          }
          .sidebar {
            width: 30%;
            height: 100vh;
            border-left: 2px solid #ccc;
            padding: 10px;
            background: white;
            position: fixed;
            right: 0;
            top: 0;
          }
          .comment {
            background: #f1f1f1;
            padding: 5px;
            margin: 5px 0;
            border-radius: 5px;
          }
          textarea {
            width: 100%;
            height: 60px;
            margin: 10px 0;
            padding: 5px;
          }
          button {
            display: block;
            margin-top: 5px;
            padding: 5px 10px;
            cursor: pointer;
          }
        `}
            </style>
        </div>
    );
};

export default TextHighlighter;
