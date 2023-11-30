import React, {ReactNode} from 'react';
import {Metadata} from "next";
import Navbar from "@/app/ui/user/Navbar";

export const metadata: Metadata = {
    title: "E-Commerce"
}

interface Props {
    children: ReactNode;
}

const UserLayout = ({children}: Props) => {
    return (
        <html>
        <body>
        <Navbar/>
        {children}
        </body>
        </html>
    );
};

export default UserLayout;