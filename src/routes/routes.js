import LiveStream from "../pages/LiveStream/LiveStream";
import Blog from "../pages/Auth/Profile/Blog/Blog";
import ChangePassword from "../pages/Auth/Profile/ChangePassword/ChangePassword";
import Favorites from "../pages/Auth/Profile/Favorites/Favorites";
import Hashtags from "../pages/Auth/Profile/Hashtags/Hashtags";
import PaymentData from "../pages/Auth/Profile/PaymentData/PaymentData";
import PersonalArea from "../pages/Auth/Profile/PersonalArea";
import Profile from "../pages/Auth/Profile/Profile/Profile";
import Settings from "../pages/Auth/Profile/Settings/Settings";
import Support from "../pages/Auth/Profile/Support/Support";
import Main from "../pages/Main/Main";


export const routes = [
    {
        name: 'main',
        component: <Main />,
        path: '',
        exact: true,
    },

    {
        name: 'personal-area',
        component: <PersonalArea
            routes={
                [
                    {
                        name: 'profile',
                        privateUrl: true,
                        component: <Profile />,
                        path: 'profile',
                        exact: false,
                    },
                    {
                        name: 'changePassword',
                        privateUrl: true,
                        component: <ChangePassword />,
                        path: 'changePassword',
                        exact: false,
                    },
                    {
                        name: 'blog',
                        privateUrl: true,
                        component: <Blog />,
                        path: 'blog',
                        exact: false,
                    },
                    {
                        name: 'favorites',
                        privateUrl: true,
                        component: <Favorites />,
                        path: 'favorites',
                        exact: false,
                    },
                    {
                        name: 'hashtags',
                        privateUrl: true,
                        component: <Hashtags />,
                        path: 'hashtags',
                        exact: false,
                    },
                    {
                        name: 'payment',
                        privateUrl: true,
                        component: <PaymentData />,
                        path: 'payment',
                        exact: false,
                    },
                    {
                        name: 'settings',
                        privateUrl: true,
                        component: <Settings />,
                        path: 'settings',
                        exact: false,
                    },
                    {
                        name: 'support',
                        privateUrl: true,
                        component: <Support />,
                        path: 'support',
                        exact: false,
                    },
                ]
            }
        />,
        path: 'personal-area/*',
        exact: false,
        headerType: 2,
        footerType: 2,
    },
    {
        name: 'live',
        component: <LiveStream />,
        path: '/live',
        exact: true,
    }

]