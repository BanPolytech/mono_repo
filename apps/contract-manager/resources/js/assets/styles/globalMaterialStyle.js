import { formDrawerWidth, drawerWidth } from "./appStyleVariable.js";

const appStyle = theme => ({

    root: {
        display: 'flex',
        width: `calc(100% - ${drawerWidth}px)`,
        float: 'right'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
    },
    contentShift: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    drawer: {
        width: formDrawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: formDrawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    drawerPullerWrapper: {
        padding: theme.spacing(3, 0),
        minWidth: 40,
        width: 40,
    },
    drawerPuller: {
        backgroundColor: 'white',
        height: "100%",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
    },
});

export default appStyle;
