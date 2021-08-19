import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, Flip } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import '../App.css';
import '../transitions.css';

import Navbar from './Navbar';
import Carousel from './Carousel';
import UserContainer from './UserContainer';

import DefaultProfileImage from '../assets/default-profile.png';
import FeaturesImage1 from '../assets/Features1.svg';
import FeaturesImage2 from '../assets/Features2.svg';
import Fan from '../assets/fan.svg';

function LandingPage() {
  const [user, setUser] = useState(false);
  const [anonymous, setAnonymous] = useState(true);

  const handler = () => {
    const nav = document.getElementById('HeaderItemsContainer');
    const header = document.getElementById('TopLeftAppSection');
    const navItems = document.getElementById('HeaderItems');

    if (document.getElementById('HamProfileContainer')) {
      document.getElementById('HamProfileContainer').classList.toggle('profile-show');
    }

    if (document.getElementById('Hamburger')) {
      const hamLogo = document.getElementById('Hamburger');
      hamLogo.classList.toggle('ham-logo');
    } else if (document.getElementById('HamburgerProfilePicture')) {
      const hamProfilePicture = document.getElementById('HamburgerProfilePicture');
      hamProfilePicture.classList.toggle('hamProfilePicture-logo');
    }

    nav.classList.toggle('show');
    header.classList.toggle('fix');
    navItems.classList.toggle('nav-items');
  };

  const userName = JSON.parse(localStorage.getItem('userDetails')) !== null ? JSON.parse(localStorage.getItem('userDetails')).first_name : '';

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      axios({
        method: 'GET',
        url: 'https://api.iot.puyinfotech.com/api/user/',
        headers: {
          'x-access-token': localStorage.getItem('accessToken'),
        },
      })
        .then(() => {
          setAnonymous(false);
          setUser(true);
          document.getElementById('RightHeaderItemsContainer').classList.add('userAvailable');
        })
        .catch(() => {
          toast.error('Session expired! Please login again.', {
            position: 'top-center',
            autoClose: '3000',
            transition: Flip,
          });
        });
    } else {
      // console.log('No token stored');
      setUser(false);
      setAnonymous(true);
      document.getElementById('RightHeaderItemsContainer').classList.remove('userAvailable');
    }

    if (document.getElementById('Hamburger')) {
      document.getElementById('Hamburger').addEventListener('click', handler);
    } else if (document.getElementById('HamburgerProfilePicture')) {
      document.getElementById('HamburgerProfilePicture').addEventListener('click', handler);
    }

    return () => {
      if (document.getElementById('Hamburger')) {
        document.getElementById('Hamburger').removeEventListener('click', handler);
      } else if (document.getElementById('HamburgerProfilePicture')) {
        document.getElementById('HamburgerProfilePicture').removeEventListener('click', handler);
      }
    };
  });

  const pageTransition = {
    initial: {
      top: 0,
    },
    animate: {
      top: '100%',
      transition: { duration: 1.5, ease: [0.9, 0, 0.1, 1] },
    },
    exit: {
      top: 0,
      transition: { duration: 1.5, ease: [0.9, 0, 0.1, 1] },
    },
  };

  return (
    <>
      {/* <div className="transition transition-1 is-active" /> */}
      <motion.div id="transition" className="transition transition-1" initial="initial" animate="animate" exit="exit" variants={pageTransition} />

      <div className="App" id="App">
        {anonymous
        && (
          <Navbar activeLink="home" isHiddenUponScroll />
        )}
        {user
        && (
          <Navbar activeLink="home" isHiddenUponScroll isUserLogin />
        )}
        <div className="LeftAppSectionContainer">
          <div className="LeftAppSection">
            <header className="TopLeftAppSection" id="TopLeftAppSection">
              <Link to="/" style={{ pointerEvents: 'none' }}>
                <div id="LogoSection">
                  <div id="Logo" />
                  <span className="LogoName" style={{ color: '#101010' }}>
                    Smart
                  </span>
                  <span className="LogoName">Control</span>
                </div>
              </Link>
              {user
              && (
                <div className="HamburgerProfilePicture" id="HamburgerProfilePicture" title={userName}>
                  <img src={DefaultProfileImage} alt="Profile" />
                </div>
              )}
              {anonymous
              && (
                <div id="Hamburger" className="Hamburger">
                  <FontAwesomeIcon
                    id="ham-bars"
                    className="ham-bars"
                    icon={faBars}
                  />
                </div>
              )}
              <div className="HeaderItemsContainer" id="HeaderItemsContainer">
                {user
                && (
                  <Link to="/usersetting">
                    <div className="HamProfileContainer" id="HamProfileContainer">
                      <div className="ProfilePicture" id="HamProfilePicture" title={userName}>
                        <img src={DefaultProfileImage} alt="Profile" />
                      </div>
                      <span id="HamUserName">{userName}</span>
                    </div>
                  </Link>
                ) }
                <ul className="HeaderItems" id="HeaderItems">
                  <li className="HeaderListItems" id="active">
                    <Link className="MainHeaderAction" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="HeaderListItems">
                    <Link className="MainHeaderAction" to="/features">
                      Features
                    </Link>
                  </li>
                  <li className="HeaderListItems">
                    <Link className="MainHeaderAction" to="/contactus">
                      Contact Us
                    </Link>
                  </li>
                  {anonymous
                  && (
                    <li id="HiddenLogin" className="HeaderListItems">
                      <Link id="Login" className="LoginButton" to="/login">
                        Log In
                      </Link>
                    </li>
                  )}
                  {user
                  && (
                    <>
                      <li id="HiddenLogout" className="HeaderListItems">
                        <Link id="Logout" className="LogoutButton" to="/login">
                          Log Out
                        </Link>
                      </li>
                      <div className="ProfilePicture" id="ProfilePicture">
                        <Link to="/usersetting">
                          <img src={DefaultProfileImage} alt="Profile" />
                        </Link>
                      </div>
                    </>
                  )}
                </ul>
              </div>
            </header>
            <div id="LargeElement1Container">
              <div id="LargeElement1" />
            </div>
            <div id="SmallElement1Container">
              <div id="SmallElement1" />
            </div>
            <div id="PlusElementContainer">
              <div id="PlusElement">
                <div id="PlusElement2">
                  <div id="PlusElement3">
                    <div id="PlusElement4">
                      <div id="PlusElementVertical" />
                      <div id="PlusElementHorizontal" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="SmallElement2Container">
              <div id="SmallElement2" />
            </div>
            <div id="LargeElement2Container">
              <div id="LargeElement2" />
            </div>
            <div id="LandingContainer">
              <p className="Text1">Smart Home App</p>
              <p className="Text2">Created to make life much Easier</p>
              <p className="Text3">
                Smart Control is helping the users to achieve the best and
                comfortable atmosphere for their home.
              </p>
              <Link id="LandingButton" to={user ? '/devices' : '/login'}>
                {user ? 'Open Dashboard' : 'Get Started'}
                {anonymous
                && (
                <FontAwesomeIcon
                  id="right-arrow"
                  icon={faArrowAltCircleRight}
                />
                ) }
                {user
                && (
                <i className="fas fa-chart-network" />
                ) }
              </Link>
              <div id="StoreContainer">
                <a href="/">
                  <img
                    id="StoreLink"
                    src="https://engineering.purdue.edu/coursemirror/wp-content/uploads/2020/08/appstore.png"
                    alt="App Store"
                  />
                </a>
                <a href="/">
                  <img
                    id="StoreLink"
                    src="https://reefcentral.pt/wp-content/uploads/2019/04/get-on-google-play.png"
                    alt="Play Store"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="RightAppSectionContainer">
          <div className="RightAppSection">
            <header className="TopRightAppSection">
              <div className="RightHeaderItemsContainer" id="RightHeaderItemsContainer">
                {user
                && (
                  <UserContainer />
                ) }
                {anonymous
                && (
                <ul className="RightHeaderItems">
                  <li className="HeaderListItem">
                    <Link className="RightMainHeaderAction" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="HeaderListItem">
                    <Link className="RightMainHeaderAction" to="/login">
                      Sign Up
                    </Link>
                  </li>
                </ul>
                ) }
              </div>
            </header>
            <Carousel />
          </div>
        </div>
      </div>

      <div className="features-container" id="features">
        <div id="features" className="features">
          <h1>Features</h1>
          <p>Control your devices from anywhere with the Android / Web App.</p>
          <div id="f-row1" className="feature-row">
            <div id="f-col1" className="feature-col">
              <img src={FeaturesImage1} alt="Features 1" />
              <div className="f-col1-circle" />
            </div>
            <div id="f-col2" className="feature-col">
              <h2>Control Devices</h2>
              <p>
                You can control all your smart devices using the ESP8266 module,
                including almost every Electrical device including the Garage
                door.
              </p>
            </div>
          </div>
          <div id="f-row2" className="feature-row">
            <div id="f-col3" className="feature-col">
              <h2>From Anywhere</h2>
              <p>
                You can Control all of your devices from anywhere in the world
                almost instantly.
              </p>
            </div>
            <div id="f-col4" className="feature-col">
              <img src={FeaturesImage2} alt="Features 2" />
              <div className="f-col4-circle" />
            </div>
          </div>
          <div className="fan">
            <img src={Fan} alt="fan" />
          </div>
          <div className="dot">
            <svg
              version="1.1"
              viewBox="0 0 31.955 31.955"
              xml="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15.979" cy="15.977" r="6.117" />
            </svg>
            {/* <img src={Dot} alt="dot" /> */}
          </div>
          <div className="circle">
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="25"
                stroke="#009AFE"
                strokeWidth="15"
                fill="transparent"
              />
            </svg>
            {/* <img src={Circle} alt="circle" /> */}
          </div>
        </div>
      </div>

      <div className="pricing-container">
        <div className="pricing">
          <h1>It&apos;s easy to Get Started</h1>
          <p>And its Free. The two things that everybody loves.</p>
          <div className="prices">
            <div id="p1" className="pricing-col1">
              <div className="prices-top">
                <h2 className="price-title">Plans</h2>
              </div>
              <p>No of devices</p>
              <p>Access to </p>
              <p>App & Web App</p>
            </div>
            <div id="p2" className="pricing-col2">
              <div className="prices-top">
                <h2 className="price-title">Free</h2>
                <p className="price-subtitle">
                  from <span>$0</span>/forever
                </p>
                <button className="price-btn">Get Started</button>
              </div>
              <p>3 devices</p>
              <p>Access to only</p>
              <p>App</p>
            </div>
            <div id="p3" className="pricing-col2">
              <div className="prices-top">
                <h2 className="price-title">Basic</h2>
                <p className="price-subtitle">
                  from <span>$6</span>/month
                </p>
                <button className="price-btn">Buy Now</button>
              </div>
              <p>10 devices</p>
              <p>Access to App</p>
              <p>and Web App</p>
            </div>
            <div id="p4" className="pricing-col2">
              <div className="prices-top">
                <h2 className="price-title">Premium</h2>
                <p className="price-subtitle">
                  from <span>$15</span>/month
                </p>
                <button className="price-btn">Buy Now</button>
              </div>
              <p>unlimited devices</p>
              <p>Access to App</p>
              <p>and Web App</p>
            </div>
          </div>
        </div>
      </div>

      <div className="clients-container">
        <div className="clients">
          <h1>Our Clients</h1>
          <div className="marquee-container">
            <ul className="marquee-items">
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/thread"
                  alt="Logo1"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/life-house"
                  alt="Logo2"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/rxnt"
                  alt="Logo3"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/opennode"
                  alt="Logo4"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/rallyest"
                  alt="Logo5"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/crisis-cleanup"
                  alt="Logo6"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/toughbuilt"
                  alt="Logo7"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/space-needle"
                  alt="Logo8"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/bluebird"
                  alt="Logo9"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/kinemaster"
                  alt="Logo10"
                />
              </li>

              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/thread"
                  alt="Logo1"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/life-house"
                  alt="Logo2"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/rxnt"
                  alt="Logo3"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/opennode"
                  alt="Logo4"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/rallyest"
                  alt="Logo5"
                />
              </li>
              <li className="marquee-item">
                <img
                  src="https://res.cloudinary.com/netrix/image/upload/f_auto,q_auto/v1604368715/3.0/images-source/clients/crisis-cleanup"
                  alt="Logo6"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer">
          <div className="footer-top">
            <div className="footer-email">
              <h2>Email Subscription</h2>
              <input
                type="email"
                name="email-subscription"
                placeholder="Email Address"
              />
              <button>Subscribe <i className="fas fa-check-circle" /></button>
            </div>
            <div className="footer-quick-links">
              <div className="footer-links-wraper">
                <h2>Quick Links</h2>
                <div id="footer-active">
                  <Link className="links" to="/">
                    Home
                  </Link>
                </div>
                <Link className="links" to="/contactus">
                  Contact Us
                </Link>
                <Link className="links" to="/tandc">
                  T&C
                </Link>
              </div>
            </div>
            <div className="footer-address">
              <h2>Address</h2>
              <h3>
                2nd Floor, Tri Dev Complex, Above Rathi X-Ray Clinic, Udhna
                Darwaja, Surat-395002
              </h3>
              <p>
                <a href="tel:+917490044775">+91 7490044775 (India)</a>
              </p>
              <p>
                <a href="tel:+33769951365">+33 76995 1365 (Paris)</a>
              </p>
              <p>
                <a href="tel:+13438877726">+1 (343) 887-7726 (Canada)</a>
              </p>
              <p id="footer-email">
                <a href="mailto:info@msquaretec.com">info@msquaretec.com</a>
              </p>
              <p>
                <a href="mailto:support@msquaretec.com">
                  support@msquaretec.com
                </a>
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <h4>Copyright &copy; 2021 All rights reserved.</h4>
            <div className="social-links">
              <a
                href="https://twitter.com/m2squaretech"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://www.facebook.com/msquaretechnologies"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.linkedin.com/company/msquare-technologies/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://www.instagram.com/msquare_tec/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
