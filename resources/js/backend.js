import React, { useEffect, useState }  from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


// Component
import SideNav from './react/SideNav.component';
import NavBar from './react/NavBar.component';

// Componen Main Content
import Dashboard from './react/Dashboard.component';
import Profil from './react/Profil.component';


 // <img src={process.env.PUBLIC_URL + '/img/logo.png'} />

  const session = () => {
    let response = fetch("http://localhost:8000/users/isSessionExpired").then((response)=>{
        if (response.ok) { return response.json()}
    }).then((response)=>{
      return response;
    }).catch((error)=>{
        return Promise.reject(error);
    });
  }

function Loader(){

  return (
    <div className={'loader'}></div>
    );
}

function App(){
  const [profil, setProfil] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(()=>{
    fetch('http://localhost:8000/api/users/admin').then((response)=>{
      if (response.ok) { return response.json() }
    }).then((response)=> { 
      setProfil(response);
      setLoading(false);
    }).catch((error) => { return Promise.reject(error) });
  },[]);

  return (
      <Router>
        <div className="min-height-300 bg-primary position-absolute w-100"></div>
        <SideNav/>
        <main className="main-content position-relative border-radius-lg ">
        {isLoading
          ? <NavBar profil= { null }/>
          : <NavBar profil= { profil }/>
        }
        <Routes>
              <Route exact path="/backend" element={<Dashboard/>}></Route>
              <Route exact path="/profil" element={<Profil profil = { isLoading ? null : profil } />} ></Route>
        </Routes>
        </main>
      </Router>
    );
}

ReactDOM.render(
  <App/>,
  document.getElementById('react-app')
);




