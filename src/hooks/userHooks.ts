import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext, connectFactory } from '../utils/contextFactory';
import { GET_USER } from '../graphql/user';
import { IUser } from '../utils/types';

const KEY = 'userInfo';
const DEFAULT_VALUE = {};

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
    console.log('useGetUser :>> ');
    const { setStore } = useUserContext();
    const nav = useNavigate();
    const location = useLocation();
    const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
        onCompleted: (data) => {
            //给个默认的登录
            setStore({
                id: 1,
                name: '测试',
                tel: 134,
            });
            return;
            if (data.getUserInfo) {
                const { id, name, tel } = data.getUserInfo;
                setStore({
                    id,
                    name,
                    tel,
                });
                // 当前在登录页面，且已经登录了，那就直接跳到首页
                if (location.pathname === '/login') {
                    nav('/');
                }
                return;
            }
            // 如果不在登录页面，但是目前没有登录，那就直接跳到登录页面
            if (location.pathname !== '/login') {
                nav(`/login?orgUrl=${location.pathname}`);
            }
        },
        onError: () => {
            //给个默认的登录
            setStore({
                id: 1,
                name: '测试',
                tel: 134,
                refetchHandler: refetch,
            });
            return;
            // 如果不在登录页面，但是目前登录异常，那就直接跳到登录页面
            if (location.pathname !== '/login') {
                nav(`/login?orgUrl=${location.pathname}`);
            }
        },
    });
    return { loading, refetch };
};
