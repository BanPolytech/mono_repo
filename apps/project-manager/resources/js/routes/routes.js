import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import TaskManager from '../pages/Dashboard';
import Register from '../pages/Auth/Register';
import Logout from '../pages/Auth/Logout';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import NoMatch from '../pages/NoMatch';
import DashboardPage from "../pages/Dashboard";
import ProjectIcon from "@material-ui/icons/Home"
import ProjectPage from "../pages/Project";
import ContactIcon from "@material-ui/icons/ContactPhone";
import ContactPage from "../pages/Contact";
import TaskIcon from "@material-ui/icons/AssignmentTurnedIn";
import TaskPage from "../pages/Task";
import FrameworkContractIcon from "@material-ui/icons/Receipt";
import FrameworkContractPage from "../pages/FrameworkContract";
import FrameworkContractAgencyPage from "../pages/FrameworkContract/Agency";
import FrameworkContractProjectPage from "../pages/FrameworkContract/Project";

const routes = [
    {
        path: '/',
        exact: true,
        auth: true,
        component: DashboardPage,
        fallback: Home
    },
    {
        path: `/login`,
        exact: true,
        auth: false,
        component: Home
    },
    {
        path: `/register`,
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: `/forgot-password`,
        exact: true,
        auth: false,
        component: ForgotPassword
    },
    {
        path: `/reset-password`,
        exact: true,
        auth: false,
        component: ResetPassword
    },
    {
        path: `/logout`,
        exact: true,
        auth: true,
        component: Logout
    },
    {
        path: "/project",
        exact: true,
        auth: true,
        name: "Projets",
        icon: ProjectIcon,
        component: ProjectPage,
    },
    {
        path: "/contact",
        exact: true,
        auth: true,
        name: "Contacts",
        icon: ContactIcon,
        component: ContactPage
    },
    {
        path: "/task",
        exact: true,
        auth: true,
        name: "Tâches",
        icon: TaskIcon,
        component: TaskPage
    },
    {
        path: "/frameworkContract",
        exact: false,
        auth: true,
        name: "Contrats Cadres",
        icon: FrameworkContractIcon,
        component: FrameworkContractPage
    },
    // {
    //     path: "/frameworkContract/:clientName",
    //     exact: true,
    //     auth: true,
    //     name: "Contrats Cadres",
    //     component: FrameworkContractAgencyPage
    // },
    // {
    //     path: "/frameworkContract/:clientName/:projectName",
    //     exact: true,
    //     auth: true,
    //     name: "Contrats Cadres",
    //     component: FrameworkContractProjectPage
    // },
    {
        path: '',
        exact: false,
        auth: false,
        component: NoMatch
    }
];

export default routes;

