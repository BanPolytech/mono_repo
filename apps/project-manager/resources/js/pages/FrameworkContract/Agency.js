import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import http from "../../Http";
import {apiBase} from "../../config";
import MaterialTable from "material-table";
import styles from "../../assets/jss/views/frameworkContractStyle";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Typography} from "@material-ui/core";
import FormDialog from "../../components/Dialog/FormDialog";
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';
import {useRouteMatch} from "react-router";

const useStyles = makeStyles(styles);

export default function Agency() {
    const classes = useStyles();
    const history = useHistory();
    let { path, url } = useRouteMatch();

    // State hooks.
    const [changes, setChanges] = useState({
        action: '',
        data: ''
    });
    const [agencyIdModified, setAgencyIdModified] = useState('');
    const [data, setData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState('');
    const [formValue, setFormValue] = useState(0);
    const [onEdit, setOnEdit] = useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const {
        client_name
    } = history.location.state

    const {clientId} = useParams();

    // API Path
    const api = `${apiBase}/api/v1/agencies`;
    const apiClients = `${apiBase}/api/v1/clients`;

    useEffect(() => {
        http
            .get(`${apiClients}/${clientId}`)
            .then(response => {
                console.log(response.data);
                setData(() => {
                    return response.data
                });
                setError('No error');
            })
            .catch(() => {
                setError('Unable to fetch data.');
            });
    }, [apiClients]);

    useEffect(() => {
        if (changes.action === 'update') {
            setData(prevState => {
                const index = prevState.map((x) => (x._id)).indexOf(changes.data._id);
                prevState[index] = {
                    ...data[index],
                    ...changes.data,
                };
                return [...prevState];
            })
        }
    }, [changes])

    const handleOnRowClick = (rowClicked) => {
        setSelectedRow(rowClicked.tableData.id);
        const clickedAgency = data[rowClicked.tableData.id]

        history.push(
            `${url}/${clickedAgency['_id']}`,
            {
                'agency_id': clickedAgency['_id'],
                'agency_name': clickedAgency['name'],
                'client_name': client_name
            })
    }

    const onCellEdit = (newValue, rowData, columnDef) => {
        console.log(columnDef);
        console.log(rowData);
        const cellUpdate = {
            [columnDef.field]: newValue
        }
        return new Promise((resolve, reject) => {
            http.put(`${api}/${rowData['_id']}`, cellUpdate)
                .then(({ data: response}) => {
                    setData(prevState => {
                        prevState[data.map((x) => (x._id)).indexOf(rowData['_id'])] = response;
                        return {...prevState};
                    });
                    resolve(response)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    function handleChangeHoursOrdered(rowData) {
        setFormValue(rowData.hoursOrdered);
        setAgencyIdModified(rowData._id);
        setDialogOpen(true);
    }

    const handleOnClickConfirmDialog = (value) => {
        http
            .put(`${api}/${agencyIdModified}`, {'hoursOrdered': value})
            .then(({data: agency}) => {
                setChanges({
                    action: 'update',
                    data: agency
                });
            })
        setDialogOpen(false)
    }

    const handleOnClickCancelDialog = () => {
        setDialogOpen(false)
    }

    return (
        <div style={{ maxWidth: "100%" }}>
            <div >
                <main className={clsx(classes.content)}>
                    <MaterialTable
                        columns={[
                            { title: "Agence", field: "name", editable: "never" },
                            { title: "Nombre de projets", field: "projectsNumber"},
                            { title: "Heures", field: "hoursStock"},
                        ]}
                        data={data}
                        title=""
                        options={{
                            actionsColumnIndex: -1,
                            sorting: true,
                            filtering: true,
                            rowStyle: rowData => ({
                                backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                                boxShadow: (selectedRow === rowData.tableData.id) ? "0px 2px 8px rgba(0, 0, 0, 0.1)" : "",
                            }),
                            pageSize: 20,
                        }}
                        onRowClick={
                            (evt, rowClicked) => handleOnRowClick(rowClicked)
                        }
                        actions={[
                            {
                                icon: AlarmAddIcon,
                                tooltip: "Changer nombre d'heures commandés",
                                onClick: (event, rowData) => handleChangeHoursOrdered(rowData)
                            },
                        ]}
                    />
                </main>
            </div>
            <FormDialog
                dialogOpen={dialogOpen}
                title={'Heures commandés'}
                content={"Changer le nombre d'heures commandés"}
                formTitle={"Nombre d'heures"}
                formValue={formValue}
                onClickConfirm={handleOnClickConfirmDialog}
                onClickCancel={handleOnClickCancelDialog}
            />
        </div>
    )
}
