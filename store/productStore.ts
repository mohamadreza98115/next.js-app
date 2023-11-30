import {create} from 'zustand'
import {Product} from '@/types'

interface ProductStore {
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (productId: number) => void;
}

const useProductStore = create<ProductStore>((set) => ({
    products: [],
    addProduct: (product: Product) =>
        set((store) => ({products: [...store.products, product]})),
    removeProduct: (productId: number) =>
        set((store) => ({
            products: store.products.filter((p) => p.id !== productId),
        })),
}));

export default useProductStore;