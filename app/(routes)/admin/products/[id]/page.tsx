import React from 'react';
import {fetchProductById} from "@/services/products";
import EditProduct from "@/app/ui/admin/products/EditProduct";

interface Props {
    params: { id: number }
}

const EditProductPage = async ({params}: Props) => {
    const id = params?.id;
    const product = await fetchProductById(id);
    return (
        <EditProduct product={product}/>
    );
};

export default EditProductPage;