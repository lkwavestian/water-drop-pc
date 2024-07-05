import { useUserContext } from '@/hooks/userHooks';
import style from './index.module.less';
import { MenuDataItem, PageContainer, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { ROUTE_CONFIG } from '@/routes';
import { AUTH_TOKEN } from '@/utils/constants';

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
    <Link to={item.path || '/'}>{dom}</Link>
);
/**
 *
 */
const Layout = () => {
    const outlet = useOutlet();
    const { store } = useUserContext();
    const nav = useNavigate();

    const logout = () => {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, '');
        nav('/login');
    };
    return (
        <ProLayout
            className={style.container}
            siderWidth={130}
            layout="mix"
            avatarProps={{
                src: '',
                title: store.tel,
                size: 'small',
                onClick: logout,
            }}
            title={false}
            logo={
                <img
                    src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png"
                    alt="logo"
                />
            }
            onMenuHeaderClick={() => nav('/')}
            route={{
                path: '/',
                routes: ROUTE_CONFIG,
            }}
            menuItemRender={menuItemRender}
        >
            <PageContainer>{outlet}</PageContainer>
        </ProLayout>
    );
};

export default Layout;
