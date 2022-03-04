import React from 'react';
import ReactDOM from 'react-dom';
import formLogin from './react/formLogin.component';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App(){
  return (
      <Router>
          <Route exact path="/login" element={formLogin}/>
          <Route exact path="/backend"/>
      </Router>
    );
}

export default App