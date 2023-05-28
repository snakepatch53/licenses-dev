import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useOpenSidebar } from "./hooks/app";

function App() {
    const { openSidebar, handleOpenSidebar } = useOpenSidebar();
    return (
        <>
            <Router>
                <div className={"layout " + (!openSidebar ? "close-sidebar" : "")}>
                    <Header />
                    <Sidebar isOpen={openSidebar} toggleSidebar={handleOpenSidebar} title="My React App" />
                    <main>
                        <Routes>
                            <Route path="/" element={<h1>Home</h1>} />
                            <Route path="/profile" element={<h1>Profile</h1>} />
                            <Route path="/messages" element={<h1>Messages</h1>} />
                            <Route path="/settings" element={<h1>Settings</h1>} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </>
    );
}

export default App;
