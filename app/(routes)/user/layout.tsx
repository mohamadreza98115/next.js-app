import React, {ReactNode} from 'react';
import {Metadata} from "next";

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
        {children}
        </body>
        </html>
    );
};

export default UserLayout;