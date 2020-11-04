import { drawerWidth } from '../../assets/styles/appStyleVariable.js';

const sidebarStyle = theme => ({

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        boxShadow : '6px 0px 18px rgba(0, 0, 0, 0.1)'
    },
    drawerLogo: {
        display: 'block',
        width: '80px',
        margin: '10px auto'
    },
    drawerListItemIcon: {
        minWidth: '40px',
        color: 'rgba(194, 207, 224, 0.8)',
    },
    drawerListItemIconActive: {
        minWidth: '40px',
        color: '#E30513',
    },
    drawerListItemText: {
        fontSize: '13px',
        color: '#334D6E',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '20px',
        letterSpacing: '0.1px'
    },
    drawerNavLink: {
        textDecoration: 'none'
    },

});

export default sidebarStyle;
