import React from 'react';
import { connect } from 'react-redux';
import { Box, Container, Grid } from '@material-ui/core';
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "./components/Sidebar/Sidebar.js";
import Navbar from "./components/Navbars/Navbar";

import sidebarRoutes from "./routes/sidebarRoutes";

import styles from "./assets/jss/material-dashboard-react/layouts/adminStyle.js";

import image from './assets/img/sidebar-1.jpg';
import logo from './assets/img/logo/AOS_LOGO1_RVB.png';
import Button from "./components/CustomButtons/Button";

const useStyles = makeStyles(styles);

let ps;

const BaseInside = ({ children }) => {
    //style
    const classes = useStyles();
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();

    const [mobileOpen,setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };
    // initialize and destroy the PerfectScrollbar plugin
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };
    }, [mainPanel]);

    function makeBrand() {
        let name = "";
        sidebarRoutes.map(prop => {
            if (window.location.href.indexOf(prop.path) !== -1) {
                name = prop.name;
            }
            return null;
        });
        return name;
    }
 return(
    <div className={classes.wrapper}>
        <Sidebar
            routes={sidebarRoutes}
            logo={logo}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color="red"
        />
        <div className={classes.mainPanel} ref={mainPanel}>
            <Button color="transparent" href="#" className={classes.title}>
                {makeBrand()}
            </Button>
            {children}
        </div>
    </div>
)};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated
});

export default connect(mapStateToProps)(BaseInside);
