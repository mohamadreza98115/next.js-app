import React from 'react';
import GuestPage from "@/app/ui/GuestPage";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

const HomePage = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        if (session?.user.role === 'ADMIN')
            redirect("/admin");
        else
            redirect("/user")
    }
    return (
        <GuestPage />
    );
};

export default HomePage;