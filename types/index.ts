export interface Product {
    id: number;
    name: string;
    description: string;
    brand?: string;
    price: number;
    thumbnail: string;
    categoryId: number;
}

export interface ProductImages {
    id: number;
    imageUrl: string;
    productId: number;
}

export interface Category {
    id: number;
    name: string;
    image: string;
}