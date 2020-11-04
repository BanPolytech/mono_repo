import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import clsx from "clsx";
import Search from "../../components/Filter/Search";
import Select from "../../components/Filter/Select";
import MaterialTable from "material-table";
import http from "../../Http";
import FormSidebar from "../../components/Sidebar/FormSidebar";
import {apiBase} from "../../config";
import styles from "../../assets/jss/views/projectStyle";
import {addRolesToSelect} from "../../utils/project";
import projectForms from "../../forms/projectForms";
import {Typography} from "@material-ui/core";
import useDebounce from "../../services/useDebounce";

const useStyles = makeStyles(styles);

export default function Project() {

    const api = `${apiBase}/api/v1/projects`;
    const apiAgencies = `${apiBase}/api/v1/agencies`;
    const apiContacts = `${apiBase}/api/v1/contacts`;
    const routeContactTags = `${apiContacts}/tags`;
    const tableRef = React.createRef();
    const classes = useStyles();
    const history = useHistory();

    const {
        agencyId,
        clientId
    } = useParams()

    console.log(clientId)

    const {
        agency_name,
        client_name
    } = history.location.state;

    console.log(history.location)

    const initialStateFilters = {
        client_name: '',
        stage: '',
        name: '',
        userSales: '',
        userCustomerManager: '',
        userSupport: [],
        isFrameworkContract: true
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
        }
    }


    const [changes, setChanges] = useState({
        action: '',
        data: ''
    });
    const [error, setError] = useState('No error');
    const [forms, setForms] = useState(projectForms);
    const [filters, setFilters] = useState(initialStateFilters)
    const [newProject, setNewProject] = useState(initialStateProject)
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState(initialStateProject);
    const [roles, setRoles] = useState({
        manager: ['Tous'],
        support: ['Tous'],
        sales: ['Tous']
    });
    const [selectedRow, setSelectedRow] = useState(null);
    const [warningSave, setWarningSave] = useState(false);



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
        http
            .get(`${apiAgencies}/${agencyId}`)
    }, [api]);

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
            setProject(prevState => ({
                ...prevState,
                ['isFrameworkContract']: true,
                ['client_name']: client_name,
                ['agency_name']: agency_name
            }))
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
                                    http.get(`${apiAgencies}/${agencyId}`, {
                                        params: {
                                            limit: query.pageSize,
                                            page: query.page + 1,
                                            search: query.search,
                                            filters: filters ?? undefined,
                                            orderBy: query.orderBy ? [query.orderBy.field, query.orderDirection] : ['', '']
                                        }
                                    })
                                        .then(({data: projects}) => {
                                            resolve({
                                                data: projects.data,
                                                page: projects.current_page - 1,
                                                totalCount: projects.total,
                                            })
                                            setSelectedRow(projects.data.findIndex(x => x._id === project._id));
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
