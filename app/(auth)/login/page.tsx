import React from 'react';
import Login from "@/app/(auth)/login/Login";

const LoginPage = ({callbackUrl}: { callbackUrl?: string }) => {
    return (
        <Login callbackUrl={callbackUrl}/>
    );
};

export default LoginPage;