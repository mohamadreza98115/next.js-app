import React, {Suspense} from 'react'
import Footer from "@/app/ui/Footer";
import Searchbar from "@/app/ui/user/Searchbar";
import CategoryFilter from "@/app/ui/user/CategoryFilter";
import Skeleton from "@/app/ui/user/Skeleton";
import ProductList from "@/app/ui/user/ProductList";
import Pagination from "@/app/ui/user/Pagination";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {fetchAllCategories} from "@/services/categories";
import {redirect} from "next/navigation";
import axios from "axios";
import {baseUrl} from "@/app/ui/constants";

interface Props {
    searchParams: { q: string | undefined };
    params: { id: number };
}

export default async function Home({searchParams}: Props) {

    const {q} = searchParams;
    const session = getServerSession(authOptions);
    const categories = await fetchAllCategories();
    if (!session) {
        redirect("/login");
    } else
        console.log("Session: ", session)
    let products;
    q ?
        products = await axios.get(`${baseUrl}/api/products?q=${q}`).then((res: { data: any; }) => res.data)
        :
        products = await axios.get(`${baseUrl}/api/products`).then((res: { data: any; }) => res.data);

    return (
        <div className="">
            <Searchbar/>
            <CategoryFilter categories={categories}/>
            <div>
                <Suspense fallback={<Skeleton/>}>
                    <ProductList products={products}/>
                </Suspense>
            </div>
            {/* Footer */}
            <Footer/>
        </div>
    )
}
