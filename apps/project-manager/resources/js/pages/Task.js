import React, { useEffect, useState } from 'react';
import MaterialTable from "material-table";
import {apiBase} from "../config";
import http from "../Http";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../assets/jss/views/taskStyle";

const useStyles = makeStyles(styles);

export default function Task() {
    // State hooks.
    const [task, setTask] = useState('');
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    const classes = useStyles();

    // API Path
    const api = `${apiBase}/api/v1/tasks`;

    // Table columns
    const columns = [
        { title: "Statut", field: "isDone", type: "boolean", width: 50},
        { title: "Titre", field: "title" },
        {
            title: "Date d'échéance",
            field: "dateEnd",
            type: "date",
            width: 100,
            cellStyle: cellData => ({
                color: (new Date(cellData) < Date.now()) ? 'red' : 'inherit',
                fontWeight: (new Date(cellData) < Date.now()) ? 'bold' : 'inherit',
            })
        },
    ]

    // Effect runs once on mount.
    useEffect(() => {
        http
            .get(`${api}`)
            .then(response => {
                console.log(response)
                setData(() => {
                    return response.data;
                });
                setError(false);
            })
            .catch(() => {
                setError('Unable to fetch data.');
            });
    }, [api]);

    const handleOnRowUpdate = (newTask, oldTask) => {
        http
            .put(`${api}/${oldTask._id}`, newTask)
            .then(({ data: response}) => {
                const newData = [...data];
                newData[data.indexOf(oldTask)] = response;
                setData(newData);
            })
            .catch(() => {
                setError('Sorry, there was an error updating your task.');
            })
    };

    const handleOnRowAdd = task => {
        http
            .post(api, task)
            .then(({ data: response }) => {
                const newTask = {
                    _id: response._id,
                    isDone: false,
                    ...task
                };
                const allTasks = [newTask, ...data];
                setData(allTasks);
                setTask('');
            })
            .catch(() => {
                setError('Sorry, there was an error saving your task.');
            });
    };

    const handleOnRowDelete = task => {
        http
            .delete(`${api}/${task._id}`)
            .then(response => {
                console.log(response);
                if (response.data === 204) {
                    const dataToRender = [...data];
                    dataToRender.splice(dataToRender.indexOf(task), 1);
                    setData(dataToRender);
                }
            })
            .catch(() => {
                setError('Sorry, there was an error deleting your task.')
            })
    }

    const closeTask = id => {
        const tasks = data;

        http
            .patch(`${api}/${id}`, { status: 'closed' })
            .then(() => {
                const updatedTasks = tasks.filter(task => task.id !== parseInt(id, 10));
                setData(updatedTasks);
            })
            .catch(() => {
                setError('Sorry, there was an error closing your to do.');
            });
    };

    return (
        <div style={{ maxWidth: "100%" }}>
            <div className={classes.root}>
                <main
                    className={clsx(classes.content)}
                >
                    <MaterialTable
                        columns={columns}
                        data={data}
                        options={{
                            showTitle: false,
                            selection: true,
                            pageSize: 20,
                        }}
                        localization={{
                            header: {
                                actions: ''
                            },
                        }}
                        editable={{
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    console.log(newData);
                                    setTimeout(() => {
                                        resolve();
                                        handleOnRowAdd(newData);
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            handleOnRowUpdate(newData, oldData);
                                        }
                                    }, 600);
                                }),
                            onRowDelete: (oldRowData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        const dataToDelete = data[data.indexOf(oldRowData)]
                                        handleOnRowDelete(dataToDelete);
                                    }, 600);
                                }),
                        }}
                    />
                </main>
            </div>
        </div>
    )
}
