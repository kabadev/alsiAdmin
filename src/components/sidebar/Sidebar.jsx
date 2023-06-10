import React, { useContext } from "react";
import { links } from "../../data/data";
import "./sidebar.css";
import {
  IoSettingsOutline,
  IoLogOutOutline,
  IoCloseSharp,
} from "react-icons/io5";
import Logo from "../../images/logo.jpg";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(AppContext);

  const logoutHandle = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <>
      <div
        className={`sidebar__overlay ${sidebarOpen && "active"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <div className={`sidebar ${sidebarOpen && "active"}`}>
        <div className="sidebar__header">
          <div className="brand">
            <img src={Logo} alt="" />
            <h4>AlSI</h4>
          </div>
          <div className="close__btn" onClick={() => setSidebarOpen(false)}>
            <IoCloseSharp />
          </div>
        </div>
        <div className="menu">
          <ul className="menu_links">
            {links.map((link, i) => (
              <li className="nav_link" key={i}>
                <NavLink
                  className={({ isActive }) => (isActive ? "active__nav" : "")}
                  to={link.link}
                >
                  <span className="icon">{link.icon}</span>
                  <span className="text nav_text">{link.name}</span>
                </NavLink>
              </li>
            ))}
            <li className="nav_link" onClick={logoutHandle}>
              <a href="#" className="logout">
                <span className="icon">
                  <IoLogOutOutline />
                </span>
                <span className="text nav_text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
