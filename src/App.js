import React from 'react';
import {
  Switch, Route, useLocation, Redirect,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { toast, Flip } from 'react-toastify';

import './App.css';
import './transitions.css';
import LandingPage from './components/LandingPage';
import LogIn from './components/LogIn';
import ControlPanel from './components/main-panel/ControlPanel';
import Contact from './components/Contact';
import Features from './components/Features';

function checkUser() {
  if (localStorage.getItem('accessToken')) {
    axios({
      method: 'GET',
      url: 'https://api.iot.puyinfotech.com/api/user/',
      headers: {
        'x-access-token': localStorage.getItem('accessToken'),
      },
    })
      .then(() => true)
      .catch(() => {
        toast.error('Session expired! Please login again.', {
          position: 'top-center',
          autoClose: '3000',
          transition: Flip,
        });
        return false;
      });
  } else {
    toast.error('Session expired! Please login again.', {
      position: 'top-center',
      autoClose: '3000',
      transition: Flip,
    });
    return false;
  }
}

function ProtectedRoute(props) {
  return (
    <Route
      path={props.path}
      render={(data) => (checkUser() !== false ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <props.component {...data} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      ))}
    />
  );
}

function App() {
  const location = useLocation();

  const pageTransition = {
    initial: {
      bottom: 0,
    },
    animate: {
      bottom: '100%',
      transition: { duration: 1.5, ease: [0.9, 0, 0.1, 1] },
    },
    exit: {
      bottom: 0,
      transition: { duration: 1.5, ease: [0.9, 0, 0.1, 1] },
    },
  };

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/features">
            <Features />
          </Route>
          <Route exact path="/contactus">
            <Contact />
          </Route>
          <ProtectedRoute
            exact
            path="/mypanel"
            component={() => (
              <>
                <motion.div className="transition transition-1" initial="initial" animate="animate" exit="exit" variants={pageTransition} />
                <ControlPanel devices />
              </>
            )}
          />
          <ProtectedRoute exact path="/devices" component={() => <ControlPanel devices />} />
          <ProtectedRoute exact path="/usersetting" component={() => <ControlPanel usersetting />} />
          <ProtectedRoute exact path="/setting" component={() => <ControlPanel setting />} />
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
