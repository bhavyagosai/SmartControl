/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast, Flip } from 'react-toastify';
import Switch from 'react-switch';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import LoadingAnimation from './img/loading.json';

import bulb from './img/lightbulb.svg';
import bulbon from './img/lightbulb-on.svg';
import fan from './img/Fan.svg';
import AC from './img/AC-2.svg';
import ACon from './img/ACon-2.svg';
import TV from './img/tv.svg';
import TVon from './img/tv-solid-on.svg';

toast.configure();

export default function Devices() {
  const history = useHistory();
  const [allDevices, setAllDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [meridiem, setMeridiem] = useState('');
  const [greeting, setGreeting] = useState('');
  const [greet, setGreet] = useState('');

  const dayOfWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  const monthOfYear = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  const setDateTime = () => {
    const today = new Date();
    // eslint-disable-next-line no-nested-ternary
    let hour = today.getHours() % 12;
    if (hour === 0) {
      hour = 12;
    }
    const hours = hour.toString().length === 1 ? '0'.concat(hour) : hour;
    const minutes = today.getMinutes().toString().length === 1 ? '0'.concat(today.getMinutes()) : today.getMinutes();
    const Time = `${hours}:${minutes}`;
    const Meridiem = today.getHours() >= 12 ? 'PM' : 'AM';
    const displayDate = `${dayOfWeek[today.getDay()]}, ${today.getDate().toString().length === 1 ? '0'.concat(today.getDate()) : today.getDate()} ${monthOfYear[today.getMonth()]} ${today.getFullYear()}`;
    // eslint-disable-next-line no-nested-ternary
    const Greeting = today.getHours() > 6 && today.getHours() < 12 ? 'morning' : (today.getHours() >= 12 && today.getHours() < 18 ? 'afternoon' : (today.getHours() >= 18 && today.getHours() < 21 ? 'evening' : 'evening'));
    const Greet = today.getHours() >= 6 && today.getHours() < 18 ? 'nice day' : 'good night';

    setTime(Time);
    setMeridiem(Meridiem);
    setDate(displayDate);
    setGreeting(Greeting);
    setGreet(Greet);
  };

  useEffect(() => {
    let timerID;
    setIsLoading(true);
    axios.get('https://api.iot.puyinfotech.com/api/devices', {
      headers: {
        'x-access-token': localStorage.getItem('accessToken'),
      },
    })
      .then((res) => {
        // console.log(res.data);
        setAllDevices(res.data);
        timerID = setInterval(() => setDateTime(), 1000);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err.response);
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
          history.push('/');
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

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <>
      {
        isLoading && (
          <div style={{
            width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5em',
          }}
          >
            <Lottie animationData={LoadingAnimation} />
          </div>
        )
      }

      {
        !isLoading && (
          <div>
            {/* <div className="banner">
        <div className="backgroundImg">
          <img src={livingroom} alt="" />
        </div>
        <div className="selectionList">
          <select name="rooms" id="room">
            <option value="Living Room">Living Room</option>
            <option value="Drawing Room">Drawing Room</option>
            <option value="Bed Room">Bed Room</option>
            <option value="Kitchen">Kitchen</option>
          </select>
        </div>
        <div className="master-toggle">
          <div className="switch">
            <Switch
              className="switch"
              checked={masterSwitch}
              onChange={() => setMasterSwitch(!masterSwitch)}
              onColor="#2ECC71"
              onHandleColor="#fff"
              handleDiameter={35}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={30}
              width={70}
              id="material-switch"
            />
          </div>
        </div>
      </div> */}
            <div className="devices">
              <div className="devices-header">
                <div className="left-header">
                  <h1>Good {greeting}, <span>{JSON.parse(localStorage.getItem('userDetails')).first_name}</span></h1>
                  <p>Have a {greet}</p>
                </div>
                <div className="right-header">
                  <h1>{time} <span>{meridiem}</span></h1>
                  <p>{date}</p>
                </div>
              </div>
              <h1 id="header">Your Devices</h1>
              {
            allDevices.length !== 0 ? (
              <div className="devices-grid-container">
                <div className="devices-grid">
                  {
                    allDevices.map((device) => <Device id={device.id} key={device.id} name={device.name} type={device.type} deviceState={device.state} />)
                  }
                </div>
              </div>
            ) : (
              !isLoading && (
                <div className="nodevice">
                  <h1>No Devices found <i className="far fa-exclamation-square" /></h1>
                  {/* <i className="bx bx-box">😩</i> */}
                  {/* <i className="bx">😩</i> */}
                  <p>Download the Mobile app to add your smart devices</p>
                </div>
              )
            )
          }
              {/* <Device name="bulb" type={bulb} desc="living room light" deviceState={false} />
      <Device name="TV" type={TV} desc="living room TV" deviceState /> */}
            </div>
          </div>
        )
      }
    </>
  );
}

function deviceType(type) {
  if (type === 'fan') {
    return 'icon-animation-rotate';
  }
}
function deviceIcon(type) {
  if (type === 'fan') {
    return fan;
  }
  if (type === 'light_simple') {
    return bulb;
  }
  if (type === 'AC') {
    return AC;
  }
  if (type === 'TV') {
    return TV;
  }
}
function deviceIconOn(type) {
  if (type === 'fan') {
    return fan;
  }
  if (type === 'light_simple') {
    return bulbon;
  }
  if (type === 'AC') {
    return ACon;
  }
  if (type === 'TV') {
    return TVon;
  }
}
function Device(props) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(props.deviceState);
  }, []);

  function turnOnOff(id, state) {
    axios.get(`https://api.iot.puyinfotech.com/api/devices/${id}/${state}`, {
      headers: {
        'x-access-token': localStorage.getItem('accessToken'),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // eslint-disable-next-line no-console
          console.log('%c Success', 'color: green; font-size: 1em;');
        }
      })
      .catch((err) => {
        // console.log(err.response);
        toast.error(err.response.data.error, { autoClose: 5000 });
        toast.error(err.response.data.message, { autoClose: 5000 });
      });
  }
  return (
    <div className="device">
      <div className="top">
        <div className="icon">
          <img
            className={checked ? deviceType(props.type) : ''}
            width="30px"
            src={checked ? deviceIconOn(props.type) : deviceIcon(props.type)}
            alt={props.name}
          />
        </div>
        <div className="toggle-btn">
          <Switch
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              turnOnOff(props.id, checked ? 'off' : 'on');
            }}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={25}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={40}
            className="react-switch"
            id="material-switch"
          />
        </div>
      </div>
      <div className="device-desc">
        {props.name}
      </div>
      {/* <div className="device-state">
        {checked ? 'ON' : 'OFF'}
      </div> */}
    </div>
  );
}
