'use client'
import React from 'react';
import {Bars3Icon} from "@heroicons/react/24/outline";

interface Props {
    setSidebarOpen: (value: boolean) => void;
}

const ToggleSidebarButton = ({setSidebarOpen}: Props) => {
    return (
        <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
        </button>
    );
};

export default ToggleSidebarButton;