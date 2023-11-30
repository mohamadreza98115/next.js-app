'use client'
import React, {Fragment, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {EnvelopeIcon, ExclamationCircleIcon, PlusCircleIcon, PlusIcon} from "@heroicons/react/20/solid";
import className from "clsx";
import {useForm} from "react-hook-form";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const schema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().negative(),
    brand: z.string()
})

type FormFieldTypes = z.infer<typeof schema>

const input_error_classes = "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
export default function AddNewProduct({open, setOpen}: Props) {
    const {register, formState: {errors}} = useForm<FormFieldTypes>({resolver: zodResolver(schema)});

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                            <PlusIcon className="h-6 w-6 " aria-hidden="true"/>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-base font-semibold leading-6 text-gray-900">
                                                Add Product
                                            </Dialog.Title>
                                            <div className="mt-2">

                                                <div>
                                                    <label htmlFor="email"
                                                           className="block text-sm font-medium leading-6 text-gray-900">
                                                        Name
                                                    </label>
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <input
                                                            type="email"
                                                            {...register("name")}
                                                            id="email"
                                                            className={className(`block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, errors.name && input_error_classes)}
                                                        />
                                                        {errors.name && <div
                                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500"
                                                                                   aria-hidden="true"/>
                                                        </div>}
                                                    </div>
                                                    {errors.name &&
                                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                                            {errors.name.message}
                                                        </p>}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
