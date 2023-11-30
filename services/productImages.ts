import axios from "axios";
import {baseUrl} from "@/app/ui/constants";

export const fetchProductImages = async (params: number) => {
    try {
        return await axios.get(`${baseUrl}/api/productImages?id=${params}`).then(res => res.data)
    } catch (error) {
        return error;
    }
}