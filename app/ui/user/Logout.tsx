'use client'
import React from 'react';
import {ArrowLeftOnRectangleIcon} from "@heroicons/react/20/solid";
import classNames from "clsx";
import {signOut} from "next-auth/react";

const Logout = ({active}: { active: boolean }) => {
    return (
        <button
            onClick={() => signOut()}
            className={classNames(active ? 'bg-gray-100 hover:text-red-500' : '', 'block px-4 py-2 text-sm text-gray-700')}
        >
            <ArrowLeftOnRectangleIcon
                className="h-5 w-5 inline pr-1 pb-1"
                aria-hidden="true"/>
            Sign out
        </button>
    );
};

export default Logout;