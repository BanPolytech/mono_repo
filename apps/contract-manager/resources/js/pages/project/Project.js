import React, { useState } from 'react';
import styles from '../../assets/styles/globalMaterialStyle';
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
import http from '../../http';
import { useHistory } from 'react-router-dom';
import { cellLight, header } from "../../assets/styles/materialTableStyleConst";

const useStyles = makeStyles(styles);
const apiProjects = 'http://contractor-manager.test/api/v1/projects'

function Project() {
    const classes = useStyles();
    const history = useHistory();

    function handleOnRowClick(rowClicked) {
        history.push(`/project/${rowClicked._id}`);
    }

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <h1>Projets</h1>
                <MaterialTable
                    title=""
                    columns={[
                        { title: 'Statut', field: 'stage' },
                        { title: 'Client', field: 'clientName' },
                        { title: 'Projet', field: 'name' },
                        { title: 'Ops', cellStyle: cellLight, render: rowData => (
                            <div>
                                {rowData.opsNames.map((ops, index) => (
                                    <li key={index}>{ops}</li>
                                ))}
                            </div>
                        )},
                        { title: 'Support', cellStyle: cellLight, render: rowData => (
                            <div>
                                {rowData.supportNames.map((support, index) => (
                                    <li key={index}>{support}</li>
                                ))}
                            </div>
                        )},
                        { title: 'Début', field: 'dateStart', type: "date", cellStyle: cellLight},
                        { title: 'Fin', field: 'dateEnd', type: "date", cellStyle: cellLight}
                    ]}
                    data={query =>
                        new Promise((resolve, reject) => {
                        http.get(`${apiProjects}`, {
                                params: {
                                    limit: query.pageSize,
                                    page: query.page + 1,
                                    filters: query.filters.join(',')
                                }
                            })
                            .then(result => {
                                console.log(result);
                                resolve({
                                    data: result.data.projects.data,
                                    page: result.data.projects.current_page - 1,
                                    totalCount: result.data.projects.total,
                                })
                            })
                        })
                    }
                    onRowClick={
                        (evt, rowClicked) => handleOnRowClick(rowClicked)
                    }
                    options={{ headerStyle: header}}
                />
            </div>
        </div>
    );
}

export default Project;
