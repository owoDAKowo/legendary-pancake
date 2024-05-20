import { FC } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const NavBar: FC = () => {
    // const location = window.location;
    return (
        <Menu mode="horizontal" theme="dark" style={{ display: 'block' }} selectable={false}
        >
            <Menu.Item key="/">
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/rated">
                <Link to="/rated">Rated</Link>
            </Menu.Item>
            <Menu.Item key="/auth" style={{ float: 'right', fontSize: '1.1rem'}}>
                <Link to="/auth">AUTH</Link>
            </Menu.Item>
        </Menu>
    );
};

export default NavBar;

