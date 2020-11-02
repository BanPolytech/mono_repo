import React, { Component, useEffect, useState } from 'react';

import ReactDOM from 'react-dom';
import {
  Route, BrowserRouter, Switch,
} from 'react-router-dom';

// Authentication imports
import Home from './authentication/Home';
import Login from './authentication/Login';
import PasswordLost from './authentication/PasswordLost';
import RecoveryPassword from './authentication/RecoveryPassword';
import Dashboard from './private/Dashboard';
import AcceptInvitation from './redirections/AcceptInvitation';

const RoutePath: React.FC = () => {

  return (
    <BrowserRouter>
      {/* <MenuAppBar title="360 Chantiers" /> */}
      <Switch>
        {/* Authentication routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/invitation/:email/:token" component={AcceptInvitation} />
        <Route exact path="/connexion" component={Login} />
        <Route exact path="/identifiants-perdus" component={PasswordLost} />
        <Route exact path="/reinitialiser-identifiants/:email/:token" component={RecoveryPassword} />

        {/*Dashboard*/}
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <RoutePath />,
  document.getElementById('app'),
);

export default RoutePath;
