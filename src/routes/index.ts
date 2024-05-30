import Home from '../containers/Home';
import Login from '../containers/Login';

export const ROUTE_CONFIG = [
    {
        key: 'home',
        path: '/',
        element: Home,
        title: '首页',
    },
    {
        key: 'Login',
        path: '/login',
        element: Login,
        title: '登陆',
    },
];
