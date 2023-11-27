'use client'

import {ReactNode, useState} from 'react'
import {SessionProvider} from "next-auth/react";

interface Props {
    children: ReactNode;
}

export function Providers({children}: Props) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
