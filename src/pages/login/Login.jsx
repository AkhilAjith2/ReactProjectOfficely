import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, TextField, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LeftSideImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const RightSideForm = styled.div`
  padding: 24px;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
`;

const LoginTitleContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-bottom: 16px;
  font-family: Dubai-Medium;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const LoginButton = styled(Button)`
  width: 150px;
  height: 40px;
  margin-top: 50px;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: center;
  justify-content: center;

  &:hover {
    background-color: grey;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (password.length < 3) {
      setPasswordError('Password must be at least 3 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };


  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const isValid = () => validateEmail() && validatePassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) {
      return;
    }
    console.log('An email was submitted: ', email);
    console.log('A password was submitted: ', password);

    navigate('/hotels');
    console.log('Navigating to /hotels from Login button in login');
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={false} sm={6}>
        <LeftSideImage src="https://t3.ftcdn.net/jpg/05/79/48/52/360_F_579485255_hzHox0stuQmBx5QViwnQqQjk7RD2AJza.jpg" alt="Background" />
      </Grid>
      <Grid item xs={12} sm={6} component={Paper} elevation={6} square>
        <RightSideForm>
          <LoginContainer>
            <LoginTitleContainer>
              <h1>Welcome to Officely!</h1>
            </LoginTitleContainer>

            <form onSubmit={handleSubmit}>
              <LoginForm>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={!!passwordError}
                  helperText={passwordError}
                />
                <LoginButton type="submit" centerRipple variant="contained" sx={{ mt: 4, mb: 4 }}>
                  Log in
                </LoginButton>
              </LoginForm>
            </form>
          </LoginContainer>
        </RightSideForm>
      </Grid>
    </Grid>
  );
};

export default Login;
