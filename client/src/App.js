import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { apiURl } from './api';
import Register from './pages/Register';
import Login from './pages/Login';

import CustomerList from './pages/CustomerList';
import CustomerAdd from './pages/CustomerAdd';
import PaymentAdd from './pages/PaymentAdd';
import Customer from './pages/Customer';
import './App.css';

function App() {
  const [redirect, setRedirect] = React.useState('');
  React.useEffect(() => {
    const getUserSession = async () => {
      const res = await fetch(`${apiURl}/session`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          Authorization: document.cookie,
        },
      })
        .then((res) => res.json())
        .catch((err) => setRedirect('REDIRECT'));

      if (res && !res.success) {
        setRedirect('REDIRECT');
      }
    };
    getUserSession();
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        {redirect === 'REDIRECT' && <Redirect to="/" />}

        <Route path="/customers" component={CustomerList} />
        <Route exact path="/add/customer" component={CustomerAdd} />

        <Route path="/customer/:id" component={Customer} />
        <Route exact path="/add/payment" component={PaymentAdd} />
        <Route exact path="/edit/customer" component={CustomerAdd} />
      </Router>
    </React.Fragment>
  );
}

export default App;
