import React, { useState, useEffect } from 'react';
import styles from '../../../assets/styles/globalMaterialStyle';
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneAreaBase } from 'material-ui-dropzone';
import http from '../../../http';
import * as XLSX from 'xlsx';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid, CircularProgress, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(styles);
const apiProject = 'http://contractor-manager.test/api/v1/projects';
const apiProjectCompanies = 'http://contractor-manager.test/api/v1/projectCompanies/byProjectId';

function Import({ match }) {
    const classes = useStyles();
    const history = useHistory();

    const initialStateProject = {
        _id: '',
        name: '',
        clientName: '',
    }

    const [project, setProject] = useState(initialStateProject);

    const [enterprises, setEnterprises] = useState([]);

    const [importSuccess, setImportSuccess] = useState(false);

    const [loading, setLoading] = useState(false);

    const [response, setResponse] = useState([]);


    useEffect(() => {
        http
            .get(`${apiProject}/${match.params.id}`)
            .then(result => {
                setProject(result.data);
            })
    }, []);

    useEffect(() => {
        if(enterprises.length){
            console.log('New file uploaded:', enterprises);
            http
                .post(`${apiProjectCompanies}/${match.params.id}/import`, enterprises)
                .then(({ data: response }) => {
                    setResponse(response);
                    setLoading(false);
                    setImportSuccess(true);
                    console.log(response);
                })
                .catch(() => {
                    console.log('il y a eu un probs frère');
                    setImportSuccess(false);
                    setLoading(false);
                });
        }
    }, [enterprises])

    useEffect(() => {
        if (importSuccess) {
            const timer = setTimeout(() => {
                history.push(`/project/${match.params.id}`);
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [importSuccess])

    const handleReadFile = (file) => {

        console.log(file);

        const fileReader = new FileReader();

        let data = [];

        fileReader.readAsArrayBuffer(file)

        fileReader.onload = (e) => {
            const bufferArray = e.target.result;

            const wb = XLSX.read(bufferArray, {type:'buffer'});

            const wsname = wb.SheetNames[0];

            const ws = wb.Sheets[wsname];

            data = XLSX.utils.sheet_to_json(ws);

            setEnterprises(data);

            setLoading(true);
        }

        fileReader.onerror = (error) => {
            reject(error);
        }
    }

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
                    <Link to="/files/template_import.xlsx" target="_blank" download>Télécharger modèle xlsx</Link>
                </Grid>
                {!loading && !importSuccess ?
                <DropzoneAreaBase
                    dropzoneText='Import liste entreprises'
                    onAdd={(fileObjs) => handleReadFile(fileObjs[0].file)}
                    onDelete={(fileObj) => console.log('Removed File:', fileObj)}
                    onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                />
                : loading && !importSuccess ?
                    <Box display="flex" justifyContent="center" alignItems="center" height={250} flexDirection="column">
                        <h3>Import des entreprises en cours</h3>
                        <CircularProgress size={70} color="secondary"/>
                    </Box>
                : !loading && importSuccess ?
                    <Alert severity="success">
                        <AlertTitle>Import Réussi</AlertTitle>
                        Import de <strong>{response.projectCompanies}</strong> entreprises au projet ! Création de <strong>{response.companies}</strong> nouvelles entreprises et <strong>{response.companies}</strong> nouveaux contacts
                    </Alert>
                :   <Alert severity="error">
                        <AlertTitle>Échec de l'import</AlertTitle>
                        Il y a eu une erreur lors de l'import ! Merci de vérifier le template excel
                    </Alert>
                }
            </div>

        </div>
    );
}

export default Import;
