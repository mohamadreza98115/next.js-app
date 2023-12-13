import React from 'react';
import Profile from "@/app/ui/user/Profile";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const ProfilePage = () => {
    const profileData = getServerSession(authOptions)
    console.log(profileData)
    return (
        <Profile profileData={profileData}/>
    );
};

export default ProfilePage;