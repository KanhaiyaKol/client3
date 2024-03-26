import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FriendsListAll.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function UserListAll() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users/all'); // Adjust the URL to your API endpoint
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div>
      <h4>User friends</h4>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              key={user._id}
              style={{ textDecoration: 'none' }}
              className="user-card"
            >
              <img
                src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'}
                alt=""
              />
              <span>{user.username}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

