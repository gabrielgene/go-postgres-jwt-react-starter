import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Register from './components/Register';
import Login from './components/Login';
import Session from './components/Session';

import CustomerList from './pages/CustomerList';
import CustomerAdd from './pages/CustomerAdd';
import Customer from './pages/Customer';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Route exact path="/" component={CustomerList} />
        <Route exact path="/add/customer" component={CustomerAdd} />

        <Route path="/customer/:id" component={Customer} />

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/session" component={Session} />
      </Router>
    </React.Fragment>
  );
}

export default App;
