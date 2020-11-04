import React, {useState} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import {IconButton} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons
import {HighlightOff} from "@material-ui/icons";
// core components
import styles from "./clearAllStyle.js";

const useStyles = makeStyles(styles);

export default function ClearAll(props) {
    const classes = useStyles();
    const {
        labelText,
        id,
        onClickClear
    } = props;

    return (
        <div id={id} className={classes.div}>
            <Typography variant="button" display="block" gutterBottom >
                {labelText}
            </Typography>
            <IconButton aria-label="clear" onClick={onClickClear}>
                <HighlightOff />
            </IconButton>
        </div>
    );
}

ClearAll.propTypes = {
    labelText: PropTypes.string,
    id: PropTypes.string,
    onClickClear: PropTypes.func
}
