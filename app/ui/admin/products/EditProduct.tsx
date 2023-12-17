'use client'
import {useState} from 'react';
import {Product} from "@/types";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import DeleteProduct from "@/app/ui/admin/products/DeleteProduct";
import SuccessAlert from "@/app/ui/SuccessAlert";
import Image from "next/image";
import {ProductSchema} from "@/services/schema";
import {updateProduct} from "@/app/actions";


interface Props {
    product: Product;
}

type FormValueTypes = z.infer<typeof ProductSchema>

const EditProduct = ({product}: Props) => {
    const {name, description, stock, price, brand, categoryId, thumbnail} = product;
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm<FormValueTypes>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {name, description, stock, thumbnail, price, brand, categoryId}
    });
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const onSubmit: SubmitHandler<FormValueTypes> = async (values) => {
        const id = product.id;
        const result = await updateProduct(id, values);
        if (!result.success) {
            console.log(result.error)
        }
        if (result.success) {
            setShow(true)
            console.log(result)
        }

    }
    return (
        <div>
            <SuccessAlert show={show} setShow={setShow}/>
            <div className="xl:pl-72">
                <main>
                    <div className="divide-y divide-white/5">
                        <div
                            className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7">Product
                                    Information</h2>
                            </div>

                            <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                    <div className="col-span-full flex items-center gap-x-8">
                                        <Image
                                            src={product.thumbnail}
                                            alt="p_pict"
                                            width={96}
                                            height={96}
                                            className="h-24 w-24 flex-none rounded-lg object-cover"
                                        />
                                        <div className={'flex items-center'}>
                                            <input
                                                type="file"
                                                className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold shadow-sm"

                                            />
                                            <p className="mt-2 text-xs leading-5">JPG, GIF or PNG. 1MB
                                                max.</p>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="name"
                                               className="block text-sm font-medium leading-6">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("name")}
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="block w-full rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.name &&
                                            <p className="mt-2 text-sm text-red-600"
                                               id="email-error">
                                                {errors.name.message}
                                            </p>}
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="brand"
                                               className="block text-sm font-medium leading-6">
                                            Brand
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("brand")}
                                                id="brand"
                                                type="text"
                                                className="block w-full rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.brand &&
                                            <p className="mt-2 text-sm text-red-600"
                                               id="email-error">
                                                {errors.brand.message}
                                            </p>}
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="stock"
                                               className="block text-sm font-medium leading-6">
                                            Stock
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("stock", {valueAsNumber: true})}
                                                id="stock"
                                                type="number"
                                                className="block w-full rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.stock &&
                                            <p className="mt-2 text-sm text-red-600"
                                               id="email-error">
                                                {errors.stock.message}
                                            </p>}
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="price"
                                               className="block text-sm font-medium leading-6">
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("price", {valueAsNumber: true})}
                                                id="price"
                                                type="number"
                                                className="block w-full rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.price &&
                                            <p className="mt-2 text-sm text-red-600"
                                               id="email-error">
                                                {errors.price.message}
                                            </p>}
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="description"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="description"
                                                rows={3}
                                                className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                                                {...register("description")}
                                            />
                                        </div>
                                        {errors.description &&
                                            <p className="mt-2 text-sm text-red-600"
                                               id="email-error">
                                                {errors.description.message}
                                            </p>}
                                    </div>

                                </div>

                                <div className="mt-8 flex">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div
                            className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7">Delete product</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    No longer want to use this product? You can delete product here. This action
                                    is not reversible.
                                    All information related to this product will be deleted permanently.
                                </p>
                            </div>

                            <div className="flex items-start md:col-span-2">
                                <button
                                    onClick={() => setOpen(true)}
                                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                                >
                                    Yes, delete product
                                </button>
                                <DeleteProduct id={product.id} open={open} setOpen={setOpen}/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EditProduct;