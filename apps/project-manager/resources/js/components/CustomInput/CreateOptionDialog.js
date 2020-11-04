/* eslint-disable no-use-before-define */
import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import http from "../../Http";

const filter = createFilterOptions();

export default function CreateOptionDialog(props) {
    const {
        val,
        apiCall,
        fields,
        mainField,
        dialogText
    } = props;

    const [value, setValue] = useState(val);
    const [open, toggleOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    const handleClose = () => {
        setDialogValue(initialStateDialogValue);

        toggleOpen(false);
    };


    let initialStateDialogValue = {}
    fields.map((field) => {
        initialStateDialogValue = {
            ...initialStateDialogValue,
            [field]: ''
        }
    })
    const [dialogValue, setDialogValue] = useState(initialStateDialogValue);

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        http
            .get(apiCall.routeGet)
            .then(response => {
                const list = response.data;

                if (active) {
                    setOptions(Object.keys(list).map((key) => list[key]));
                }
            })
            .catch((e) => {
                console.log('Unable to get data.');
                console.log(e);
            });

        return () => {
            active = false;
        };
    }, [loading]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEntry = {...dialogValue}
        http
            .post(apiCall.routePost, newEntry)
            .then(({ data: response }) => {
                setValue(dialogValue[mainField]);
            })
            .catch((e) => {
                console.log(e)
            });

        handleClose();
    };

    return (
        <React.Fragment>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                ...initialStateDialogValue,
                                [mainField]: newValue,
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            ...initialStateDialogValue,
                            [mainField]: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            [mainField]: `Ajouter "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={options}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option[mainField];
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(option) => option.title}
                style={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="Free solo dialog" variant="outlined" />
                )}
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">{dialogText.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {dialogText.content}
                        </DialogContentText>
                        {
                            fields.map((field, indexField) => {
                                return <TextField
                                    autoFocus
                                    margin="dense"
                                    id={"field_" + indexField}
                                    value={dialogValue[field.name]}
                                    onChange={(event) => setDialogValue({ ...dialogValue, [field.name]: event.target.value })}
                                    label={field.label}
                                    type={field.type}
                                />
                            })
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button type="submit" color="primary">
                            Ajouter
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}

CreateOptionDialog.propTypes = {
    val: PropTypes.string,
    apiCall: PropTypes.object,
    fields: PropTypes.array,
    mainField: PropTypes.string,
    dialogText: PropTypes.object,
}
