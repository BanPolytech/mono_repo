import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Project from './pages/project/Project';
import ProjectCompany from './pages/project/projectCompanies/ProjectCompany';
import ProjectCompanyImport from './pages/project/projectCompanies/Import';
import Enterprise from './pages/Enterprise';
import Task from './pages/Task';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import styles from './assets/styles/globalMaterialStyle';

const useStyles = makeStyles(styles);

function App() {
    const classes = useStyles();

    return (
        <Router>
            <Sidebar/>
            <Switch>
                <Route path="/project" exact component={Project}/>
                <Route path="/project/:id" exact component={ProjectCompany}/>
                <Route path="/project/:id/import" exact component={ProjectCompanyImport}/>
                <Route path="/enterprise" component={Enterprise}/>
                <Route path="/task" component={Task}/>
            </Switch>
        </Router>
    );
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
