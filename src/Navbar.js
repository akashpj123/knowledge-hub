import React  from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeUser } from './auth/store/authSlice';
import { removeAdmin } from './auth/store/authAdminSlice';

function Navbar() {
  const user = useSelector((store) => store.auth.user);
  const admin = useSelector((store) => store.authAdmin.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const logoutUser = async () => {
    try {
      if (user) {
        console.log('User token:', user.token);
        const response = await axios.post('https://knowledge-back.vercel.app/api/logout', {}, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        console.log('Logout response:', response.data);
        dispatch(removeUser());
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out admin:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    }
  };

  const logoutAdmin = async () => {
    try {
      if (admin) {
        console.log('Admin token:', admin.token);
        const response = await axios.post('https://knowledge-back.vercel.app/api/admin/logout', {}, {
          headers: { 'Authorization': `Bearer ${admin.token}` }
        });
        console.log('Logout response:', response.data);
        dispatch(removeAdmin());
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out admin:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    }
  };
  return (
    <div className='pt-3 px-5 mx-5'>
      <nav className="navbar navbar-expand-lg navbar-light text-white mx-3 px-5  navbar fixed rounded" style={{ backgroundColor: '#212529' }}>
        <NavLink to="/" className="navbar-brand text-white">
        Knowledge 
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {user && (
              <>
                 <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/"} className="nav-link text-white" activeClassName="active">
                  Home
                </NavLink>
              </li>
               
                <li className="nav-item">
                  <span className="nav-link text-white" onClick={logoutUser}>
                    Logout
                  </span>
                </li>
              
              </>
            )}
            {admin && (
              <>
                <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/"} className="nav-link text-white" activeClassName="active">
                  Home
                </NavLink>
              </li>
             
              <li className="nav-item">
                  <span className="nav-link text-white" onClick={logoutAdmin}>
                    Logout
                  </span>
                </li>
              </>
            )}
            {!user && !admin && (
              <>
               
                <li className="nav-item">
                  <NavLink to="/signupgust" className="nav-link text-white">
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/logingust" className="nav-link text-white">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Admin
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <NavLink to="/login" className="dropdown-item text-dark">Login</NavLink>
                    <NavLink to="/signup" className="dropdown-item text-dark">Signup</NavLink>
                  </div>
                </li>
              </>
            )}
          
          </ul>
        </div>
      </nav>

  </div>

    
  

  );
}


export default Navbar;
