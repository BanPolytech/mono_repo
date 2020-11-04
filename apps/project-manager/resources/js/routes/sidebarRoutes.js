// @material-ui/icons
import ProjectIcon from "@material-ui/icons/Home";
import ContactIcon from "@material-ui/icons/PermContactCalendar";
import TaskIcon from "@material-ui/icons/AssignmentTurnedIn";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import FrameworkContractIcon from "@material-ui/icons/Receipt";

import ProjectPage from "../pages/Project";
import ContactPage from "../pages/Contact";
import TaskPage from "../pages/Task";
import FrameworkContractPage from "../pages/FrameworkContract";
import LogoutPage from "../pages/Auth/Logout"


const sidebarRoutes = [
    {
        path: "/project",
        name: "Projets",
        icon: ProjectIcon,
        component: ProjectPage,
    },
    {
        path: "/contact",
        name: "Contacts",
        icon: ContactIcon,
        component: ContactPage
    },
    {
        path: "/task",
        name: "Tâches",
        icon: TaskIcon,
        component: TaskPage
    },
    {
        path: "/frameworkContract",
        name: "Contrats Cadres",
        icon: FrameworkContractIcon,
        component: FrameworkContractPage
    },
    {
        path: "/logout",
        name: "Déconnexion",
        icon: LogoutIcon,
        component: LogoutPage
    }
];

export default sidebarRoutes;
