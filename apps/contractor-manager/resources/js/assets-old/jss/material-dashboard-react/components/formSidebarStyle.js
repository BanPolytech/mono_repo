import {
    formDrawerWidth as drawerWidth, whiteColor,
} from "../../material-dashboard-react.js";

const formSidebarStyle = theme => ({
    accordionDetails: {
        display: "block",
    },
    title: {
        flexGrow: 1,
    },
    sidebarNameWrapper: {
        padding: "10px",
        display: "inline-block",
        width: "80%",
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: 0,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    drawerPuller: {
        backgroundColor: whiteColor,
        height: "100%",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
    },
    drawerPullerWrapper: {
        padding: theme.spacing(3, 0),
        minWidth: 40,
        width: 40,

    },
    heading: {
        fontSize: "18px",
    },
    formControl: {
        paddingBottom: "10px",
        margin: "20px 0 0 0",
        position: "relative",
        verticalAlign: "unset",
        width: "100%"
    },
    stickyChevron: {
        position: "relative",
        right: 15,
    },
    checkboxLabel: {
        marginLeft: "4px",
        marginBottom: "0px",
        marginTop: "20px"
    }
})

export default formSidebarStyle;
