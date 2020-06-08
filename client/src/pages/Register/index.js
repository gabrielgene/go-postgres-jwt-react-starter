import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { apiURl } from '../../api';
import * as S from './styles';

const Register = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    name: '',
    isSubmitting: false,
    message: '',
    errors: null,
  });

  const { email, password, name, message, isSubmitting, errors } = state;

  const handleChange = async (e) => {
    await setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setState({ ...state, isSubmitting: true });

    const { email, password, name } = state;
    try {
      const res = await fetch(`${apiURl}/register`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      const { success, msg, errors } = res;

      if (!success) {
        return setState({
          ...state,
          message: msg,
          errors,
          isSubmitting: false,
        });
      }

      history.push('/login');
    } catch (e) {
      setState({ ...state, message: e.toString(), isSubmitting: false });
    }
  };

  return (
    <S.RegisterWrapper>
      <S.RegisterForm>
        <Paper elevation={3} style={{ padding: 24 }}>
          <Typography variant="h2" gutterBottom>
            Register
          </Typography>
          <TextField
            style={{ marginBottom: 16 }}
            className="input"
            type="name"
            placeholder="Name"
            value={name}
            name="name"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            data-cy="name"
          />
          <TextField
            style={{ marginBottom: 16 }}
            className="input"
            type="text"
            placeholder="Email"
            value={email}
            name="email"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            data-cy="email"
          />
          <TextField
            style={{ marginBottom: 16 }}
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            data-cy="pass"
          />

          <Button
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            data-cy="submit"
          >
            {isSubmitting ? '.....' : 'Sign Up'}
          </Button>
          <div className="message">{message && <p>&bull; {message}</p>}</div>
          <div>
            {errors &&
              errors.map((error, id) => {
                return <p key={id}> &bull; {error}</p>;
              })}
          </div>
        </Paper>
      </S.RegisterForm>
    </S.RegisterWrapper>
  );
};

export default Register;
