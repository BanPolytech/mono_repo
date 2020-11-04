import {
    drawerWidth,
    transition,
    container,
    darkBlueColor
} from "../../material-dashboard-react.js";

const appStyle = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh"
    },
    mainPanel: {
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        overflowY: "scroll",
        overflowX: "hidden",
        position: "relative",
        float: "right",
        ...transition,
        maxHeight: "100%",
        width: "100%"
    },
    content: {
        marginTop: "70px",
        padding: "30px 15px",
        minHeight: "calc(100vh - 123px)"
    },
    container,
    map: {
        marginTop: "70px"
    },
    title: {
        height: "64px",
        fontFamily: `'Poppins', sans-serif`,
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "26px",
        lineHeight: "20px",
        letterSpacing: "0.1px",
        color: darkBlueColor,
        textTransform: "none",
        textAlign: "left",
    }
});

export default appStyle;
