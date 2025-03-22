import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import "../../../Styles/Layout.css";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector(state => state.auth);

  // Sidebar menu based on user roles
  const sidebarMenu = {
    organisation: [
      { path: "/", name: "Inventory", icon: "fa-solid fa-warehouse" },
      { path: "/donor", name: "Donor", icon: "fa-solid fa-hand-holding-medical" },
      { path: "/hospital", name: "Hospital", icon: "fa-solid fa-hospital" },
    ],
    donor: [
      { path: "/organisation", name: "Organisation", icon: "fa-sharp fa-solid fa-building-ngo" },
      { path: "/donation", name: "Donation", icon: "fa-solid fa-hand-holding-medical" },
    ],
    hospital: [
      { path: "/organisation", name: "Organisation", icon: "fa-sharp fa-solid fa-building-ngo" },
      { path: "/consumer", name: "Consumer", icon: "fa-solid fa-hospital" },
    ],
    admin: [
      { path: "/donor-list", name: "Donor List", icon: "fa-solid fa-hand-holding-medical" },
      { path: "/hospital-list", name: "Hospital List", icon: "fa-solid fa-hospital" },
      { path: "/org-list", name: "Organisation List", icon: "fa-sharp fa-solid fa-building-ngo" },
    ],
  };

  return (
    <div className="sidebar">
      <div className="menu">
        {(sidebarMenu[user?.role] || []).map((item) => (
          <div
            key={item.path}
            className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
          >
            <i className={item.icon}></i>
            <Link to={item.path}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
