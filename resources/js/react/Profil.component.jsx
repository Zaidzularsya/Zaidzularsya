import React, { useEffect, useState }  from 'react';
import ReactDOM from 'react-dom';
import team1 from '../../assets/img/team-1.jpg';
import team2 from '../../assets/img/team-2.jpg';
import bgProfil from '../../assets/img/bg-profile.jpg';

function Profil(props){
  const add_moving_tab = ()=>{
    var total = document.querySelectorAll('.nav-pills');

    total.forEach(function(item, i) {
      var moving_div = document.createElement('div');
      var first_li = item.querySelector('li:first-child .nav-link');
      var tab = first_li.cloneNode();
      tab.innerHTML = "-";

      moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
      moving_div.appendChild(tab);
      item.appendChild(moving_div);

      var list_length = item.getElementsByTagName("li").length;

      moving_div.style.padding = '0px';
      moving_div.style.width = item.querySelector('li:nth-child(1)').offsetWidth + 'px';
      moving_div.style.transform = 'translate3d(0px, 0px, 0px)';
      moving_div.style.transition = '.5s ease';

      item.onmouseover = function(event) {
        let target = getEventTarget(event);
        let li = target.closest('li'); // get reference
        if (li) {
          let nodes = Array.from(li.closest('ul').children); // get array
          let index = nodes.indexOf(li) + 1;
          item.querySelector('li:nth-child(' + index + ') .nav-link').onclick = function() {
            moving_div = item.querySelector('.moving-tab');
            let sum = 0;
            if (item.classList.contains('flex-column')) {
              for (var j = 1; j <= nodes.indexOf(li); j++) {
                sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
              }
              moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
              moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
            } else {
              for (var j = 1; j <= nodes.indexOf(li); j++) {
                sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
              }
              moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
              moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
            }
          }
        }
      }
    });

  }

  const scroll = () =>{
    var win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {
      var options = {
        damping: '0.5'
      }
      Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
    }
  }
  useEffect(()=>{
    scroll();
    add_moving_tab();
  });
  return (
    <div>
      <div className="card shadow-lg mx-4 card-profile-bottom">
        <div className="card-body p-3">
          <div className="row gx-4">
            <div className="col-auto">
              <div className="avatar avatar-xl position-relative">
                <img src={ team1 } alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
              </div>
            </div>
            <div className="col-auto my-auto">
              <div className="h-100">
                <h5 className="mb-1">
                  { props.profil.NAME }
                </h5>
                <p className="mb-0 font-weight-bold text-sm">
                  { props.profil.USERNAME }
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
              <div className="nav-wrapper position-relative end-0">
                <ul className="nav nav-pills nav-fill p-1" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link mb-0 px-0 py-1 active d-flex align-items-center justify-content-center " data-bs-toggle="tab" href="#" role="tab" aria-selected="true">
                      <i className="ni ni-badge"></i>
                      <span className="ms-2">Profil</span>
                    </a>
                  </li>
                  {/*<li className="nav-item">
                    <a className="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center " data-bs-toggle="tab" href="#" role="tab" aria-selected="false">
                      <i className="ni ni-email-83"></i>
                      <span className="ms-2">Messages</span>
                    </a>
                  </li>*/}
                  <li className="nav-item">
                    <a className="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center " data-bs-toggle="tab" href="#" role="tab" aria-selected="false">
                      <i className="ni ni-settings-gear-65"></i>
                      <span className="ms-2">Settings</span>
                    </a>
                  </li>
                  
                </ul>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex align-items-center">
                  <p className="mb-0">Edit Profile</p>
                  <button className="btn btn-primary btn-sm ms-auto">Settings</button>
                </div>
              </div>
              <div className="card-body">
                <p className="text-uppercase text-sm">User Information</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="example-text-input" className="form-control-label">Username</label>
                      <input className="form-control" type="text" defaultValue={ props.profil.USERNAME } />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="example-text-input" className="form-control-label">Email address</label>
                      <input className="form-control" type="email" defaultValue={ props.profil.EMAIL } />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="example-text-input" className="form-control-label">First name</label>
                      <input className="form-control" type="text" defaultValue={ props.profil.FIRST_NAME } />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="example-text-input" className="form-control-label">Last name</label>
                      <input className="form-control" type="text" defaultValue={ props.profil.LAST_NAME } />
                    </div>
                  </div>
                </div>
                <hr className="horizontal dark" />
                <p className="text-uppercase text-sm">Contact Information</p>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="example-text-input" className="form-control-label">Address</label>
                      <input className="form-control" type="text" defaultValue={ props.profil.ADDRESS} />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="example-text-input" className="form-control-label">City</label>
                      <input className="form-control" type="text" defaultValue={ props.profil.CITY } />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="example-text-input" className="form-control-label">Country</label>
                      <input className="form-control" type="text" defaultValue={ props.profil.COUNTRY } />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="example-text-input" className="form-control-label">Postal code</label>
                      <input className="form-control" type="text" defaultValue={ props.profil.POSTAL_CODE} />
                    </div>
                  </div>
                </div>
                <hr className="horizontal dark" />
                <p className="text-uppercase text-sm">About me</p>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="example-text-input" className="form-control-label">About me</label>
                      <input className="form-control" type="text" defaultValue={ props.profil.BIO } />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<div className="col-md-4">
            <div className="card card-profile">
              <img src={ bgProfil } alt="Image placeholder" className="card-img-top" />
              <div className="row justify-content-center">
                <div className="col-4 col-lg-4 order-lg-2">
                  <div className="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
                    <a href="#">
                      <img src={ team2 } className="rounded-circle img-fluid border border-2 border-white" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
                <div className="d-flex justify-content-between">
                  <a href="#" className="btn btn-sm btn-info mb-0 d-none d-lg-block">Connect</a>
                  <a href="#" className="btn btn-sm btn-info mb-0 d-block d-lg-none"><i className="ni ni-collection"></i></a>
                  <a href="#" className="btn btn-sm btn-dark float-right mb-0 d-none d-lg-block">Message</a>
                  <a href="#" className="btn btn-sm btn-dark float-right mb-0 d-block d-lg-none"><i className="ni ni-email-83"></i></a>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="row">
                  <div className="col">
                    <div className="d-flex justify-content-center">
                      <div className="d-grid text-center">
                        <span className="text-lg font-weight-bolder">22</span>
                        <span className="text-sm opacity-8">Friends</span>
                      </div>
                      <div className="d-grid text-center mx-4">
                        <span className="text-lg font-weight-bolder">10</span>
                        <span className="text-sm opacity-8">Photos</span>
                      </div>
                      <div className="d-grid text-center">
                        <span className="text-lg font-weight-bolder">89</span>
                        <span className="text-sm opacity-8">Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h5>
                    Mark Davis<span className="font-weight-light">, 35</span>
                  </h5>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2"></i>Bucharest, Romania
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2"></i>University of Computer Science
                  </div>
                </div>
              </div>
            </div>
          </div>*/}
        </div>
        <footer className="footer pt-3  ">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-lg-between">
              <div className="col-lg-6 mb-lg-0 mb-4">
                <div className="copyright text-center text-sm text-muted text-lg-start">
                  © 
                    { new Date().getFullYear() }
                  ,
                  made with <i className="fa fa-heart"></i> by
                  <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank">Creative Tim</a>
                  for a better web.
                </div>
              </div>
              <div className="col-lg-6">
                <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                  <li className="nav-item">
                    <a href="https://www.creative-tim.com" className="nav-link text-muted" target="_blank">Creative Tim</a>
                  </li>
                  <li className="nav-item">
                    <a href="https://www.creative-tim.com/presentation" className="nav-link text-muted" target="_blank">About Us</a>
                  </li>
                  <li className="nav-item">
                    <a href="https://www.creative-tim.com/blog" className="nav-link text-muted" target="_blank">Blog</a>
                  </li>
                  <li className="nav-item">
                    <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted" target="_blank">License</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
    );
}


export default Profil;