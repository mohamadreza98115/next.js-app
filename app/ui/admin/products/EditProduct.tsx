import React from 'react';
import {Product} from "@/types";

interface Props {
    product: Product;
}

const EditProduct = ({product}: Props) => {
    return (
        <div>
            {JSON.stringify(product)}
        </div>
    );
};

export default EditProduct;