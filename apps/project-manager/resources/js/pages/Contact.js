import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import MaterialTable from "material-table";

import {makeStyles} from "@material-ui/core/styles";
import FormSidebar from "../components/Sidebar/FormSidebar";

import contactForms from "../forms/contactForms";
import clsx from "clsx";
import styles from "../assets/jss/views/contactStyle";
import {apiBase} from "../config";
import http from "../Http";

const useStyles = makeStyles(styles);

export default function Contact() {

    // State hooks.
    const [open, setOpen] = React.useState(false);
    const [isContactsget, setIsContactsget] = useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [data, setData] = useState({
        contacts: [],
    });
    const initialStateContact = {
        _id: '',
        firstname: '',
        lastname: '',
        company: '',
        agency: '',
        position: '',
        role: '',
        phone: '',
        mail: '',
        notes: '',
        project_tags: []
    }
    const [contact, setContact] = useState(initialStateContact);
    const [warningSave, setWarningSave] = useState(false);
    const [error, setError] = useState('No error');
    const [forms, setForms] = useState(contactForms)

    const classes = useStyles();
    const location = useLocation();

    // API Path
    const api = `${apiBase}/api/v1/contacts`;
    const apiProjects = `${apiBase}/api/v1/projects`;
    const routeProjectTags = `${apiProjects}/tags`;

    // Effect runs once on mount.
    useEffect(() => {
        http
            .get(`${api}`)
            .then(response => {
                console.log(response.data);
                setData(() => {
                    const contacts = response.data.contacts.map((contact) => (
                        {
                            ...contact,
                            fullname: contact.firstname + ' ' + contact.lastname,
                        }
                    ));

                    return {
                        ...response.data,
                        contacts: contacts,
                    }
                });
                setIsContactsget(true);
                setError('No error');
            })
            .catch(() => {
                setError('Unable to fetch data.');
            });
    }, [api]);

    // When routing to this page via click on tag
    useEffect(() => {
        console.log(data)
        if (location.state && isContactsget) {
            const contactId = location.state._id
            let indexOfContact;
            for (let i = 0; i < data.contacts.length; i++) {
                if (data.contacts[i]['_id'] === contactId) {
                    indexOfContact = i;
                }
            }
            setSelectedRow(indexOfContact);
            const contact = data.contacts[indexOfContact];
            setContact(contact);
            setOpen(true);
        }
    }, [location, isContactsget])

    function handleOpenChange(newOpen) {
        setOpen(newOpen);
        if (newOpen) {
            // équivaut à l'ouverture de la formSidebar sans cliquer sur un projet --> on charge le premier index sur le tableau
            setSelectedRow(0);
            const contact = data.contacts[0];
            setContact(contact);
            setOpen(true);
        }
    }

    function handleOnClickAddContactAction() {
        if (!contact._id) {
            setOpen(true);
            setSelectedRow(null);
        } else {
            setWarningSave(true);
        }
    }

    function handleOnRowClick(selectedRow) {
        setSelectedRow(selectedRow.tableData.id);
        const clickedContact = data.contacts[selectedRow.tableData.id]
        console.log(clickedContact);
        setContact(clickedContact);
        setOpen(true);
    }

    function handleOnCancelForm() {
        setContact(initialStateContact);
    }

    const handleOnDeleteForm = contact => {
        http
            .delete(`${api}/${contact._id}`)
            .then(response => {
                if (response.data === 204) {
                    setData(prevState => {
                        prevState.contacts.splice(prevState.contacts.indexOf(contact), 1);
                        return prevState;
                    });
                    setContact(initialStateContact);
                    setSelectedRow(null);
                    setOpen(false);
                }
            })
            .catch(() => {
                setError('Sorry, there was an error deleting your contact.')
            })
    }

    const handleOnAddForm = contact => {
        http
            .post(api, contact)
            .then(({ data: response }) => {
                setOpen(false);
                const newContact = {
                    ...contact,
                    _id: response._id,
                    fullname: response.firstname + ' ' + response.lastname,
                };
                setData(prevState => {
                    prevState.contacts.push(newContact)
                    return {...prevState};
                });
                setContact(initialStateContact);
            })
            .catch(() => {
                setError('Sorry, there was an error saving your contact.');
            });
    };

    const handleOnUpdateForm =  newContact => {
        http
            .put(`${api}/${newContact._id}`, newContact)
            .then(({ data: response}) => {
                setOpen(false);
                setData(prevState => {
                    prevState.contacts[data.contacts.map((x) => (x._id)).indexOf(newContact._id)] = {
                        ...response,
                        fullname: response.firstname + ' ' + response.lastname,
                    };
                    return {...prevState};
                });
            })
            .catch(() => {
                setError('Sorry, there was an error updating your contact.');
            })
    }

    const handleDialogEnd = (reset) => {
        if (reset) {
            console.log('reset')
            setContact(initialStateContact);
            setSelectedRow(null);
        }
        console.log('setwarningsave')
        setWarningSave(false);
    }

    return (
        <div style={{ maxWidth: "100%" }}>
            <div className={classes.root}>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <MaterialTable
                        columns={[
                            { title: "Nom", field: "fullname" },
                            { title: "Société", field: "company" },
                            { title: "Agence", field: "agency" },
                            { title: "Poste", field: "position" },
                            { title: "Téléphone", field: "phone" },
                            { title: "Email", field: "mail" },
                        ]}
                        data={data.contacts}
                        title=""
                        options={{
                            sorting: true,
                            filtering: true,
                            rowStyle: rowData => ({
                                backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                                boxShadow: (selectedRow === rowData.tableData.id) ? "0px 2px 8px rgba(0, 0, 0, 0.1)" : "",
                            }),
                            pageSize: 20,
                        }}
                        actions={[
                            {
                                icon: 'add',
                                tooltip: 'Ajouter un contact',
                                isFreeAction: true,
                                onClick: (event) => handleOnClickAddContactAction()
                            }
                        ]}
                        onRowClick={
                            // (event, rowData, togglePanel) => togglePanel()
                            (evt, selectedRow) => handleOnRowClick(selectedRow)
                        }
                    />
                </main>
                <FormSidebar
                    open={open}
                    forms={forms}
                    data={contact}
                    urlGetTaglist={routeProjectTags}
                    warningSave={warningSave}
                    onOpenChange={handleOpenChange}
                    onAddForm={handleOnAddForm}
                    onUpdateForm={handleOnUpdateForm}
                    onDeleteForm={handleOnDeleteForm}
                    onCancelForm={handleOnCancelForm}
                    onDialogEnd={handleDialogEnd}
                />
            </div>
        </div>
    )
}
