import React from 'react';
import { BiDonateBlood, BiUserCircle } from 'react-icons/bi';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../../redux/features/auth/authSlice';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CustomCloseButton = ({ closeToast }) => (
    <div>
      <button
        className="btn btn-sm btn-danger me-2"
        onClick={() => {
          confirmLogout(true); // Logout
          closeToast(); // Close the toast
        }}
      >
        Yes
      </button>
      <button className="btn btn-sm btn-secondary" onClick={closeToast}>
        No
      </button>
    </div>
  );
  const handleLogout = () => {
    toast.warn("Are you sure you want to logout?", {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: (props) => <CustomCloseButton {...props} />,
    });
  };


  const confirmLogout = (confirm) => {
    if (confirm) {
      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/login");
    } else {
      toast.dismiss();
    }
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light shadow-sm p-2'>
      <div className='container-fluid d-flex justify-content-between align-items-center'>
        <div className='navbar-brand d-flex align-items-center'>
          <BiDonateBlood color='red' size={28} className="me-2" />
          <span className="fw-bold">Blood Bank App</span>
        </div>

        <ul className='navbar-nav d-flex align-items-center'>
          <li className='nav-item mx-3'>
            <span className='nav-link d-flex align-items-center'>
              <BiUserCircle size={22} className="me-1" />
              {user?.name || user?.hospitalName} &nbsp;
              <span className="badge bg-secondary">{user?.role}</span>
            </span>
          </li>

          {
            <li className='nav-item mx-3'>
              <Link to="/" className='nav-link'>Home</Link>
            </li>
          }

          <li className='nav-item mx-3'>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Header;
