import {
    formDrawerWidth as drawerWidth,
} from "../../material-dashboard-react.js";

const contactStyle = theme => ({
    root: {
        display: 'flex',
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
    dateExpired: {
        color: "red",
        fontStyle: "bold",
    }
})

export default contactStyle;
