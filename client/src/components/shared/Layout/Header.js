import React from 'react';
import { BiDonateBlood, BiUserCircle } from 'react-icons/bi';
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        toast.info(
          <div>
            <p>Are you sure you want to logout?</p>
            <button className="btn btn-danger btn-sm me-2" onClick={() => resolve(true)}>Yes</button>
            <button className="btn btn-secondary btn-sm" onClick={() => reject(false)}>No</button>
          </div>,
          {
            position: "top-center",
            autoClose: false,
            closeOnClick: true,
            draggable: false,
            closeButton: false,
          }
        );
      }),
      {
        pending: "Waiting for confirmation...",
        success: "Logged out successfully!",
        error: "Logout cancelled",
      }
    ).then(() => {
      localStorage.clear();
      navigate("/login");
    }).catch(() => {
      // Do nothing, just dismiss the toast.
    });
  };

  return (
    <nav className='navbar'>
      <div className='container-fluid'>
        <div className='navbar-brand'>
          <BiDonateBlood color='red' /> Blood Bank App
        </div>
        <ul className='navbar-nav flex-row'>
          <li className='nav-item mx-3'>
            <p className='nav-link'>
              <BiUserCircle /> {user?.name || user?.hospitalName || user?.organisationName} &nbsp;
              <span className="badge bg-secondary">{user?.role}</span>
            </p>
          </li>
          {user?.role === "organisation" && ["/", "/donor", "/hospital"].includes(location.pathname) ? (
            <li className='nav-item mx-3 mt-2'>
              <Link to="/analytics" className='nav-link'>Analytics</Link>
            </li>
          ) : (
            <li className='nav-item mx-3 mt-2'>
              <Link to="/" className='nav-link'>Home</Link>
            </li>
          )}
          <li className='nav-item mx-3 '>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
