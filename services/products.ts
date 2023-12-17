import axios from "axios";
import {baseUrl} from "@/app/ui/constants";
import {Product} from "@/types";

export const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/products`);
        return await response.json();
    } catch (error) {
        return error;
    }
}

export const fetchProductById = async (id: number) => {
    try {
        return axios.get(`${baseUrl}/api/products/${id}`).then(res => res.data)

    } catch (error) {
        return error;
    }
}

export const deleteProductById = async (id: number) => {
    try {
        return axios.delete(`${baseUrl}/api/products/${id}`).then(res => res.data)

    } catch (err) {
        console.log(err)
    }
}

export const updateProductById = async (id: number, data: any) => {
    try {
        await axios.put(`${baseUrl}/api/products/${id}`, data);
    } catch (err) {
        console.log(err)
    }
}