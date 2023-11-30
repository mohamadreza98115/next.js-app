import React from 'react';
import ProductDetail from "@/app/ui/user/productDetail";
import {fetchProductById} from "@/services/products";
import {fetchProductImages} from "@/services/productImages";

interface Props {
    params: { id: number };
}

const ProductDetailPage = async ({params}: Props) => {
    const id = params.id;
    const productImages = await fetchProductImages(id);
    const product = await fetchProductById(id)
    return (
        <div>
            <ProductDetail productImages={productImages} product={product}/>
        </div>
    );
};

export default ProductDetailPage;