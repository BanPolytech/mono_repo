import React, {useEffect, useState} from 'react';
import {Link, Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import MaterialTable from "material-table";

import {makeStyles} from "@material-ui/core/styles";

import clsx from "clsx";
import {apiBase} from "../../config";
import http from "../../Http";
import {Breadcrumbs} from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import Client from "./Client";
import Agency from "./Agency";
import Project from "./Project";
import styles from "../../assets/jss/views/frameworkContractStyle";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(styles);

export default function FrameworkContract() {
    const classes = useStyles();

    let { path } = useRouteMatch();
    const history = useHistory();

    console.log(history)

    const pathnames = history.location.pathname.split('/').filter((x) => x);

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumb}>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    let to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    let breadcrumbName = 'CC';

                    switch (index) {
                        case 0:
                            breadcrumbName = 'Contrats Cadres'
                            break
                        case 1:
                            breadcrumbName = history.location.state.client_name
                            break
                        case 2:
                            breadcrumbName = history.location.state.agency_name
                            break
                    }
                    console.log(to)
                    console.log(breadcrumbName)

                    return last ? (
                        <Typography color="textPrimary" key={index}>
                            {breadcrumbName}
                        </Typography>
                    ) : (
                        <Link color="inherit" to={{
                            pathname: to,
                            state: {...history.location.state}
                        }} key={index}>
                            {breadcrumbName}
                        </Link>
                    );
                })}
            </Breadcrumbs>
            <Switch>
                <Route exact path={path}>
                    <Client/>
                </Route>
                <Route path={`${path}/:clientId/:agencyId`} >
                    <Project/>
                </Route>
                <Route path={`${path}/:clientId`}>
                    <Agency/>
                </Route>
            </Switch>
        </div>
    )
}
