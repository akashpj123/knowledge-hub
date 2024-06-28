import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import Shownow from './controller/Shownow';
import { removeUser } from './auth/store/authSlice';
import { removeAdmin } from './auth/store/authAdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
function App() {
  const user = useSelector((store) => store.auth.user);
  const admin = useSelector((store) => store.authAdmin.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      if (user) {
        await axios.post('http://localhost:8025/api/logout', {}, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        dispatch(removeUser());
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out user:', error);
    }
  };

  const logoutAdmin = async () => {
    try {
      if (admin) {
        await axios.post('http://localhost:8025/api/logout', {}, {
          headers: { 'Authorization': `Bearer ${admin.token}` }
        });
        dispatch(removeAdmin());
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out admin:', error);
    }
  };

  return (
    <div className='bg-secondary'>
      <Navbar />
      <div className='container-fluid  mt-5'>
        <div className='row '>
          {/* Left Sidebar */}
          <div className='col-lg-3 col-md-4 '>
            <div className='list-group list-group-dark bg-dark p-4 rounded position-fixed'>
              {user && (
                <>
                  <li className="nav-item" style={{ marginLeft: "10px" }}>
                    <NavLink to={"/profile"} className="nav-link text-white" activeClassName="active">
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{ marginLeft: "10px" }}>
                    <NavLink to={"/crud"} className="nav-link text-white" activeClassName="active">
                      Mypost
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{ marginLeft: "10px" }}>
                    <NavLink to={"/addbooking"} className="nav-link text-white" activeClassName="active">
                      EditProfile
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{ marginLeft: "10px" }}>
                    <NavLink to={"/create"} className="nav-link text-white" activeClassName="active">
                      Create now
                    </NavLink>
                  </li>

                  <li className="nav-item" style={{ marginLeft: "10px" }}>
                    <NavLink className="nav-link text-white" onClick={logoutUser} activeClassName="active">
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
              {admin && (
                <>
                  <li className="nav-item" style={{ marginLeft: "10px" }}>
                    <NavLink to={"/addbooking"} className="nav-link text-white" activeClassName="active">
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{ marginLeft: "10px" }}>
                    <NavLink to={"/crud"} className="nav-link text-white" activeClassName="active">
                      Mypost
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{ marginLeft: "10px" }}>
                    <NavLink to={"/articles"} className="nav-link text-white" activeClassName="active">
                      User
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{ marginLeft: "10px" }}>
                    <NavLink to={"/create"} className="nav-link text-white" activeClassName="active">
                      Create now
                    </NavLink>
                  </li>

                  <li className="nav-item" style={{ marginLeft: "10px" }}>
                    <NavLink className="nav-link text-white" onClick={logoutAdmin} activeClassName="active">
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className='col-lg-6 col-md-8  '>
            <Shownow />
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default App