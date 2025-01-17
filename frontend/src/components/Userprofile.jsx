import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaTimes, FaUpload, FaGreaterThan } from 'react-icons/fa'; // Added FaUpload for the upload ID icon
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import "/src/UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Name not available', // Default text for name
    email: 'Email not available', // Default text for email
    verified: false, // Assuming the user verification status
  });

  const [transactionHistory, setTransactionHistory] = useState([]); // State to hold transaction history

  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  useEffect(() => {
    // Fetch user data from the server (replace URL with your API endpoint)
    fetch('https://yourapi.com/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: data.name || 'Name not available',
          email: data.email || 'Email not available',
          verified: data.verified || false, // Assuming verification status in response
        });
      })
      .catch((error) => console.error('Error fetching user data:', error));

    // Fetch transaction history data from the server (replace URL with your API endpoint)
    fetch('https://yourapi.com/user/transactions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactionHistory(data.transactions || []); // Assuming the transactions are in a 'transactions' field
      })
      .catch((error) => console.error('Error fetching transaction data:', error));
  }, []);

  const handleRedirect = () => {
    navigate('/upload-id'); // Use navigate to redirect
  };

  return (
    <div className="user-profile">
      <div className="user-profile-details">
        <div className="profile-icon">
          <FaUserCircle size={60} color="#6c757d" />
        </div>
        <div className="profile-details">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          {!user.verified && (
            <span className="verification-badge">
              <FaTimes size={14} color="white" /> Unverified
            </span>
          )}
        </div>
      </div>

      <div className="upload-id">
        <div className="upload-details" onClick={handleRedirect}>
          <FaUpload size={20} color="#6c757d" />
          <span>Upload ID</span>
        </div>
        <FaGreaterThan className="greater-sign" />
      </div>

        <div className="transaction-history">
            <h3>Transaction History</h3>
          <ul>
            {transactionHistory.length > 0 ? (
              transactionHistory.map((transaction, index) => (
                <li key={index}>
                  Amount: {transaction.amount} | Date: {transaction.date}
                </li>
              ))
            ) : (
              <li>Amount: 0 | Date: {new Date().toLocaleDateString()}</li> // Show current date even if no transactions
            )}
          </ul>
        </div>
        
    </div>
  );
};

export default UserProfile;
