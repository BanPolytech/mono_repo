import React, { createRef, useEffect, useState } from 'react';
import styles from '../../../assets/styles/globalMaterialStyle';
import { makeStyles } from "@material-ui/core/styles";
import http from '../../../http';
import MaterialTable from 'material-table';
import { Grid, Button, Drawer, IconButton, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { cellLight, header } from "../../../assets/styles/materialTableStyleConst";
import { DoubleArrow } from '@material-ui/icons';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';


const useStyles = makeStyles(styles);
const apiProject = 'http://contractor-manager.test/api/v1/projects';
const apiProjectCompanies = 'http://contractor-manager.test/api/v1/projectCompanies/byProjectId';

function ProjectDetail({ match }) {
    const classes = useStyles();
    const history = useHistory();
    const tableRef = createRef();


    const cellLightStyle = {
        fontWeight: 300,
        color: '#707683',
        fontSize: '14px'
    }

    const headerStyle = {
        fontWeight: 400,
        fontFamily: 'Poppins',
        color: '#334D6E',
        opacity: 0.5
    }

    const initialStateProject = {
        _id: '',
        name: '',
        clientName: '',
    }

    const [project, setProject] = useState(initialStateProject);
    const [open, setOpen] = useState(false);
    const [enterprise, setEnterprise] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    function handleOnImportClick() {
        history.push(`/project/${match.params.id}/import`);
    }

    function handleOnExportClick() {

        http
            .get(`${apiProjectCompanies}/${match.params.id}/byBatch`)
            .then(result => {
                const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                const fileExtension = '.xlsx';
                const pcByBatch = result.data;

                if (Object.keys(pcByBatch).length > 0) {

                    let zip = new JSZip();

                    Object.keys(pcByBatch).map( (key) => {

                        const fileName = project.clientName + ' - ' + project.name + ' - Lot ' + key;
                        const ws_header = [['NAME', 'EMAIL', 'PHONE', 'BUSINESS SECTORS']];
                        const ws = XLSX.utils.aoa_to_sheet(ws_header);

                        const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

                        for (let pc of pcByBatch[key]) {

                            const emailsArray = pc.contact.email.match(reg);

                            if (emailsArray) {
                                XLSX.utils.sheet_add_aoa(ws, [[pc.company.name, emailsArray[0]]], {origin: -1});
                            }

                        }

                        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
                        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

                        // const data = new Blob([excelBuffer], {type: fileType});
                        // FileSaver.saveAs(data, fileName + fileExtension);

                        zip.file(fileName + fileExtension, excelBuffer, {type: fileType});

                    });

                    zip.generateAsync({type: "blob"}).then( (blobdata) => {
                        let zipBlob = new Blob([blobdata]);
                        saveAs(zipBlob, project.clientName + ' - ' + project.name + '.zip');
                    });

                }

            })

    }

    function handleDrawerPullerClick() {
        if(pageSize != tableRef.current.state.pageSize){
            setPageSize(tableRef.current.state.pageSize);
        }

        open ? setEnterprise([]) : setEnterprise(tableRef.current.state.data[0]);
        setOpen(!open);
    }

    const handleOnRowClick = (rowClicked) => {
        if(pageSize != tableRef.current.state.pageSize){
            setPageSize(tableRef.current.state.pageSize);
        }

        if(rowClicked === enterprise) {
            setOpen(!open);
            setEnterprise([]);
        }else if (open) {
            setEnterprise(rowClicked);
        } else {
            setEnterprise(rowClicked);
            setOpen(true);
        }

    }

    useEffect(() => {
        http
            .get(`${apiProject}/${match.params.id}`)
            .then(result => {
                setProject(result.data);
            })
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <h1>{project.clientName} - {project.name}</h1>
                    <div>
                        <Button variant="outlined" color="secondary" onClick={ handleOnImportClick }>Importer</Button>
                        <Button variant="contained" color="secondary" onClick={ handleOnExportClick }>Exporter</Button>
                    </div>
                </Grid>

                <MaterialTable
                    title=""
                    tableRef={tableRef}
                    columns={[
                        { title: 'Lot', field: 'batchName'},
                        { title: 'Entreprise', field: 'company.name'},
                        { title: 'Téléphone', field: 'contact.phone', cellStyle: cellLight},
                        { title: 'Portable', field: 'contact.mobile', cellStyle: cellLight},
                        { title: 'Email', field: 'contact.email', cellStyle: cellLight},
                        { title: 'Intention Appel', field: 'callIntention'},
                        { title: 'Date', field: 'dateLast', cellStyle: cellLight, hidden: open },
                    ]}
                    data={query =>
                        new Promise((resolve, reject) => {
                        http.get(`${apiProjectCompanies}/${match.params.id}`, {
                                params: {
                                    limit: query.pageSize,
                                    page: query.page + 1,
                                    filters: query.filters.join(',')
                                }
                            })
                            .then(result => {
                                resolve({
                                    data: result.data.projectCompanies.data,
                                    page: result.data.projectCompanies.current_page - 1,
                                    totalCount: result.data.projectCompanies.total,
                                })
                            })
                        })
                    }
                    onRowClick={
                        (evt, rowClicked) => handleOnRowClick(rowClicked)
                    }
                    options={{
                        headerStyle: header,
                        pageSize: pageSize,
                        rowStyle: rowData => ({
                            backgroundColor: enterprise.tableData ? ((enterprise.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF') : '#FFF'
                        })
                    }}
                />
            </div>
            <div className={!open ? classes.drawerPullerWrapper : ""}>
                {!open ?
                    <div className={classes.drawerPuller}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerPullerClick}
                        >
                            <DoubleArrow style={{ transform: 'rotateZ(180deg)'}}/>
                        </IconButton>
                    </div>
                :
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerPullerClick}>
                            <DoubleArrow/>
                        </IconButton>
                        <h3>{enterprise.batchNumber} - {enterprise.company.name}</h3>
                    </div>
                    <Divider />
                    <p>test</p>
                </Drawer>
                }
            </div>
        </div>
    );
}

export default ProjectDetail;
