import React from 'react';
import { Form, Input, Button } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { mutationLogin } from './mutation';
import { useNavigate } from 'react-router-dom';

export const RegistrationForm: React.FC = () => {

    const onFinishRegistration = (values: any) => {
        console.log('Registration form values:', values);
        // Add your registration logic here
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h2>Registration</h2>
                <Form onFinish={onFinishRegistration}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export const LoginForm: React.FC = () => {
    
    const { data, mutate } = useMutation({
        mutationKey: ['login'], 
        mutationFn: mutationLogin 
    });
    
    const navigate = useNavigate();

    const onFinishLogin = async (values: any) => {
        await mutate();
        console.log('onFinishLogin', data);
        localStorage.setItem('guest_session_id', data.guest_session_id);
        navigate('/');
    };
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h2>Login</h2>
                <Form onFinish={onFinishLogin}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
