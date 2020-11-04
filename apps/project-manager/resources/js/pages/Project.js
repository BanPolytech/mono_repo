import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import MaterialTable from "material-table";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormSidebar from "../components/Sidebar/FormSidebar";

import projectForms from "../forms/projectForms";
import {addRolesToSelect} from "../utils/project.js"
import clsx from "clsx";
import styles from "../assets/jss/views/projectStyle";
import useDebounce from "../services/useDebounce";
import {apiBase} from "../config";
import http from "../Http";
import Search from "../components/Filter/Search";
import Select from "../components/Filter/Select";
import ClearAll from "../components/Filter/ClearAll";

const useStyles = makeStyles(styles);

export default function Project() {
    const classes = useStyles();

    // API Path
    const api = `${apiBase}/api/v1/projects`;
    const apiContacts = `${apiBase}/api/v1/contacts`;
    const routeContactTags = `${apiContacts}/tags`;

    const initialStateFilters = {
        client_name: '',
        stage: '',
        name: '',
        userSales: '',
        userCustomerManager: '',
        userSupport: [],
    }
    const initialStateProject = {
        _id: '',
        name: '',
        stage: '',
        isFrameworkContract: false,
        client_name: '',
        agency_name: '',
        responseFormat: '',
        clientExpectations: '',
        formerWorking: '',
        canAddCompaniesOnBatch: false,
        priorityBatch: '',
        batchToCome: '',
        isOnOpenConsultation: false,
        isAddableAutomaticallyOnOP: false,
        nextStep: '',
        companiesNumber: '',
        supportAction: '',
        userSales: '',
        userCustomerManager: '',
        userSupport: [],
        dateStart: null,
        dateEnd: null,
        dateNext: null,
        checklist: {
            visio: false,
            dpgfReceived: false,
            dpgfSent: false,
            companiesList: false,
            companiesInvited: false,
            mvSent: false,
            formation50: false,
            formation75: false,
            formation100: false,
            statusHalf: false,
            statusEnd: false,
            mailSent: false,
        },
        contact_tags: [],
        comments: [],
        screenshot: {
            uploadDate: '',
            format: '',
            base64: '',
        },
        hours: {
            formation: '',
            support: '',
            dpgf: '',
            addCompanies: '',
            consultation: '',
            specials: '',
            searchCompanies: '',
            settingsProject: '',
            settingsRatios: '',
        },
    }

    //// State hooks.
    const [changes, setChanges] = useState({
        action: '',
        data: ''
    });
    const [error, setError] = useState('No error');
    const [filters, setFilters] = useState(initialStateFilters)
    const [forms, setForms] = useState(projectForms);
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState(initialStateProject);
    const [selectedRow, setSelectedRow] = useState(null);
    const [roles, setRoles] = useState({
        manager: ['Tous'],
        support: ['Tous'],
        sales: ['Tous']
    });
    const [warningSave, setWarningSave] = useState(false);

    const location = useLocation();
    const tableRef = React.createRef();

    // Effect runs once on mount.
    useEffect(() => {
        http
            .get(`${api}`)
            .then(response => {
                const dataRoles = response.data.roles
                setForms(addRolesToSelect(forms, dataRoles));
                setRoles(prevState => {
                    let roles = {}
                    dataRoles.map((role) => {
                        roles[role.name] = prevState[role.name].concat(role.users)
                    })
                    return {
                        ...prevState,
                        ...roles
                    }
                })
                setError('No error');
            })
            .catch(() => {
                setError('Unable to fetch data.');
            });
    }, [api]);

    // When routing to this page via click on tag
    useEffect(() => {
        if (location.state) {
            const projectId = location.state._id
            http
                .get(`${api}/${projectId}`)
                .then(({data: project}) => {
                    setProject(project);
                    setOpen(true);
                })
        }
    }, [location])

    useEffect(() => {
        tableRef.current && tableRef.current.onQueryChange()
    }, [changes])

    function handleOpenChange(newOpen) {
        setOpen(newOpen);
        if (selectedRow === null) {
            // équivaut à l'ouverture de la formSidebar sans cliquer sur un projet --> on charge le premier index sur le tableau
            setSelectedRow(0);
            const project = data.projects[0];
            setProject(project);
            setOpen(true);
        }
    }

    function handleOnClickAddProjectAction() {
        if (!project._id) {
            setOpen(true);
            setSelectedRow(null);
        } else {
            setWarningSave(true);
        }
    }

    function handleOnRowClick(rowClicked) {
        setSelectedRow(rowClicked.tableData.id);
        setProject(rowClicked);
        setOpen(true);
    }

    function handleOnCancelForm() {
        setProject(initialStateProject);
    }

    const handleOnDeleteForm = project => {
        http
            .delete(`${api}/${project._id}`)
            .then(response => {
                if (response.data === 204) {
                    setChanges({
                        action: 'delete',
                        data: project
                    });
                    setProject(initialStateProject);
                    setSelectedRow(null);
                }
            })
            .catch(() => {
                setError('Sorry, there was an error deleting your project.')
            })
    }

    const handleOnAddForm = project => {
        http
            .post(api, project)
            .then(({ data: response }) => {
                const newProject = {
                    ...project,
                    _id: response._id,
                };
                setChanges({
                    action: 'add',
                    data: newProject
                });
                setProject(initialStateProject);
            })
            .catch(() => {
                setError('Sorry, there was an error saving your project.');
            });
    };

    const handleOnUpdateForm = newProject => {
        http
            .put(`${api}/${newProject._id}`, newProject)
            .then(({ data: project}) => {
                setChanges({
                    action: 'update',
                    data: project
                });
            })
            .catch(() => {
                setError('Sorry, there was an error updating your project.');
            })
    }

    const handleDialogEnd = (reset) => {
        if (reset) {
            setProject(initialStateProject);
            setSelectedRow(null);
        }
        setWarningSave(false);
    }

    const handleFilterChange = (value, filter) => {
        setFilters(prevState => (
            {
                ...prevState,
                [filter]: value
            }
        ))
        tableRef.current.onFilterChangeDebounce();
    }

    const handleClearFilters = () => {
        setFilters(initialStateFilters)
    }

    return (
        <div style={{ maxWidth: "100%" }}>
            <div className={classes.root}>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div>
                        <Search labelText="Rechercher une société" onChangeFilter={(value) => handleFilterChange(value, 'client_name')}/>
                        <Select
                            labelText="Phase"
                            items={['Toutes', 'À venir (2022)', 'À venir (2021)', 'À venir', 'Créés', 'En cours', 'Terminés', 'Cloturés']}
                            multiple={false}
                            onChangeFilter={(value) => handleFilterChange(value, 'stage')}
                        />
                        <Search labelText="Rechercher un projet" onChangeFilter={(value) => handleFilterChange(value, 'name')}/>
                        <Select
                            labelText="Ops"
                            items={roles.manager}
                            multiple={false}
                            onChangeFilter={(value) => handleFilterChange(value, 'userCustomerManager')}
                        />
                        <Select
                            labelText="Support"
                            items={roles.support}
                            multiple={true}
                            onChangeFilter={(value) => handleFilterChange(value, 'userSupport')}
                        />
                        <Select
                            labelText="Sales"
                            items={roles.sales}
                            multiple={false}
                            onChangeFilter={(value) => handleFilterChange(value, 'userSales')}
                        />
                        {/*<ClearAll labelText="Effacer tout" onClickClear={handleClearFilters}/>*/}
                    </div>
                    <MaterialTable
                        tableRef={tableRef}
                        columns={[
                            { title: "Client", field: "client_name" },
                            { title: "Phase", field: "stage" },
                            { title: "Projet", field: "name" },
                            { title: "Ops", field: "userCustomerManager" },
                            { title: "Support", field: "userSupport" },
                            { title: "Sales", field: 'userSales'},
                            { title: "Début", field: "dateStart", type: "date", hidden: open },
                            { title: "Fin", field: "dateEnd", type: "date", hidden: open },
                            { title: "Date pro action", field: "dateNext", type: "date", hidden: open },
                        ]}
                        data={
                            query =>
                                new Promise((resolve, reject) => {
                                    http.get(`${api}`, {
                                        params: {
                                            limit: query.pageSize,
                                            page: query.page + 1,
                                            search: query.search,
                                            filters: filters ?? undefined,
                                            orderBy: query.orderBy ? [query.orderBy.field, query.orderDirection] : ['', '']
                                        }
                                    })
                                        .then(result => {
                                            resolve({
                                                data: result.data.projects.data,
                                                page: result.data.projects.current_page - 1,
                                                totalCount: result.data.projects.total,
                                            })
                                            setSelectedRow(result.data.projects.data.findIndex(x => x._id === project._id));
                                        });
                                })
                        }
                        title=""
                        options={{
                            debounceInterval: 500,
                            sorting: true,
                            rowStyle: rowData => ({
                                backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                                boxShadow: (selectedRow === rowData.tableData.id) ? "0px 2px 8px rgba(0, 0, 0, 0.1)" : "",
                            }),
                            pageSize: 20
                        }}
                        actions={[
                            {
                                icon: 'add',
                                tooltip: 'Ajouter un projet',
                                isFreeAction: true,
                                onClick: (event) => handleOnClickAddProjectAction()
                            },
                            {
                                icon: 'refresh',
                                tooltip: 'Refresh Data',
                                isFreeAction: true,
                                onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                            }
                        ]}
                        onRowClick={
                            // (event, rowData, togglePanel) => togglePanel()
                            (evt, rowClicked) => handleOnRowClick(rowClicked)
                        }
                    />
                </main>
                <FormSidebar
                    open={open}
                    forms={forms}
                    data={project}
                    urlGetTaglist={routeContactTags}
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
