/* eslint-disable react/prop-types */
import React from 'react';

import './main.css';

import Nav from './Nav';
import Devices from './Devices';
import UserSetting from './UserSetting';
import Setting from './Setting';
import UserContainer from '../UserContainer';

export default function ControlPanel(props) {
  return (
    <>
      <div className="control-panel-container">
        <div className="control-panel-wraper">
          <div className="sidePanel">
            <Nav />
          </div>
          <div className="control-panel">
            {props.devices ? <Devices /> : <></>}
            {props.usersetting ? <UserSetting /> : <></>}
            {props.setting ? <Setting /> : <></>}
          </div>
          <div className="User-Container">
            <UserContainer secondaryBackground />
          </div>
        </div>
      </div>
    </>
  );
}
