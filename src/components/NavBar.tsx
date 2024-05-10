import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {    
    return (
        <Menu mode="horizontal" theme="dark" style={{ display: 'block' }}>
            <Menu.Item key="/">
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/rated">
                <Link to="/rated">Rated</Link>
            </Menu.Item>
            <Menu.Item key="/auth" style={{ float: 'right' }}>
                <Link to="/auth">AUTH</Link>
            </Menu.Item>
        </Menu>
    );
};

export default NavBar;

// import React from 'react';
// import { Menu } from 'antd';
// import { Link, useNavigate } from 'react-router-dom';


// const NavBar: React.FC = () => {
//     const navigate = useNavigate();
//     const items = [
//         { label: 'Home', key: '/' },
//         { label: 'Rated', key: '/rated' },
//         { label: 'Auth', key: '/auth' },
//       ];
//     return (
//         <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['/']}
//         onClick={({key}) => {
//             navigate(key)
//         }}
//         items={items}
//         ></Menu>
//     );
// };

// export default NavBar;

