import React, {useState} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import SelectField from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/icons
// core components
import styles from "./selectStyle.js";

const useStyles = makeStyles(styles);

export default function Select(props) {
    const classes = useStyles();
    const {
        labelText,
        id,
        items,
        inputProps,
        multiple,
        onChangeFilter
    } = props;

    const [data, setData] = useState(multiple ? [] : '');

    function handleFieldChange(e) {
        const value = e.target.value;
        setData(value);
        onChangeFilter(value);
    }

    return (
        <FormControl className={classes.formControl}>
            <InputLabel shrink id={"field_" + id + "_label"}>{labelText}</InputLabel>
            <SelectField
                labelId={"field_" + id + "_label"}
                id={"field_" + id}
                value={data}
                onChange={(e) => handleFieldChange(e)}
                multiple={multiple}
                displayEmpty={true}
                renderValue={multiple ? (selected) => {
                    if (selected.length === 0) {
                        return <em>{items[0]}</em>;
                    }

                    return selected.join(', ');
                } : undefined}
                className={classes.selectEmpty}
            >
                {items.map((item, indexItem) => {
                    return <MenuItem
                        key={indexItem}
                        value={(indexItem === 0) ? '' : item}
                        disabled={indexItem === 0 && multiple}
                    >
                        {(indexItem === 0) ? <em>{item}</em> : item}
                    </MenuItem>
                })}
            </SelectField>
        </FormControl>
    );
}

Select.propTypes = {
    labelText: PropTypes.node,
    id: PropTypes.string,
    items: PropTypes.array,
    inputProps: PropTypes.object,
    multiple: PropTypes.bool,
    onChangeFilter: PropTypes.func,
};
