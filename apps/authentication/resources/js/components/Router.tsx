import React, { Component, useEffect, useState } from 'react';

import ReactDOM from 'react-dom';
import {
  Route, BrowserRouter, Switch,
} from 'react-router-dom';

// Authentication imports
import Home from './authentication/Home';
import Login from './authentication/Login';
import ResetPassword from './authentication/ResetPassword';
import RecoveryPassword from './authentication/RecoveryPassword';
import AcceptInvitation from './redirections/AcceptInvitation';
import AccessPromotion from "./redirections/AccessPromotion";

const RoutePath: React.FC = () => {

  return (
    <BrowserRouter>
      {/* <MenuAppBar title="360 Chantiers" /> */}
      <Switch>
        {/* Authentication routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/promotion/:token" component={AccessPromotion} />
        <Route exact path="/invitation/:token" component={AcceptInvitation} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/recovery-password/:token/:email" component={RecoveryPassword} />

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
