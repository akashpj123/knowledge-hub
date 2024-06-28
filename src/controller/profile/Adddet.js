import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Adddet() {
  const [firstName, setFirstName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [profileExists, setProfileExists] = useState(false);
  const [userData, setUserData] = useState({ email: '', name: '' }); // Initialize as an object
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { admin } = useSelector((state) => state.authAdmin);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = user?.token || admin?.token;
        const response = await axios.get('https://knowledge-back.vercel.app/api/getuser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data); // Assuming response.data has email and name
        console.log('User data fetched:', response.data);

        // Check if profile exists based on your logic (example checking email or ID)
        // For demonstration, assume profile exists if email is present
    
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error fetching user data
      }
    };

    if (user || admin) {
      fetchUserProfile();
    }
  }, [user, admin]);

  const submit = async (e) => {
    e.preventDefault();

   

    const profileData = {
      firstName: firstName,
      dateOfBirth: dateOfBirth,
      mobileNumber: mobileNumber,
      address1: address1,
    };

    try {
      const token = user?.token || admin?.token;
      const response = await axios.post('https://knowledge-back.vercel.app/api/createProfile', profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Profile created:', response.data);
      navigate('/'); // Redirect to home page after successful submission
    } catch (error) {
      console.error('Error creating profile:', error);
      // Handle error creating profile
    }
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        {user || admin ? (
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="profile"
              />
              <span className="text-black-50"><p>{userData.email}</p></span>
              <span className="text-black-50">{userData.name}</span>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile</h4>
            </div>
            {message && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}
            <form onSubmit={submit}>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input type="text" className="form-control" placeholder="First Name" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Date of Birth</label>
                  <input type="date" className="form-control" placeholder="Enter Date of Birth" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input type="text" className="form-control" placeholder="Enter Phone Number" name="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address Line 1</label>
                  <input type="text" className="form-control" placeholder="Enter Address Line 1" name="address1" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adddet;
