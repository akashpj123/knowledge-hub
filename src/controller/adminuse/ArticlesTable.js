import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ArticlesTable = () => {
  const [userData, setUserData] = useState([]);
  const { admin } = useSelector((state) => state.authAdmin);
  const [buttonStatus, setButtonStatus] = useState({});
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = admin?.token;
        const response = await axios.get('https://knowledge-back.vercel.app/api/getalluser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Admin token:', token);
        setUserData(response.data); // Assuming response.data is an array of user objects
        console.log('User data fetched:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error fetching user data
      }
    };

    if (admin) {
      fetchUserProfile();
    }
  }, [admin]);

  const deletePost = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      const token = admin?.token;
      if (token) {
        try {
          await axios.delete(`https://knowledge-back.vercel.app/api/delectuser/${postId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(userData.filter((user) => user._id !== postId));
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      }
    }
  };



  const toggleButtonStatus = (userId) => {
    setButtonStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: !prevStatus[userId],
    }));
  };

  return (
    <div className="container" style={{ padding: '2rem 0rem' }}>
      <div className="row">
        <div className="col-12">
          {admin ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Num</th>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">user</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <ArticleRow
                    key={user._id}
                    Num={index + 1}
                    id={user._id}
                    Name={user.name}
                    user={user.email}

                    deletePost={deletePost}
                    toggleButtonStatus={toggleButtonStatus}
                    isEnabled={buttonStatus[user._id]}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ArticleRow = ({ Num, id, Name, user, deletePost, toggleButtonStatus, isEnabled }) => {
  return (
    <tr>
      <th scope="row">{Num}</th>
      <td>{id}</td>
      <td>{Name}</td>
      <td>{user}</td>
      <td>
        <button
          type="button"
          style={buttonStyle}
          className="btn btn-primary"
          onClick={() => toggleButtonStatus(id)}
        >
          {isEnabled ? 'Disable' : 'Enable'}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deletePost(id)}
          style={buttonStyle}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );
};

// Inline style for buttons
const buttonStyle = {
  marginRight: '5px', // Adjust margin as needed
};

export default ArticlesTable;
