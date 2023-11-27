import React from 'react';
import Dashboard from "@/app/ui/admin/Dashboard";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

const AdminPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session)
        redirect("/login?callbackUrl=/admin")
    return (
       <></>
    );
};

export default AdminPage;