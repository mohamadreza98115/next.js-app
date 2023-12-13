import React from 'react';
import ProductTable from "@/app/ui/admin/products/ProductTable";
import {fetchAllProducts} from "@/services/products";

const ProductPage = async () => {
    const products = await fetchAllProducts();
    return (
        <ProductTable products={products}/>
    );
};

export default ProductPage;