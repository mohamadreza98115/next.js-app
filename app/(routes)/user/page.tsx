'use client'
import React from 'react';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

const UserPage = () => {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login?callbackUrl=/user")
        }
    });
    return (
        <div>
            User page
        </div>
    );
};

export default UserPage;