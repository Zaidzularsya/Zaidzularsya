import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import logo from '../../assets/img/logo-ct-dark.png';

function SideNav(){
  const [isActive, setIsActive] = useState('');
  const clickMenu = (event)=>{
    console.log(event.target.name);
    setIsActive(event.target.name);
  }

  const logout = ()=>{
    fetch('http://localhost:8000/users/logout').then((response)=>{
      if (response.ok) { return response.json() }
    }).then((response)=> { 
      window.location.replace('http://localhost:8000/backend')
    }).catch((error) => { return Promise.reject(error) });
  }

  return(
    <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
      <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a className="navbar-brand m-0" href=" https:/demos.creative-tim.com/argon-dashboard/pages/dashboard.html " target="_blank">
        <img src={logo} className="navbar-brand-img h-100" alt="main_logo"/>
        <span className="ms-1 font-weight-bold">Argon Dashboard 2</span>
      </a>
    </div>
    <hr className="horizontal dark mt-0" />
    <div className="collapse navbar-collapse w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={ 'nav-link ' + (isActive=='dashboard' ? "active" : "") } to="/backend" onClick={clickMenu} name="dashboard">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={ 'nav-link ' + (isActive=='Tables' ? "active" : "") } to="/table" onClick={ clickMenu } name="Tables">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">Tables</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={ 'nav-link ' + (isActive=='Billing' ? "active" : "") } to="/billing" onClick={ clickMenu } name="Billing">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-credit-card text-success text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">Billing</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={ 'nav-link ' + (isActive=='vr' ? "active" : "") } to="/virtual" onClick={ clickMenu } name="vr">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-app text-info text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">Virtual Reality</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={ 'nav-link ' + (isActive=='RTL' ? "active" : "") } to="/rtl" onClick={ clickMenu } name="RTL">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-world-2 text-danger text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">RTL</span>
          </Link>
        </li>
        <li className="nav-item mt-3">
          <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
        </li>
        <li className="nav-item">
          <Link className={ 'nav-link ' + (isActive=='Profile' ? "active" : "") } to="/profil" onClick={ clickMenu } name="Profile">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-single-02 text-dark text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">Profile</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={ 'nav-link ' + (isActive=='Sign In' ? "active" : "") } to="/sign-in" onClick={ clickMenu } name="Sign In">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-single-copy-04 text-warning text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">Sign In</span>
          </Link>
        </li>
        <li className="nav-item">
          <a className={ 'nav-link ' + (isActive=='Log Out' ? "active" : "") } to="" onClick={logout} name="Log Out">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-collection text-info text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">Log Out</span>
          </a>
        </li>
      </ul>
    </div>
    </aside>
    );
}

export default SideNav;