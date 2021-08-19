import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast, Flip } from 'react-toastify';
import axios from 'axios';
import Lottie from 'lottie-react';
// import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import LoadingAnimation from './img/loading.json';

toast.configure();

// const pageTransition = {
//   initial: {
//     bottom: 0,
//   },
//   animate: {
//     bottom: '100%',
//     transition: { duration: 1, ease: [0.9, 0, 0.1, 1] },
//   },
//   exit: {
//     bottom: 0,
//     transition: { duration: 1, ease: [0.9, 0, 0.1, 1] },
//   },
// };

export default function UserSetting() {
  const history = useHistory();
  const [id, setId] = useState('id');
  const [firstName, setFirstName] = useState('user fname');
  const [LastName, setLastName] = useState('user lname');
  const [userEmial, setUserEmail] = useState('user@gmail.com');
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://api.iot.puyinfotech.com/api/user', {
      headers: {
        'x-access-token': localStorage.getItem('accessToken'),
      },
    })
      .then((res) => {
        // console.log(res.data);
        setId(res.data.id);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setUserEmail(res.data.email);
        setIsActive(res.data.active);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setIsLoading(false);
        try {
          if (err.response.status === 401) {
            Swal.fire({
              title: 'Session Expired',
              text: 'Your session has Expired, Signin again to Continue',
              icon: 'error',
            }).then(() => {
              localStorage.clear();
              history.push('/');
            });
            return;
          }
        } catch (error) {
          toast.error('Session expired! Please login again.', {
            position: 'top-center',
            autoClose: '3000',
            transition: Flip,
          });
          localStorage.clear();
          return;
        }
        toast.error(err.response.data.error, {
          position: 'top-center',
          autoClose: '3000',
          transition: Flip,
        });
        toast.error(err.response.data.message, {
          position: 'top-center',
          autoClose: '3000',
          transition: Flip,
        });
      });
  }, []);

  return (
    <>
      {
        isLoading && (
          // <div className="loader-wraper">
          //   <div className="loader" />
          // </div>
          <div style={{
            width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5em',
          }}
          >
            <Lottie animationData={LoadingAnimation} />
          </div>
        )
      }
      {/* <motion.div className="transition transition-1" initial="initial" animate="animate" exit="exit" variants={pageTransition} /> */}
      {
        !isLoading && (
        <div className="userSetting">
          <h1>Profile</h1>
          <div className="details">
            <div className="info">
              <h3>ID: <span className="value">{id}</span></h3>
              <h2>
                {isActive ? <FontAwesomeIcon size="2x" icon={faCheckCircle} color="green" /> : <FontAwesomeIcon size="2x" icon={faTimesCircle} color="red" />}
              </h2>
            </div>
            <h3>First Name: <span className="value">{firstName}</span></h3>
            <h3>Last Name: <span className="value">{LastName}</span></h3>
            <h3>Email: <span className="value">{userEmial}</span></h3>
          </div>
        </div>
        )
        }
    </>
  );
}
