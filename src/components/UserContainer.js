import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import '../App.css';

import DefaultProfileImage from '../assets/default-profile.png';

function UserContainer({ secondaryBackground }) {
  const history = useHistory();

  const onHover = () => {
    document.getElementById('UserContainer').style.transitionDelay = '0s';
    document.getElementById('UserContainer').classList.add('hover');

    document.getElementById('UserHeader').style.transition = '0.2s ease';
    document.getElementById('UserHeader').style.transitionDelay = '0.15s';
    document.getElementById('UserHeader').classList.add('hover');

    document.getElementById('UserProfilePicture').style.transitionDelay = '0s';
    document.getElementById('UserProfilePicture').classList.add('hover');

    document.getElementById('UserName').style.transitionDelay = '0.15s';
    document.getElementById('UserName').classList.add('hover');

    document.getElementById('UserHam').style.transition = '0.5s ease';
    document.getElementById('UserHam').style.transitionDelay = '0.15s';
    document.getElementById('UserHam').classList.add('hover');
  };

  const onHoverEnd = () => {
    document.getElementById('UserHam').style.transition = '0.3s ease';
    document.getElementById('UserHam').style.transitionDelay = '0s';
    document.getElementById('UserHam').classList.remove('hover');

    document.getElementById('UserHeader').style.transition = '0.3s';
    document.getElementById('UserHeader').style.transitionDelay = '0s';
    document.getElementById('UserHeader').classList.remove('hover');

    document.getElementById('UserName').style.transitionDelay = '0.3s';
    document.getElementById('UserName').classList.remove('hover');

    document.getElementById('UserContainer').style.transitionDelay = '0.3s';
    document.getElementById('UserContainer').classList.remove('hover');

    document.getElementById('UserProfilePicture').style.transitionDelay = '0.3s';
    document.getElementById('UserProfilePicture').classList.remove('hover');
  };

  const userName = JSON.parse(localStorage.getItem('userDetails')).first_name;

  function onLogout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will Signout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, SignOut!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        history.push('/');
      }
    });
  }

  useEffect(() => {
    if (secondaryBackground) {
      document.getElementById('UserContainer').style.background = '#4a39d0DD';
    }

    const userDisplay = document.getElementById('UserContainer');
    userDisplay.addEventListener('mouseover', onHover);
    userDisplay.addEventListener('mouseout', onHoverEnd);

    return () => {
      userDisplay.removeEventListener('mouseover', onHover);
      userDisplay.removeEventListener('mouseout', onHoverEnd);
    };
  });

  return (
    <div className="UserContainer" id="UserContainer">
      <div className="UserHeader" id="UserHeader">
        <div className="UserProfilePicture" id="UserProfilePicture">
          <Link to="/usersetting">
            <img src={DefaultProfileImage} alt="Profile" />
          </Link>
        </div>
        <Link to="/usersetting">
          <div className="UserName" id="UserName" title={userName}>
            {userName}
          </div>
        </Link>
      </div>
      <div className="UserHam" id="UserHam">
        <ul>
          <Link to="/devices">
            <li><i className="fas fa-line-columns" />Dashboard</li>
          </Link>
          <Link to="/usersetting">
            <li><i className="fas fa-user" />Profile</li>
          </Link>
          <Link to="/setting">
            <li><i className="fas fa-cog" />Settings</li>
          </Link>
          {/* eslint-disable-next-line */}
          <div onClick={onLogout} style={{ cursor: 'pointer' }}>
            <li><i className="fas fa-sign-out-alt" />Log Out</li>
          </div>
        </ul>
      </div>
    </div>
  );
}

UserContainer.defaultProps = {
  secondaryBackground: false,
};

export default UserContainer;
