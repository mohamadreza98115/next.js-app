import axios from "axios";
import {baseUrl} from "@/app/ui/constants";

export const fetchAllCategories = async () => {
    try {
        return await axios.get(`${baseUrl}/api/categories`).then(res => res.data)
    } catch (error) {
        return error;
    }
}