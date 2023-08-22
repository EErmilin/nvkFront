import Profile from "../pages/Auth/Profile/Profile";
import Main from "../pages/Main/Main";


export const routes = [
    {
        name: 'main',
        component: <Main />,
        path: '',
        exact: true,
    },

    {
        name: 'profile',
        component: <Profile />,
        path: '/profile',
        exact: true,
    },

]