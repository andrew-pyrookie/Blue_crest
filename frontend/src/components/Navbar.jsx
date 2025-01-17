import React, { useState } from 'react';
import { FaHome, FaUserCircle, FaInfoCircle, FaServicestack, FaEnvelope, FaBars, FaTimes, FaQuestionCircle, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '/src/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyLogo</div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        
        <Link to="/Userprofile">
          <FaUserCircle style={{ marginRight: '8px' }} /> Profile
        </Link>
        <Link to="/">
          <FaHome style={{ marginRight: '8px' }} /> Home
        </Link>
        <Link to="/about">
          <FaInfoCircle style={{ marginRight: '8px' }} /> About Us
        </Link>
        <Link to="/plan">
          <FaServicestack style={{ marginRight: '8px' }} /> Plan
        </Link>
        <Link to="/contact">
          <FaEnvelope style={{ marginRight: '8px' }} /> Contact
        </Link>
        <Link to="/faq">
          <FaQuestionCircle style={{ marginRight: '8px' }} /> FAQ
        </Link>
        <Link to="/login">
          <FaSignInAlt style={{ marginRight: '8px' }} /> Login
        </Link>
      </div>
      <div className={`navbar-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
    </nav>
  );
};

export default Navbar;
