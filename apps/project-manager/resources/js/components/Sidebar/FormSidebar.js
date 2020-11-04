/*eslint-disable*/
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import ModalImage from "react-modal-image";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/formSidebarStyle.js";

import CustomInput from "../CustomInput/CustomInput";
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {ChevronLeft, ChevronRight, Delete, ExpandMore, Edit} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Button, Card, CardActionArea, CardMedia} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import CommentForm from "../Comments/CommentForm"
import CommentList from "../Comments/CommentList"
import {DropzoneDialog} from "material-ui-dropzone";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import ConfirmDialog from "../Dialog/ConfirmDialog";
import http from "../../Http";
import CreateOptionDialog from "../CustomInput/CreateOptionDialog";

// import { VariableSizeList } from 'react-window';


const useStyles = makeStyles(styles);

export default function FormSidebar(props) {

    // I/O data
    const [data, setData] = useState(props.data);
    const [onUpdate, setOnUpdate] = useState(false);
    const [update, setUpdate] = useState({});
    const [updateBuffer, setUpdateBuffer] = useState({});

    // Taglist consts
    const [taglistOpen, setTaglistOpen] = useState(false);
    const [taglistOptions, setTaglistOptions] = useState([]);
    const loading = taglistOpen && taglistOptions.length === 0;

    // Dropzone image consts
    const [dropzoneOpen, setDropzoneOpen] = useState(false);

    // Dialog consts
    const [dialogOpen, setDialogOpen] = useState(false);
    const [nextActionDialog, setNextActionDialog] = useState({
        history: {
            route: null,
            option: null,
        },
        changeData: false
    })

    const classes = useStyles();
    const history = useHistory();

    // useEffect if update
    useEffect(() => {
        console.log('en boucle');
        if (Object.keys(update).length > 1 && update.constructor === Object) {
            setNextActionDialog(prevState => (
                {
                    ...prevState,
                    changeData: true,
                }
            ))
            setDialogOpen(true);
        } else {
            setData(props.data);
        }
        if (props.data._id) {
            if (onUpdate) {
                setUpdateBuffer(update)
            }
            setUpdate(prevState => ({
                _id: props.data._id
            }))
            setOnUpdate(true);
        }
    }, [props.data])

    useEffect(() => {
        setDialogOpen(props.warningSave);
    }, [props.warningSave])

    // useEffect Taglist
    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        http
            .get(`${props.urlGetTaglist}`)
            .then(response => {
                const list = response.data;

                console.log(list)

                if (active) {
                    setTaglistOptions(Object.keys(list).map((key) => list[key]));
                }
            })
            .catch((e) => {
                console.log('Unable to fetch data.');
                console.log(e);
            });

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!taglistOpen) {
            setTaglistOptions([]);
        }
    }, [taglistOpen]);

    const handleDrawerOpen = () => {
        props.onOpenChange(true);
    };

    const handleDrawerClose = () => {
        console.log('close')
        props.onOpenChange(false);
    };

    const handleOnClickValidateForm = () => {
        if (onUpdate) {
            props.onUpdateForm(update);
            setOnUpdate(false);
            setUpdate({});
        } else {
            props.onAddForm(data);
        }
        handleDrawerClose();
        props.onDialogEnd(true);
    }

    const handleOnClickCancelForm = () => {
        if (onUpdate) {
            setOnUpdate(false);
            setUpdate({});
        }
        handleDrawerClose();
        props.onCancelForm();
    }

    const handleOnClickDeleteForm = () => {
        if (data._id) {
            props.onDeleteForm(data);
            handleDrawerClose();
        } else {
            handleDrawerClose();
        }
        if (onUpdate) {
            setOnUpdate(false);
            setUpdate({});
        }
    }

    const handleFormChange = (event, field, type) => {
        let value = ''
        let checked = false
        if (event && event.hasOwnProperty('target')) {
            value = event.target.value;
            checked = event.target.checked;
        }

        let newFieldData;
        switch (type) {
            case 'text':
            case 'textarea':
            case 'select':
            case 'selectMultiple':
            case 'number':
                newFieldData = value;
                break;
            case 'boolean':
                newFieldData = checked;
                break;
            case 'date':
                newFieldData = event;
                break;
            default:
                newFieldData = "ERR : No data on event";
        }

        console.log('la nouvelle valeur est : ' + newFieldData);
        console.log(onUpdate);
        console.log(update);

        if (onUpdate) {
            setUpdate(prevState => (
                {
                    ...prevState,
                    [field]: newFieldData,
                }
            ))
        }
        setData(prevState => ({
            ...prevState,
            [field]: newFieldData,
        }))
    }

    const handleOnClickConfirm = () => {
        let reset = false;
        if (onUpdate) {
            console.log(update)
            props.onUpdateForm(updateBuffer);
            setOnUpdate(false);
            setUpdate({});
        } else {
            props.onAddForm(data);
        }
        if (nextActionDialog.history.route) {
            history.push(nextActionDialog.history.route, nextActionDialog.history.option)
        } else if (nextActionDialog.changeData) {
            setData(props.data);
            if (props.data._id) {
                setUpdate(prevState => ({
                    _id: props.data._id
                }))
                setOnUpdate(true);
            }
            setNextActionDialog(prevState => (
                {
                    ...prevState,
                    changeData: false,
                }
            ))
        } else {
            console.log('reset');
            reset = true;
        }
        props.onOpenChange(true);
        setDialogOpen(false);
        props.onDialogEnd(reset);
    }

    const handleOnClickDeny = () => {
        console.log(update)
        let reset = false;
        if (nextActionDialog.history.route) {
            history.push(nextActionDialog.history.route, nextActionDialog.history.option)
        } else if (nextActionDialog.changeData) {
            setData(props.data);
            setUpdate(prevState => ({
                _id: props.data._id
            }))
            setNextActionDialog(prevState => (
                {
                    ...prevState,
                    changeData: false,
                }
            ))
        } else {
            reset = true;
        }
        props.onOpenChange(true);
        setOnUpdate(false);
        setDialogOpen(false);
        props.onDialogEnd(reset);
    }

    const handleChecklistChange = (event, field) => {
        let newFieldData = event.target.checked;
        const checklist = data.checklist;

        if (onUpdate) {
            setUpdate(prevState => {
                prevState.checklist = {
                    ...checklist,
                    [field]: newFieldData
                }

                return {
                    ...prevState
                };
            })
        }

        setData(prevState => {
            prevState.checklist[field] = newFieldData;

            return {...prevState};
        })
    }

    const handleTaglistChange = (newTags, field) => {

        console.log(newTags)
        console.log(field)


        setUpdate(prevState => {
            prevState[field] = newTags

            return {
                ...prevState
            };
        })

        setData(prevState => {
            prevState[field] = newTags;

            return {...prevState};
        })
    }

    const handleOnClickTag = (option, route) => {
        if (Object.keys(update).length !== 0) {
            setNextActionDialog(prevState => (
                {
                    ...prevState,
                    history: {
                        route: route,
                        option: option
                    }
                }
            ))
            setDialogOpen(true);
        } else {
            history.push(route, option)
        }
    }

    const handleOnAddComment = (comment, field) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const authorName = user.name;

        const commentObj = {
            author: authorName,
            date: Date.now(),
            message: comment
        }

        setData(prevState => {
            prevState[field].splice(0, 0, commentObj);

            if (onUpdate) {
                setUpdate(prevStateUpdate => {
                    prevStateUpdate[field] = prevState[field];

                    return {
                        ...prevStateUpdate
                    }
                })
            }

            return {...prevState};
        })
    }

    const handleOpenImageDialog = () => {
        setDropzoneOpen(true);
    }

    const handleCloseImageDialog = () => {
        setDropzoneOpen(false);
    }

    const handleSaveImage = (files, field) => {
        const file = files[0];
        let base64 = '';
        const reader = new FileReader();
        reader.onload = (event) => {
            base64 = event.target.result;

            setUpdate(prevState => {
                prevState[field] = {
                    format: file.type,
                    base64: base64,
                    uploadDate: Date.now()
                }

                return {
                    ...prevState
                };
            })

            setData(prevState => {
                prevState[field] = {
                    format: file.type,
                    base64: base64,
                    uploadDate: Date.now()
                }

                return {...prevState};
            })
        };
        reader.readAsDataURL(file);

        setDropzoneOpen(false);
    }

    const handleOnClickDeleteImage = (field) => {
        setUpdate(prevState => {
            prevState[field] = {
                format: '',
                base64: '',
                uploadDate: ''
            }

            return {
                ...prevState
            };
        })

        setData(prevState => {
            prevState[field] = {
                format: '',
                base64: '',
                uploadDate: ''
            }

            return {...prevState};
        })
    }

    const handleHoursChange = (event, field) => {
        let newFieldData = event.target.value;
        const hours = data.hours;

        if (onUpdate) {
            setUpdate(prevState => {
                prevState.hours = {
                    ...hours,
                    [field]: newFieldData
                }

                return {
                    ...prevState,
                    id: data._id
                };
            })
        }

        setData(prevState => {
            prevState.hours[field] = newFieldData;

            return {...prevState};
        })
    }

    let sidebarName;
    if (props.forms.name.type === 'form') {
        sidebarName =
            <CustomInput
                inputProps={{
                    placeholder: props.forms.name.field.placeholder,
                    onChange: function (e) {
                        handleFormChange(e, props.forms.name.field.dbName, props.forms.name.field.type)
                    },
                    value: data[props.forms.name.field.dbName]
                }}
                formControlProps={{
                    fullWidth: true,
                }}
            />
    } else if (props.forms.name.type === 'text') {
        if (onUpdate) {
            sidebarName =
                <Typography component="h3" variant="h3">
                    {data[props.forms.name.dataName]}
                </Typography>;
        } else {
            sidebarName =
                <Typography component="h3" variant="h3">
                    {props.forms.name.placeholder}
                </Typography>
        }
    }

    return (
        <div className={!props.open ? classes.drawerPullerWrapper : ""}>
            <div className={classes.drawerPuller}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    className={clsx(props.open && classes.hide)}
                >
                    <ChevronLeft/>
                    <ChevronLeft className={classes.stickyChevron}/>
                </IconButton>
            </div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronRight/>
                    </IconButton>
                </div>
                <div id={'objectName'}>
                    <div className={classes.sidebarNameWrapper}>
                        {sidebarName}
                    </div>
                    <Tooltip
                        id="delete-object"
                        title="Supprimer"
                        placement="top"
                        classes={{tooltip: classes.tooltip}}>
                        <IconButton aria-label="Delete" className={classes.tableActionButton}
                                    onClick={handleOnClickDeleteForm}>
                            <Delete className={classes.tableActionButtonIcon + " " + classes.close}/>
                        </IconButton>
                    </Tooltip>
                </div>
                <Divider/>
                <List>
                    {props.forms.tabs.map((tab, index) => (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls={"panel_" + index + "_content"}
                                id={"panel_" + index}
                            >
                                <Typography className={classes.heading}>{tab.tabName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordionDetails}>
                                {
                                    tab.type === 'form' &&
                                    tab.fields.map((field, indexField) => {
                                        switch (field.type) {
                                            case 'text':
                                                return <CustomInput
                                                    id={"field_" + indexField}
                                                    key={indexField}
                                                    labelText={field.name}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: function (e) {
                                                            handleFormChange(e, field.dbName, field.type)
                                                        },
                                                        value: data[field.dbName] || ''
                                                    }}
                                                />;
                                            case 'textarea':
                                                return <CustomInput
                                                    id={"field_" + indexField}
                                                    key={indexField}
                                                    labelText={field.name}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: function (e) {
                                                            handleFormChange(e, field.dbName, field.type)
                                                        },
                                                        value: data[field.dbName] || '',
                                                        multiline: true,
                                                        rowsMax: 5
                                                    }}
                                                />;
                                            case 'creatable':
                                                return <CreateOptionDialog
                                                    val={data[field.dbName] || ''}
                                                    key={indexField}
                                                    apiCall={{
                                                        routeGet: field.apiGet.route + field.apiGet.idToAdd ? '/' + data[field.apiGet.idToAdd] : '',
                                                        routePost: field.apiPost.route
                                                    }}
                                                    fields={field.fields}
                                                    mainField={field.mainField}
                                                    dialogText={field.dialogText}
                                                />;
                                            case 'date':
                                                return <FormControl key={indexField} className={classes.formControl}
                                                                    component="fieldset">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            disableToolbar
                                                            variant="inline"
                                                            format="dd/MM/yyyy"
                                                            margin="normal"
                                                            id={"field_" + indexField}
                                                            label={field.name}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change date',
                                                            }}
                                                            value={data[field.dbName] || null}
                                                            onChange={(e) => handleFormChange(e, field.dbName, field.type)}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </FormControl>;
                                            case 'boolean':
                                                return <FormControl key={indexField} className={classes.formControl}
                                                                    component="fieldset">
                                                    <FormControlLabel
                                                        className={classes.checkboxLabel}
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                checked={data[field.dbName] || false}
                                                                onChange={(e) => handleFormChange(e, field.dbName, field.type)}
                                                            />
                                                        }
                                                        label={field.name}
                                                        labelPlacement="start"
                                                    />
                                                </FormControl>;
                                            case 'select':
                                                return <FormControl key={indexField} className={classes.formControl}>
                                                    <InputLabel
                                                        id={"field_" + indexField + "_label"}>{field.name}</InputLabel>
                                                    <Select
                                                        labelId={"field_" + indexField + "_label"}
                                                        id={"field_" + indexField}
                                                        value={data[field.dbName] || ''}
                                                        onChange={(e) => handleFormChange(e, field.dbName, field.type)}
                                                    >
                                                        {field.items.map((item, indexItem) => {
                                                            return <MenuItem key={indexItem}
                                                                             value={item}>{item}</MenuItem>
                                                        })}
                                                    </Select>
                                                </FormControl>;
                                            case 'selectMultiple':
                                                return <FormControl key={indexField} className={classes.formControl}>
                                                    <InputLabel
                                                        id={"field_" + indexField + "_label"}>{field.name}</InputLabel>
                                                    <Select
                                                        labelId={"field_" + indexField + "_label"}
                                                        multiple={true}
                                                        //  input={<Input />}
                                                        id={"field_" + indexField}
                                                        value={data[field.dbName] || []}
                                                        onChange={(e) => handleFormChange(e, field.dbName, field.type)}
                                                    >
                                                        {field.items.map((item, indexItem) => {
                                                            return <MenuItem key={indexItem}
                                                                             value={item}>{item}</MenuItem>
                                                        })}
                                                    </Select>
                                                </FormControl>;
                                            case 'number':
                                                return <CustomInput
                                                    id={"field_" + indexField}

                                                    key={indexField}
                                                    labelText={field.name}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "number",
                                                        onChange: function (e) {
                                                            handleFormChange(e, field.dbName, field.type)
                                                        },
                                                        value: data[field.dbName] || ''
                                                    }}
                                                />;
                                            default:
                                                return <CustomInput
                                                    id={"field_" + indexField}
                                                    key={indexField}
                                                    labelText={field.name}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        onChange: function (e) {
                                                            handleFormChange(e, field.dbName, field.type)
                                                        },
                                                        value: data[field.dbName] || ''
                                                    }}
                                                />;
                                        }
                                    })
                                }
                                {
                                    tab.type === 'checklist' &&
                                    <FormControl component="fieldset" className={classes.checklist}>
                                        <FormGroup>
                                            {
                                                tab.list.map((check, indexCheck) => (
                                                    <FormControlLabel
                                                        key={indexCheck}
                                                        control={
                                                            <Checkbox
                                                                checked={data.hasOwnProperty('checklist') ? data.checklist[check.dbName] : false}
                                                                onChange={(e) => handleChecklistChange(e, check.dbName)}
                                                                name={check.dbName}
                                                            />
                                                        }
                                                        label={check.label}
                                                    />
                                                ))
                                            }
                                        </FormGroup>
                                    </FormControl>
                                }
                                {
                                    tab.type === 'taglist' &&
                                    <>
                                        <Autocomplete
                                            value={data[tab.list.dbName] || []}
                                            onChange={(e, newTags) => handleTaglistChange(newTags, tab.list.dbName)}
                                            multiple
                                            id="taglist"
                                            open={taglistOpen}
                                            onOpen={() => {
                                                setTaglistOpen(true);
                                            }}
                                            onClose={() => {
                                                setTaglistOpen(false);
                                            }}
                                            options={taglistOptions.map((option) => (
                                                {
                                                    label: option[tab.list.options.dbLabel],
                                                    _id: option._id
                                                }
                                            ))}
                                            getOptionLabel={(option) => option.label}
                                            getOptionSelected={(option, value) => {
                                                return option.label === value.label
                                            }}
                                            loading={loading}
                                            filterSelectedOptions
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip
                                                        label={option.label}
                                                        {...getTagProps({index})}
                                                        clickable={true}
                                                        onClick={() => handleOnClickTag(option, tab.routePath)}
                                                    />
                                                ))
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label=""
                                                    placeholder={tab.list.placeholder}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {loading ? <CircularProgress color="inherit"
                                                                                             size={20}/> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </>
                                }
                                {
                                    tab.type === 'comments' &&
                                    <>
                                        <CommentForm
                                            onAddComment={(comment) => handleOnAddComment(comment, tab.list.dbName)}
                                        />
                                        <CommentList
                                            comments={data.comments}
                                        />
                                    </>
                                }
                                {
                                    tab.type === 'image' &&
                                    <div>
                                        <Button onClick={handleOpenImageDialog} hidden={!!data[tab.dbName].base64}>
                                            {tab.placeholder}
                                        </Button>
                                        <DropzoneDialog
                                            open={dropzoneOpen}
                                            onSave={(files) => handleSaveImage(files, tab.dbName)}
                                            dialogTitle={'Charger un fichier'}
                                            dropzoneText={'Glisser et déposer un fichier ici ou cliquer'}
                                            submitButtonText={'Ajouter'}
                                            cancelButtonText={'Annuler'}
                                            previewText={'preview'}
                                            acceptedFiles={['image/*']}
                                            showPreviews={false}
                                            filesLimit={1}
                                            maxFileSize={5000000}
                                            onClose={handleCloseImageDialog}
                                            showPreviewsInDropzone={true}
                                        />
                                        {data[tab.dbName].base64 ?
                                            <Card>
                                                <CardActionArea>
                                                    <CardMedia
                                                        alt={'screenshot AOS sight'}
                                                    >
                                                        <ModalImage
                                                            small={data.hasOwnProperty(tab.dbName) ? data[tab.dbName].base64 : ''}
                                                            medium={data.hasOwnProperty(tab.dbName) ? data[tab.dbName].base64 : ''}
                                                        />
                                                    </CardMedia>

                                                    <CardContent>
                                                        <Typography gutterBottom={true} color={"textSecondary"}
                                                                    component={'p'}>
                                                            {'Ajoutée le ' + ((data.hasOwnProperty(tab.dbName)) ? new Date(data[tab.dbName].uploadDate).toLocaleString() : '')}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <IconButton onClick={handleOpenImageDialog}>
                                                        <Edit/>
                                                    </IconButton>
                                                    <IconButton onClick={() => handleOnClickDeleteImage(tab.dbName)}>
                                                        <Delete/>
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                            : ''
                                        }
                                    </div>
                                }
                                {
                                    tab.type === 'hours' &&
                                    <FormControl component="fieldset" className={classes.hours}>
                                        <FormGroup>
                                            {
                                                tab.list.map((hour, indexHour) => (
                                                    <CustomInput
                                                        id={"field_" + indexHour}
                                                        key={indexHour}
                                                        labelText={hour.name}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            type: "number",
                                                            onChange: function (e) {
                                                                handleHoursChange(e, hour.dbName)
                                                            },
                                                            value: data.hasOwnProperty('hours') ? data.hours[hour.dbName] : ''
                                                        }}
                                                    />
                                                ))
                                            }
                                        </FormGroup>
                                    </FormControl>
                                }
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
                <div
                    hidden={
                        !((Object.keys(update).length !== 1 && update.constructor === Object) || !props.data._id)
                    }
                >
                    <Button variant="contained" color="default" onClick={handleOnClickCancelForm}>
                        Annuler
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleOnClickValidateForm}
                            classes={{right: 0}}>
                        Valider
                    </Button>
                </div>
            </Drawer>
            <ConfirmDialog
                dialogOpen={dialogOpen}
                title={''}
                content={'Souhaitez-vous enregistrer vos modifications ?'}
                onClickConfirm={handleOnClickConfirm}
                onClickCancel={handleOnClickDeny}
            />
        </div>
    );
}

FormSidebar.propTypes = {
    open: PropTypes.bool,
    forms: PropTypes.object,
    data: PropTypes.object,
    urlGetTaglist: PropTypes.string,
    warningSave: PropTypes.bool,
    onOpenChange: PropTypes.func,
    onAddForm: PropTypes.func,
    onUpdateForm: PropTypes.func,
    onDeleteForm: PropTypes.func,
    onCancelForm: PropTypes.func,
    onDialogEnd: PropTypes.func
};
