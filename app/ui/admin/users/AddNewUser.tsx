'use client'
import React, {Fragment, useRef, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {
    EnvelopeIcon,
    ExclamationCircleIcon,
    LockClosedIcon,
    PhotoIcon,
    PlusIcon,
    UserIcon
} from "@heroicons/react/20/solid";
import {Controller, FieldValues, useForm} from "react-hook-form";
import className from "clsx";
import {baseUrl} from "@/app/ui/constants";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import SuccessAlert from "@/app/ui/SuccessAlert";
import {mutate} from "swr";

const schema = z.object({
    name: z.string().min(3, "Name must contain at least 3 character(s)"),
    email: z.string().email(),
    password: z.string().min(6, "Password must contain at least 6 character(s)"),
    image: z.string().url().optional(),
    emailExist: z.string().optional(),
    nameExist: z.string().optional(),
})

type FormValueTypes = z.infer<typeof schema>

const input_error_classes = "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"

const AddNewUser = () => {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const cancelButtonRef = useRef(null)
    const {
        control,
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: {errors}
    } = useForm<FormValueTypes>({resolver: zodResolver(schema), defaultValues: {name: "", email: "", password: ""}});
    const onSubmit = async (values: FieldValues) => {
        axios.post(`${baseUrl}/api/users`, values).then(() => {
            reset();
            setShow(true)
            setOpen(false);
            mutate("users");
        }).catch((err) => {
            const data = err?.response?.data;
            if (data?.nameExist)
                setValue("emailExist", data?.nameExist);
            if (data?.emailExist)
                setValue("emailExist", data?.emailExist)
        })
    }
    console.log(getValues("nameExist"));
    return (
        <>
            <SuccessAlert show={show} setShow={setShow}/>
            <button
                onClick={() => setOpen(true)}
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add product
            </button>
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

                    <div className="mt-10 fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                                                    Add User
                                                </Dialog.Title>
                                                <form onSubmit={handleSubmit(onSubmit)} className={'mt-2'}>
                                                    <Controller control={control} name={"name"}
                                                                render={({field}) => <div>
                                                                    <label htmlFor="name"
                                                                           className="block text-sm font-medium leading-6 text-gray-900">
                                                                        Name
                                                                    </label>
                                                                    <div
                                                                        className="relative mt-2 rounded-md shadow-sm">
                                                                        <div
                                                                            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                            <UserIcon
                                                                                className="h-5 w-5 text-gray-400"
                                                                                aria-hidden="true"/>
                                                                        </div>
                                                                        <input
                                                                            type="text"
                                                                            {...field}
                                                                            id="name"
                                                                            className={className(`pl-10 block w-full min-w-[20rem] rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, errors.name && input_error_classes)}
                                                                        />
                                                                        {errors.name && <div
                                                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                                            <ExclamationCircleIcon
                                                                                className="h-5 w-5 text-red-500"
                                                                                aria-hidden="true"/>
                                                                        </div>}
                                                                    </div>
                                                                    {errors.name &&
                                                                        <p className="mt-2 text-sm text-red-600"
                                                                           id="name-error">
                                                                            {errors.name.message}
                                                                        </p>}
                                                                </div>}
                                                    />

                                                    <Controller name={'email'} control={control}
                                                                render={({field}) =>
                                                                    <div>
                                                                        <label htmlFor="email"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Email
                                                                        </label>
                                                                        <div
                                                                            className="relative mt-2 rounded-md shadow-sm">
                                                                            <div
                                                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                <EnvelopeIcon
                                                                                    className="h-5 w-5 text-gray-400"
                                                                                    aria-hidden="true"/>
                                                                            </div>
                                                                            <input
                                                                                type="email"
                                                                                {...field}
                                                                                id="email"
                                                                                className={className(`pl-10 block w-full min-w-[20rem] rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, errors.email && input_error_classes)}
                                                                            />
                                                                            {errors.email && <div
                                                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                                                <ExclamationCircleIcon
                                                                                    className="h-5 w-5 text-red-500"
                                                                                    aria-hidden="true"/>
                                                                            </div>}
                                                                        </div>
                                                                        {errors.email &&
                                                                            <p className="mt-2 text-sm text-red-600"
                                                                               id="email-error">
                                                                                {errors.email.message}
                                                                            </p>}
                                                                    </div>
                                                                }/>

                                                    <Controller name={'password'} control={control}
                                                                render={({field}) =>
                                                                    <div>
                                                                        <label htmlFor="password"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Password
                                                                        </label>
                                                                        <div
                                                                            className="relative mt-2 rounded-md shadow-sm">
                                                                            <div
                                                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                <LockClosedIcon
                                                                                    className="h-5 w-5 text-gray-400"
                                                                                    aria-hidden="true"/>
                                                                            </div>
                                                                            <input
                                                                                type="password"
                                                                                {...field}
                                                                                id="password"
                                                                                className={className(`pl-10 block w-full min-w-[20rem] rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, errors.password && input_error_classes)}
                                                                            />
                                                                            {errors.password && <div
                                                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                                                <ExclamationCircleIcon
                                                                                    className="h-5 w-5 text-red-500"
                                                                                    aria-hidden="true"/>
                                                                            </div>}
                                                                        </div>
                                                                        {errors.password &&
                                                                            <p className="mt-2 text-sm text-red-600"
                                                                               id="email-error">
                                                                                {errors.password.message}
                                                                            </p>}
                                                                    </div>
                                                                }/>

                                                    <Controller name={'image'} control={control}
                                                                render={({field}) =>
                                                                    <div>
                                                                        <label htmlFor="image"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Image
                                                                        </label>
                                                                        <div
                                                                            className="relative mt-2 rounded-md shadow-sm">
                                                                            <div
                                                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                <PhotoIcon
                                                                                    className="h-5 w-5 text-gray-400"
                                                                                    aria-hidden="true"/>
                                                                            </div>
                                                                            <input
                                                                                type="url"
                                                                                {...field}
                                                                                id="image"
                                                                                className={className(`pl-10 block w-full min-w-[20rem] rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, errors.image && input_error_classes)}
                                                                            />
                                                                            {errors.image && <div
                                                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                                                <ExclamationCircleIcon
                                                                                    className="h-5 w-5 text-red-500"
                                                                                    aria-hidden="true"/>
                                                                            </div>}
                                                                        </div>
                                                                        {errors.image &&
                                                                            <p className="mt-2 text-sm text-red-600"
                                                                               id="email-error">
                                                                                {errors.image.message}
                                                                            </p>}
                                                                    </div>
                                                                }/>
                                                    <div
                                                        className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex disabled:bg-gray-500 w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
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
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default AddNewUser;