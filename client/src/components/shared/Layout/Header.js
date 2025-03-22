import React from 'react';
import { BiDonateBlood, BiUserCircle } from 'react-icons/bi';
import { useSelector } from "react-redux"
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { toast } from 'react-toastify';
const Header = () => {
  const { user } = useSelector(state => state.auth);
  //logout handler
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    let answer = window.prompt("Are you sure you want to Logout?", "Sure");
    if (!answer)
      return;
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/login");

  }
  return (
    <>
      <nav className='navbar '>
        <div className='container-fluid'>
          <div className='navbar-brand'><BiDonateBlood color='red' /> Blood Bank App</div>
          <ul className='navbar-nav flex-row'>
            <li className='nav-item mx-3'>
              <p className='nav-link'>
                <BiUserCircle /> {user?.name || user?.hospitalName || user?.organisationName} {" "} &nbsp;
                <span class="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
            {(user?.role === "organisation") && (location.pathname === "/" || location.pathname === "/donor" || location.pathname === "/hospital") ? (
              <li className='nav-item mx-3 mt-2'>
                <Link to="/analytics" className='nav-link'>Analytics</Link>
              </li>
            ) : (<li className='nav-item mx-3 mt-2'>
              <Link to="/" className='nav-link'>Home</Link>
            </li>)}
            <li className='nav-item mx-3 '>
              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>

    </>
  );
}

export default Header;
