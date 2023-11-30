import React, {Suspense} from 'react';
import ProductList from "@/app/ui/user/ProductList";
import Searchbar from "@/app/ui/user/Searchbar";
import axios from "axios";
import Skeleton from "@/app/ui/user/Skeleton";
import Pagination from "@/app/ui/user/Pagination";
import {baseUrl} from "@/app/ui/constants";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import CategoryFilter from "@/app/ui/user/CategoryFilter";
import {fetchAllCategories} from "@/services/categories";


interface Props {
    searchParams: { q: string | undefined };
    params: { id: number };
}

const ProductPage = async ({searchParams}: Props) => {
    const {q} = searchParams;
    const session = getServerSession(authOptions);
    const categories = await fetchAllCategories();
    if (!session) {
        redirect("/login");
    } else
        console.log("Session: ", session)
    let products;
    q ?
        products = await axios.get(`${baseUrl}/api/products?q=${q}`).then(res => res.data)
        :
        products = await axios.get(`${baseUrl}/api/products`).then(res => res.data);

    return (
        <div>
            <Searchbar/>
            <CategoryFilter categories={categories}/>
            <div>
                <Suspense fallback={<Skeleton/>}>
                    <ProductList products={products}/>
                </Suspense>
            </div>
            {products.length > 0 && <Pagination/>}
        </div>
    );
};

export default ProductPage;