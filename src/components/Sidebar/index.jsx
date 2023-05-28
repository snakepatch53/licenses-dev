import "./index.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useOpen } from "../../hooks/sidebar";

Sidebar.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default function Sidebar({ toggleSidebar, title: prop_title }) {
    const { title, handleTogle } = useOpen({ toggleSidebar, title: prop_title });
    return (
        <>
            <aside className="sidebar">
                <div className="info-head">
                    <h3>{title}</h3>
                    <button className="toggle" onClick={handleTogle}>
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
                <div className="head">
                    <img src="https://avatars.githubusercontent.com/u/61552810?v=4" alt="Avatar" />
                    <div className="info">
                        <h3>John Doe</h3>
                        <p>
                            <i className="fa fa-circle"></i>
                            Online
                        </p>
                    </div>
                </div>
                <ul>
                    <li>
                        <NavLink to="/">
                            <i className="fa fa-home"></i>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">
                            <i className="fa fa-user"></i>
                            <span>Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/messages">
                            <i className="fa fa-envelope"></i>
                            <span>Messages</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings">
                            <i className="fa fa-cog"></i>
                            <span>Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </aside>
        </>
    );
}
