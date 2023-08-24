import Profile from "../pages/Auth/Profile/Profile";
import LiveStream from "../pages/LiveStream/LiveStream";
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

    {
        name: 'live',
        component: <LiveStream />,
        path: '/live',
        exact: true,
    }

]