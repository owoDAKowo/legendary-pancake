import React, { useState } from "react";
import { Button } from "antd";
import { RegistrationForm, LoginForm } from "./Forms";

const AuthPage: React.FC = () => {
    const [isRegistrationForm, setIsRegistrationForm] = useState(false);

    const toggleForm = () => {
        setIsRegistrationForm(!isRegistrationForm);
    };

    return (
        <div>
            <Button onClick={toggleForm} type="primary">
                {isRegistrationForm ? "Switch to Login" : "Switch to Registration"}
            </Button>
            {isRegistrationForm ? <RegistrationForm /> : <LoginForm />}
        </div>
    );
};

export default AuthPage;