import React from 'react';
import styles from '../assets/styles/globalMaterialStyle';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

function Enterprise() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
            <h1>Entreprises</h1>
            </div>
        </div>
    );
}

export default Enterprise;
