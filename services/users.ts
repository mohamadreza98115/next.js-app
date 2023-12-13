import {baseUrl} from "@/app/ui/constants";


export const fetchAllUsers = async () => {
    const response = await fetch(`${baseUrl}/api/users`);
    return await response.json();
}