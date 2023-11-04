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
import Tape from "../pages/Tape/Tape";
import Main from "../pages/Main/Main";
import CurrentService from "../pages/Services/components/CurrentService/CurrentService";
import ListServices from "../pages/Services/ListServices";
import Services from "../pages/Services/Services";
import Horoscope from "../pages/Horoscope/Horoscope";
import AudioMain from "../pages/Music/AudioMain";
import Audio from "../pages/Music/Audio";
import AllPage from "../pages/Music/components/AllPage/AllPage";
import Terms from "../pages/Terms/Terms";
import Сonditions from "../pages/Сonditions/Сonditions";
import ListBroadcasts from "../pages/Broadcasts/ListBroadcasts";
import Broadcast from "../pages/Broadcasts/components/Broadcast/Broadcast";
import Broadcasts from "../pages/Broadcasts/Broadcasts";
import Admin from "../admin/Admin";
import AddScreenAdmin from "../admin/components/AddScreenAdmin/AddScreenAdmin";
import AllScreenAdmin from "../admin/components/AllScreenAdmin/AllScreenAdmin";
import Movies from "../pages/Movie/Movies";
import ListMovies from "../pages/Movie/ListMovies";
import Movie from "../pages/Movie/components/Movie/Movie";

export const routes = [
    {
        name: 'main',
        component: <Main />,
        path: '',
        exact: true,
    },
    {
        name: 'terms',
        component: <Terms />,
        path: 'terms',
        exact: true,
    },
    {
        name: 'conditions',
        component: <Сonditions />,
        path: 'conditions',
        exact: true,
    },
    {
        name: 'tape',
        component: <Tape />,
        path: 'tape',
        exact: true,
    },
    {
        name: 'broadcasts',
        component: <Broadcasts
            routes={
                [
                    {
                        name: 'ListBroadcasts',
                        privateUrl: false,
                        component: <ListBroadcasts />,
                        path: '',
                        exact: false,
                    },
                    {
                        name: 'broadcast',
                        privateUrl: false,
                        component: <Broadcast />,
                        path: '/:id',
                        exact: false,
                    },
                ]
            } />,
        path: 'broadcasts/*',
        exact: false,
    },

    {
        name: 'services',
        component: <Services
            routes={
                [
                    {
                        name: 'ListServices',
                        privateUrl: false,
                        component: <ListServices />,
                        path: '',
                        exact: false,
                    },
                    {
                        name: 'service',
                        privateUrl: false,
                        component: <CurrentService />,
                        path: '/:type/:id',
                        exact: false,
                    },
                ]
            } />,

        path: 'services/*',
        exact: false,
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
        privateUrl: true,
        exact: false,
        headerType: 2,
        footerType: 2,
    },
    {
        name: '/live',
        component: <LiveStream />,
        path: 'live',
        exact: true,
    },
    {
        name: 'music',
        component: <Audio
            routes={
                [
                    {
                        name: 'main',
                        privateUrl: false,
                        component: <AudioMain />,
                        path: '',
                        exact: false,
                    },
                    {
                        name: 'playlists',
                        privateUrl: false,
                        component: <AllPage />,
                        path: '/playlists',
                        exact: false,
                    },
                    {
                        name: 'albums',
                        privateUrl: false,
                        component: <AllPage />,
                        path: 'albums',
                        exact: false,
                    },
                    {
                        name: 'tracks',
                        privateUrl: false,
                        component: <AllPage />,
                        path: 'tracks',
                        exact: false,
                    },
                    {
                        name: 'podcasts',
                        privateUrl: false,
                        component: <AllPage />,
                        path: '/podcasts',
                        exact: false,
                    },
                    {
                        name: 'podcast',
                        privateUrl: false,
                        component: <AllPage />,
                        path: '/podcasts/:id',
                        exact: false,
                    },
                ]
            } />,
        path: 'audio/*',
        exact: true,
    },
    {
        name: 'horoscope',
        component: <Horoscope />,
        path: 'horoscope',
        exact: true,
    },

    {
        name: 'movies',
        component: <Movies
            routes={
                [
                    {
                        name: 'ListMovies',
                        privateUrl: false,
                        component: <ListMovies />,
                        path: '',
                        exact: false,
                    },
                    {
                        name: 'broadcast',
                        privateUrl: false,
                        component: <Movie />,
                        path: '/:id',
                        exact: false,
                    },
                ]
            } />,
        path: 'movies/*',
        exact: false,
    },

{/*    {
        name: 'admin',
        component: <Admin routes={
            [
                {
                    name: 'films',
                    privateUrl: true,
                    component: <AllScreenAdmin />,
                    path: '/:type/:subtype',
                    exact: true,
                },
                {
                    name: 'AddScreenAdmin',
                    privateUrl: true,
                    component: <AddScreenAdmin />,
                    path: '/:type/:subtype/add',
                    exact: false,
                },
            ]}
        />,
        privateUrl: false,
        path: '/admin*',
        isAdmin: true,
        exact: true,
    },*/

}]