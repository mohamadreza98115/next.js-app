import axios from "axios";
import {baseUrl} from "@/app/ui/constants";

export const fetchAllProducts = async () => {
    try {
        return axios.get(`${baseUrl}/api/products`).then(res => res.data);
    } catch (error) {
        return error;
    }
}

export const fetchProductById = async (id: number) => {
    try {
        return axios.get(`${baseUrl}/api/products/${id}`).then(res => res.data);
    } catch (error) {
        return error;
    }
}