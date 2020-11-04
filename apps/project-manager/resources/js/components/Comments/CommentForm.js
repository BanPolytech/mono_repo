import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import CustomInput from "../CustomInput/CustomInput";
import {Button} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    saveButton: {
        fontSize: "small",
    }
}));

export default function CommentForm(props) {

    const [comment, setComment] = useState('');

    const classes = useStyles();

    const handleChange = (event) => {
        setComment(event.target.value);
    }

    const handleOnClickAddComment = () => {
        props.onAddComment(comment);
        setComment('');
    }

    return (
        <FormControl
            fullWidth={true}
        >
            <Input
                id="standard-adornment-password"
                type={'text'}
                placeholder={'Rédiger un commentaire'}
                multiline={true}
                rowsMax={7}
                rows={5}
                value={comment}
                onChange={handleChange}
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            className={classes.saveButton}
                            onClick={handleOnClickAddComment}
                        >
                            Enregistrer
                        </Button>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}

CommentForm.propTypes = {
    onAddComment: PropTypes.func,
};
