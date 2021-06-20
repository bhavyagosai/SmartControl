import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function signinToggle() {
  const formBx = document.querySelector('.formBx');
  const loginWraper = document.querySelector('.login-wraper');

  formBx.classList.remove('active');
  loginWraper.classList.remove('active');
}
function signupToggle() {
  const formBx = document.querySelector('.formBx');
  const loginWraper = document.querySelector('.login-wraper');

  formBx.classList.add('active');
  loginWraper.classList.add('active');
}

function LogIn() {
  useEffect(() => {
    window.onload = () => {
      const transition_element = document.querySelector('.transition');
      // const link = document.getElementById("Login");

      setTimeout(() => {
        transition_element.classList.remove('is-active');
      }, 150);

      // link.addEventListener("click", (e) => {
      //   e.preventDefault();
      //   let target = e.target.href;
      //   transition_element.classList.add("is-active");

      //   setTimeout(() => {
      //     window.location.href = target;
      //   }, 500);
      // });
    };
  });
  return (
    <>
      <div className="transition transition-2 is-active" />

      <div className="login-wraper">
        <Navbar activeLink="login" isHiddenUponScroll={false} />
        <div className="container">
          <div className="blueBg">
            <div className="box signin">
              <h2>Already have an Account ?</h2>
              <button onClick={signinToggle} className="signinBtn">
                Sign In
              </button>
            </div>
            <div className="box signup">
              <h2>Don&apos;t Have an Account ?</h2>
              <button onClick={signupToggle} className="signupBtn">
                Sign Up
              </button>
            </div>
          </div>
          <div className="formBx">
            <div className="form signinForm">
              <form>
                <h3>Sign In</h3>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <input type="submit" value="Login" />
                <Link className="forget" to="/forgetPassword">
                  Forget Password
                </Link>
              </form>
            </div>

            <div className="form signupForm">
              <form>
                <h3>Sign Up</h3>
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <input type="submit" value="Register" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
