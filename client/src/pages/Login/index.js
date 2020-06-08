import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { apiURl } from '../../api';
import { createCookie } from '../../utils';
import * as S from './styles';

const Login = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    isSubmitting: false,
    message: '',
  });

  const { email, password, isSubmitting, message } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    setState({ ...state, isSubmitting: true });

    const { email, password } = state;
    try {
      const res = await fetch(`${apiURl}/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());

      const { token, success, msg, user } = res;

      if (!success) {
        return setState({
          ...state,
          message: msg,
          isSubmitting: false,
        });
      }
      // expire in 30 minutes(same time as the cookie is invalidated on the backend)
      createCookie('token', token, 0.5);

      history.push({ pathname: '/customers', state: user });
    } catch (e) {
      setState({ ...state, message: e.toString(), isSubmitting: false });
    }
  };

  return (
    <S.LoginWrapper>
      <S.LoginForm>
        <Paper elevation={3} style={{ padding: 24 }}>
          <Typography variant="h2" gutterBottom>
            Login
          </Typography>
          <TextField
            style={{ marginBottom: 16 }}
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="email"
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            data-cy="email"
          />
          <TextField
            style={{ marginBottom: 24 }}
            type="password"
            placeholder="password"
            value={password}
            name="password"
            id="pass"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            data-cy="pass"
          />

          <Button
            style={{ marginBottom: 16 }}
            disabled={isSubmitting}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            data-cy="submit"
          >
            {isSubmitting ? '.....' : 'Login'}
          </Button>
          <Button
            onClick={() => history.push('/register')}
            variant="contained"
            fullWidth
          >
            Register
          </Button>
          <div className="message">{message}</div>
        </Paper>
      </S.LoginForm>
    </S.LoginWrapper>
  );
};

export default Login;
