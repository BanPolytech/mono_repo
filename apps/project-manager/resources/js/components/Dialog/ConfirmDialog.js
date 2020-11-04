import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
    const {
        dialogOpen,
        title,
        content,
        onClickConfirm,
        onClickCancel,
        ...rest
    } = props;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(dialogOpen);
    }, [dialogOpen])


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
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClickCancel} color="default">
                        Non
                    </Button>
                    <Button onClick={onClickConfirm} color="primary" autoFocus>
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AlertDialog.propTypes = {
    dialogOpen: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    onClickConfirm: PropTypes.func,
    onClickCancel: PropTypes.func,
}
