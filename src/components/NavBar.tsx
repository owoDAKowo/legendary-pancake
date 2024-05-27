import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    UserOutlined,
    StarOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';

const { Sider } = Layout;

const NavBar: FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const isLoggedIn = localStorage.getItem('guest_session_id');
    const navigate = useNavigate();


    const logout = () => {
        localStorage.removeItem('guest_session_id');
        navigate('/auth');
    }

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: '100vh' }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined style={{ color: '#FFFFFF' }} /> : <MenuFoldOutlined style={{ color: '#FFFFFF' }} />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <Menu
                mode="inline"
                theme="dark"
                style={{ display: 'block', fontSize: '1.2rem' }}
                selectable={false}
            >
                <Menu.Item key="/" icon={<HomeOutlined />} >
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="/rated" icon={<StarOutlined />}>
                    <Link to="/rated">Rated</Link>
                </Menu.Item>
                
                {isLoggedIn ? (
                    <Menu.Item key="/auth" style={{ float: 'right', fontSize: '1.1rem' }} icon={<UserOutlined />} onClick={logout}>
                        Logout
                    </Menu.Item>
                ) : (
                    <Menu.Item key="/auth" style={{ float: 'right', fontSize: '1.1rem' }} icon={<UserOutlined />}>
                        <Link to="/auth">AUTH</Link>
                    </Menu.Item>
                )}

            </Menu>
        </Sider>
    );
};

export default NavBar;
