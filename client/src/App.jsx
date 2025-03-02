import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";
import Auth from "./pages/Auth/Auth";
import FileListing from "./pages/FileListing/FileListing";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Plagiarism from "./pages/PlagiarismChecker/Plagiarism";
import Citations from "./pages/Citations/Citations";
import PaperViewer from "./pages/PaperViewer/PaperViewer";

logEvent(analytics, "notification_received");

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/filterlist" element={<FileListing />} />
                <Route path="/plagiarism" element={<Plagiarism />} />
                <Route path="/citations" element={<Citations />} />
                <Route path="/viewer" element={<PaperViewer />} />
            </Routes>
            <Footer />
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default App;
