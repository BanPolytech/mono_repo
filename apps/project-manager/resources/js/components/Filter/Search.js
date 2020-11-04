import React, {useState} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import SearchIcon from "@material-ui/icons/Search";
// core components
import styles from "./searchStyle.js";

const useStyles = makeStyles(styles);

export default function Search(props) {
    const classes = useStyles();
    const {
        labelText,
        id,
        inputProps,
        onChangeFilter
    } = props;

    const [data, setData] = useState('');

    function handleFieldChange(e) {
        const value = e.target.value;
        setData(value);
        onChangeFilter(value);
    }

    return (
        <TextField
            className={classes.margin}
            id={id}
            label={labelText}
            value={data}
            onChange={(e) => handleFieldChange(e)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                ...inputProps
            }}
        />
    );
}

Search.propTypes = {
    labelText: PropTypes.node,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    onChangeFilter: PropTypes.func,
};
