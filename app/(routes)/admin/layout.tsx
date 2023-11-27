import React, {ReactNode} from 'react';
import {Metadata} from "next";
import Appbar from "@/app/ui/admin/Appbar";
import Dashboard from "@/app/ui/admin/Dashboard";

export const metadata: Metadata = {
    title: "Dashboard"
}

interface Props {
    children: ReactNode;
}

const AdminLayout = ({children}: Props) => {
    return (
        <html>
        <body>
        <Dashboard>
            {children}
        </Dashboard>
        </body>
        </html>
    );
};

export default AdminLayout;