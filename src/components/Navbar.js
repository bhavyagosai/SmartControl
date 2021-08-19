/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';
import '../transitions.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import DefaultProfileImage from '../assets/default-profile.png';

function Navbar({
  activeLink, isHiddenUponScroll, changeBackground, isUserLogin,
}) {
  const [anonymous, setAnonymous] = useState(true);
  const [user, setUser] = useState(false);

  const handler = () => {
    const nav = document.getElementById('Ham-Container');
    // const header = document.getElementById("TopLeftAppSection");
    const navItems = document.getElementById('Navlinks-1');

    if (document.getElementById('hidden-Hamburger')) {
      const hamLogo = document.getElementById('hidden-Hamburger');
      hamLogo.classList.toggle('hidden-ham-logo');
    } else if (document.getElementById('Navbar-HamburgerProfilePicture')) {
      document.getElementById('Navbar-HamburgerProfilePicture').classList.toggle('hamProfilePicture-logo');
    }

    if (document.getElementById('Navbar-HamProfileContainer')) {
      document.getElementById('Navbar-HamProfileContainer').classList.toggle('profile-show');
    }

    nav.classList.toggle('show');
    // header.classList.toggle("fix");
    navItems.classList.toggle('nav-items');
  };

  const applyLinkStyles = (id) => {
    const HTMLid = id;
    HTMLid.style.color = '#4a39d0';
    HTMLid.style.transition = 'transition: color 0.3s linear';
    HTMLid.style.pointerEvents = 'none';
  };

  let prevScroll = window.pageYOffset;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    if (window.pageYOffset <= 50) {
      document.getElementById('Navbar-container').style.top = 'calc(-5em - 16px)';
    } else if (prevScroll > currentScroll) {
      document.getElementById('Navbar-container').style.top = '0';
    } else {
      document.getElementById('Navbar-container').style.top = 'calc(-5em - 16px)';
    }
    prevScroll = currentScroll;
  };

  const userName = JSON.parse(localStorage.getItem('userDetails')) !== null ? JSON.parse(localStorage.getItem('userDetails')).first_name : '';

  useEffect(() => {
    const navbarComponent = document.getElementById('Navbar');

    if (changeBackground) {
      navbarComponent.style.background = '#e1f7ef';
    } else {
      navbarComponent.style.background = '#fbf4ff';
    }

    if (isHiddenUponScroll) {
      document.getElementById('Navbar-container').style.top = 'calc(-5em - 16px)';
      window.addEventListener('scroll', handleScroll);
    }

    if (isUserLogin) {
      setUser(true);
      setAnonymous(false);
    }

    switch (activeLink) {
      case 'home':
        applyLinkStyles(document.getElementById('home'));
        break;

      case 'features':
        applyLinkStyles(document.getElementById('features'));
        break;

      case 'contactus':
        applyLinkStyles(document.getElementById('about'));
        break;

      case 'login':
        if (document.getElementById('hidden-Login')) {
          applyLinkStyles(document.getElementById('hidden-Login'));
          document.getElementById('Navlinks-2').style.display = 'none';
        }
        break;

      default:
        break;
    }

    if (document.getElementById('hidden-Hamburger')) {
      document.getElementById('hidden-Hamburger').addEventListener('click', handler);
    } else if (document.getElementById('Navbar-HamburgerProfilePicture')) {
      document.getElementById('Navbar-HamburgerProfilePicture').addEventListener('click', handler);
    }

    return () => {
      if (document.getElementById('hidden-Hamburger')) {
        document.getElementById('hidden-Hamburger').removeEventListener('click', handler);
      } else if (document.getElementById('Navbar-HamburgerProfilePicture')) {
        document.getElementById('Navbar-HamburgerProfilePicture').removeEventListener('click', handler);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <>
      {/* <div className="transition transition-3" /> */}

      <div className="Navbar-container" id="Navbar-container">
        <nav className="Navbar" id="Navbar">
          <Link to="/" id="LogoLink">
            <div id="LogoSection">
              <div id="Logo" />
              <span className="LogoName" style={{ color: '#101010' }}>
                Smart
              </span>
              <span className="LogoName">Control</span>
            </div>
          </Link>
          <div className="Ham-Container" id="Ham-Container">
            {user
            && (
              <Link to="/usersetting">
                <div className="Navbar-HamProfileContainer" id="Navbar-HamProfileContainer">
                  <div className="ProfilePicture" id="Navbar-HamProfilePicture" title={userName}>
                    <img src={DefaultProfileImage} alt="Profile" />
                  </div>
                  <span id="Navbar-HamUserName">{userName}</span>
                </div>
              </Link>
            ) }
            <ul className="Navlinks-1" id="Navlinks-1">
              <li className="HeaderListItems" id="home">
                <Link className="MainHeaderAction" to="/">
                  Home
                </Link>
              </li>
              <li className="HeaderListItems" id="features">
                <Link className="MainHeaderAction" to="/features">
                  Features
                </Link>
              </li>
              <li className="HeaderListItems" id="about">
                <Link className="MainHeaderAction" to="/contactus">
                  Contact Us
                </Link>
              </li>
              {anonymous
              && (
                <li id="hidden-navbar-HiddenLogin" className="HeaderListItems">
                  <Link id="hidden-Login" className="hidden-LoginButton" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {user
              && (
                <li id="Navbar-HiddenLogout" className="HeaderListItems">
                  <Link id="Navbar-Logout" className="Navbar-LogoutButton" to="/login">
                    Log Out
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {anonymous
          && (
          <ul className="Navlinks-2" id="Navlinks-2">
            <li className="HeaderListItems-2">
              <Link className="MainHeaderAction-2" to="/login">
                Login
              </Link>
            </li>
            <li className="HeaderListItems-2">
              <Link className="MainHeaderAction-2" to="/login">
                Sign Up
              </Link>
            </li>
          </ul>
          )}
          {user
          && (
            <Link to="/usersetting">
              <div className="Navbar-UserContainer">
                <div className="Navbar-UserProfilePicture">
                  <img src={DefaultProfileImage} alt="Profile" />
                </div>
                <div className="Navbar-UserName" title={userName}>
                  {userName}
                </div>
              </div>
            </Link>
          ) }
          {user
          && (
            <div className="Navbar-HamburgerProfilePicture" id="Navbar-HamburgerProfilePicture" title={userName}>
              <img src={DefaultProfileImage} alt="Profile" />
            </div>
          )}
          {anonymous
          && (
          <div id="hidden-Hamburger" className="hidden-Hamburger">
            <FontAwesomeIcon
              id="hidden-ham-bars"
              className="hidden-ham-bars"
              icon={faBars}
            />
          </div>
          )}
        </nav>
      </div>
    </>
  );
}

Navbar.defaultProps = {
  activeLink: 'home',
  changeBackground: false,
  isUserLogin: false,
  isHiddenUponScroll: false,
};

export default Navbar;
