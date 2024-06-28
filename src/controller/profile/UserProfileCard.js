import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserProfileCard = () => {
  const [userDat, setUserDat] = useState({
    mobileNumber: '',
    dateOfBirth: '',
    firstName: '',
    address1: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({ email: '', name: '' });
  const [userId, setUserId] = useState(null);

  const { user, admin } = useSelector((state) => state.auth);

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
        setUserId(response.data._id); // Set user ID after fetching user data
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error fetching user data
      }
    };

    if (user || admin) {
      fetchUserProfile();
    }
  }, [user, admin]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = user?.token || admin?.token;
        const response = await axios.get(`https://knowledge-back.vercel.app/api/getProfileById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserDat(response.data);
        console.log('Profile data fetched:', response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId, user, admin]);

  const styles = {
    body: {
      background: 'rgb(99, 39, 120)'
    },
    labels: {
      fontSize: '11px'
    },
    buttonStyle: { // Define your buttonStyle object
      background: '#682773',
      color: '#fff',
      textDecoration: 'none',
      padding: '5px 10px',
      borderRadius: '3px'
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="container rounded bg-white mt-5 mb-5" style={styles.body}>
          <div className="row">
            <div className="col-md-3 border-right">
              {(user || admin) && (
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    className="rounded-circle mt-5"
                    width="150px"
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    alt="profile"
                  />
                  <span className="font-weight-bold">{userData.email}</span>
                  <span className="text-black-50">{userData.name}</span>
                </div>
              )}
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile </h4>
                </div>
                {(user || admin) && (
                  <>
                    {userDat.map((userProfile) => ( // Mapping over userDat array
                      <div key={userProfile._id} className="row mt-2">
                        <div className="col-md-6">
                          <label className="labels" style={styles.labels}>
                            Username:
                          </label>
                          <p>{userProfile.firstName}</p>
                        </div>
                        <div className="col-md-12">
                          <label className="labels" style={styles.labels}>
                            Date of Birth:
                          </label>
                          <p>{userProfile.dateOfBirth.substring(0, 10)}</p>
                        </div>
                        <div className="col-md-12">
                          <label className="labels" style={styles.labels}>
                            Mobile Number:
                          </label>
                          <p>{userProfile.mobileNumber}</p>
                        </div>
                        <div className="col-md-12">
                          <label className="labels" style={styles.labels}>
                            Address:
                          </label>
                          <p>{userProfile.address1}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience">
                 
                  {userDat.map((userProfile) => (
                    <Link
                      key={userProfile._id} // Assuming userProfile has _id
                      to={`/${userProfile._id}`}
                      style={styles.buttonStyle}
                    >
                      Edit
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileCard;