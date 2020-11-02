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

        {/*
        <>
          <div id="top">
            <img src="/images/logo-chantier-prive.svg" alt="Chantier Privé" />
            <span className="menu-icon">
              <img src="/images/burger.svg" alt="Menu" onClick={() => openBurger()} />
            </span>
          </div>
          <div className="container-fluid">
            <SideBar toCall={() => openBurger()} />
            <div className="content-bar">
              <div className="container-center">
                <Switch>
                  <Route exact path="/consultation_open" component={OpenConsultationList} />
                  <Route exact path="/consultation_open/create" component={CreateOpenConsultation} />
                  <Route exact path="/consultation_open/:consultationId/update" component={UpdateOpenConsultation} />
                  <Route exact path="/consultation_ask" component={AskedConsultationList} />
                  <Route exact path="/consultation_account" component={AccountConsultationList} />

                  <Route exact path="/company/:companyId" component={CompanyDetails} />

                  <Route exact path="/settings/profile/" component={PersonnalInformationList} />
                  <Route exact path="/settings/subscription/" component={Subscription} />
                  <Route exact path="/settings/subscription/resubscribe" component={Resubscribe} />
                  <Route exact path="/settings/subscription/failed" component={SubscriptionPaymentFailed} />
                  <Route exact path="/settings/subscription/success" component={SubscriptionPaymentSuccess} />
                  <Route exact path="/settings/preferences/" component={PreferencesList} />

                  <Route component={NotFound} />
                </Switch>
                <Footer />
              </div>
            </div>
          </div>
        </>*/}
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <RoutePath />,
  document.getElementById('app'),
);

export default RoutePath;
