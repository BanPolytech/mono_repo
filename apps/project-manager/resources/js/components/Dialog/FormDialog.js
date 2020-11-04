import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";

export default function FormDialog(props) {
    const {
        dialogOpen,
        title,
        content,
        formTitle,
        formValue,
        onClickConfirm,
        onClickCancel,
        ...rest
    } = props;

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(formValue);

    useEffect(() => {
        setOpen(dialogOpen);
    }, [dialogOpen])

    useEffect(() => {
        setValue(formValue);
    }, [formValue])

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                    <TextField
                        id="standard-number"
                        label={formTitle}
                        type="number"
                        value={value}
                        onChange={(event => {setValue(event.target.value)})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClickCancel} color="default">
                        Non
                    </Button>
                    <Button onClick={() => {onClickConfirm(value)}} color="primary" autoFocus>
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

FormDialog.propTypes = {
    dialogOpen: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    formTitle: PropTypes.string,
    formValue: PropTypes.number,
    onClickConfirm: PropTypes.func,
    onClickCancel: PropTypes.func,
}
