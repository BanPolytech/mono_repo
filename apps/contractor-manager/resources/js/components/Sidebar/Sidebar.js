import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ViewStreamOutlinedIcon from '@material-ui/icons/ViewStreamOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import logo from '../../assets/img/logo/AOS.png';
import styles from './sidebarStyle.js';
import { NavLink, useLocation } from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function Sidebar() {
    const classes = useStyles();

    const location = useLocation();

    return (
        <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }} anchor="left">
            <img className={classes.drawerLogo} src={logo} alt="logo" />
            <Divider />
            <List>
                <ListItem button component={NavLink} to="/project" className={classes.drawerNavLink}>
                    <ListItemIcon className={ location.pathname.match('/project') ? classes.drawerListItemIconActive : classes.drawerListItemIcon }>
                        <ViewStreamOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText className={classes.drawerListItemText} primary="Projets" disableTypography={true}/>
                </ListItem>
                <ListItem button component={NavLink} to="/enterprise" className={classes.drawerNavLink}>
                    <ListItemIcon className={ '/enterprise' == location.pathname ? classes.drawerListItemIconActive : classes.drawerListItemIcon }>
                        <PersonOutlineOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText className={classes.drawerListItemText} primary="Entreprises" disableTypography/>
                </ListItem>
                <ListItem button component={NavLink} to="/task" className={classes.drawerNavLink}>
                    <ListItemIcon className={ '/task' == location.pathname ? classes.drawerListItemIconActive : classes.drawerListItemIcon }>
                        <DashboardOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText className={classes.drawerListItemText} primary="Tâches" disableTypography/>
                </ListItem>
            </List>
        </Drawer>
    );
}
