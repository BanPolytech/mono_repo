/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components

import styles from "../../assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
    const classes = useStyles();

    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1;
    }

    const {color, logo, image, logoText, routes} = props;
    var links = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
                let bottomLink = " ";
                let listItemClasses;
                if (prop.path === "/logout") {
                    bottomLink = classes.bottomLink + " ";
                } else {
                    listItemClasses = classNames({
                        [" " + classes.active]: activeRoute(prop.path)
                    });
                }
                const whiteFontClasses = classNames({
                    [" " + classes.active]: activeRoute(prop.path)
                });
                return (
                    <NavLink
                        to={prop.path}
                        className={bottomLink + classes.item}
                        activeClassName="active"
                        key={key}
                    >
                        <ListItem button className={classes.itemLink + listItemClasses}>
                                <prop.icon
                                    className={classNames(classes.itemIcon, whiteFontClasses)}
                                />
                            <ListItemText
                                primary={prop.name}
                                className={classNames(classes.itemText)}
                                disableTypography={true}
                            />
                        </ListItem>
                    </NavLink>
                );
            })}
        </List>
    );
    var brand = (
        <div className={classes.logo}>
            <div className={classes.logoImage}>
                <img src={logo} alt="logo" className={classes.img}/>
            </div>
        </div>
    );
    return (
        <div>
            <Drawer
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classNames(classes.drawerPaper)
                }}
                ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                }}
            >
                {brand}
                <div className={classes.sidebarWrapper}>
                    {/*<AdminNavbarLinks/>*/}
                    {links}
                </div>
            </Drawer>
        </div>
    );
}

Sidebar.propTypes = {
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    color: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    logo: PropTypes.string,
    image: PropTypes.string,
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool
};
