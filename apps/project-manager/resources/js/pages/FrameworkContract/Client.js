import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import MaterialTable from "material-table";
import http from "../../Http";
import {apiBase} from "../../config";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../assets/jss/views/frameworkContractStyle";
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import {Typography} from "@material-ui/core";
import FormDialog from "../../components/Dialog/FormDialog";
import {useRouteMatch} from "react-router";


const useStyles = makeStyles(styles);

export default function Client() {

    const classes = useStyles();
    const history = useHistory();
    let { path, url } = useRouteMatch();
    const tableRef = React.createRef();

    // State hooks.
    const [changes, setChanges] = useState({
        action: '',
        data: ''
    });
    const [clientIdModified, setClientIdModified] = useState('');
    const [data, setData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState('');
    const [formValue, setFormValue] = useState(0);
    const [selectedRow, setSelectedRow] = useState(null);

    // API Path
    const api = `${apiBase}/api/v1/clients`;

    useEffect(() => {
        http
            .get(`${api}/framework-contracts`)
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
    }, [api]);

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
        const clickedClient = data[rowClicked.tableData.id]

        history.push(
            `${url}/${clickedClient['_id']}`,
            {
                'client_id': clickedClient['_id'],
                'client_name': clickedClient['name']
            }
        )
    }

    function handleChangeProjectNumber(rowData) {
        setFormValue(rowData.projectsOrderedNumber);
        setClientIdModified(rowData._id);
        setDialogOpen(true);
    }

    const handleOnClickConfirmDialog = (value) => {
        http
            .put(`${api}/${clientIdModified}`, {'projectsOrderedNumber': value})
            .then(({data: client}) => {
                setChanges({
                    action: 'update',
                    data: client
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
                        tableRef={tableRef}
                        columns={[
                            { title: "Client", field: "name" },
                            { title: "Nombre d'agences", field: "agenciesNumber" },
                            { title: "Projets", field: "projectsStock" },
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
                                icon: DynamicFeedIcon,
                                tooltip: 'Changer nombre de projets commandés',
                                onClick: (event, rowData) => handleChangeProjectNumber(rowData)
                            },
                        ]}
                    />
                </main>
            </div>
            <FormDialog
                dialogOpen={dialogOpen}
                title={'Projets commandés'}
                content={'Changer le nombre de projets commandés'}
                formTitle={'Nombre de projets'}
                formValue={formValue}
                onClickConfirm={handleOnClickConfirmDialog}
                onClickCancel={handleOnClickCancelDialog}
            />
        </div>
    )
}
