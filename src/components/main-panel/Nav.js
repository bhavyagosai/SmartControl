import React from 'react';
import Swal from 'sweetalert2';
import { useHistory, NavLink } from 'react-router-dom';

import logo from './img/Logo.svg';

export default function Nav() {
  const history = useHistory();

  function logout() {
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

  return (
    <>
      <div className="Nav-container">
        <nav className="Nav-nav">
          <div className="Nav-menu">
            <NavLink to="/"><img src={logo} alt="Logo" /></NavLink>
          </div>
          <div className="Nav-navlinks">
            <NavLink className="navlink" activeClassName="activCls" to="/devices">
              <div className="nav-icons"><i className="far fa-phone-laptop" /></div>
            </NavLink>
            <NavLink className="navlink" activeClassName="activCls" to="/usersetting">
              <div className="nav-icons"><i className="fas fa-user" /></div>
            </NavLink>
            <NavLink className="navlink" activeClassName="activCls" to="/setting">
              <div className="nav-icons"><i className="fas fa-cog" /></div>
            </NavLink>
          </div>
          {/* eslint-disable-next-line */}
          <div className="Nav-exit" onClick={logout}>
            <button>
              <i className="fas fa-sign-out-alt" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
