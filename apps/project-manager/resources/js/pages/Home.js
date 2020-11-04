import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core';

import LoginForm from '../components/LoginForm';
import Logo from "../components/Logo";

export default function Home() {
  return (
      <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs>
              <Logo />
          </Grid>
          <Grid item xs={6}>
              <LoginForm />
          </Grid>
          <Grid item xs>

          </Grid>
      </Grid>
  );
}
