'use client'
import React, {useState} from 'react';
import {EnvelopeIcon, ExclamationCircleIcon, LockClosedIcon, UserIcon} from "@heroicons/react/20/solid";
import className from "clsx";
import {FieldValues, useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";
import SuccessAlert from "@/app/ui/SuccessAlert";

const schema = z.object({
    name: z.string().min(3, "Username must contain at least 3 character(s)"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "password must be at least 6 characters")
})

type FormFieldTypes = z.input<typeof schema>;

const input_error_classes = "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"

const Register = () => {
    const router = useRouter();
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm<FormFieldTypes>({resolver: zodResolver(schema)});
    const [show, setShow] = useState(false)

    const RegisterUser = async (values: FieldValues) => {
        await axios.post('/api/register', values)
            .then(() => {
                setShow(true);
                router.push('/api/auth/signin');
                reset();
            })
            .catch(() => setShow(false))
    }

    return (
        <>
            <SuccessAlert show={show} setShow={setShow}/>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(RegisterUser)}>

                        {/*Username*/}
                        <div>
                            <label htmlFor="name"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <div
                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </div>
                                <input
                                    type="text"
                                    {...register("name")}
                                    id="name"
                                    className={className(`block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, errors.name && input_error_classes)}
                                    placeholder="John"
                                />
                                {errors.name && <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true"/>
                                </div>}
                            </div>
                            {errors.name && <p className="mt-2 text-sm text-red-600" id="email-error">
                                {errors.name.message}
                            </p>}
                        </div>

                        {/*Email address*/}
                        <div>
                            <label htmlFor="email"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <div
                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </div>
                                <input
                                    type="email"
                                    {...register("email")}
                                    id="email"
                                    className={className(`block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, errors.email && input_error_classes)}
                                    placeholder="you@example.com"
                                />
                                {errors.email && <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true"/>
                                </div>}
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-600" id="email-error">
                                {errors.email.message}
                            </p>}
                        </div>

                        {/*Password*/}
                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <div
                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </div>
                                <input
                                    type="password"
                                    {...register("password")}
                                    id="password"
                                    className={className(`block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, errors.email && input_error_classes)}
                                    placeholder="******"
                                />
                                {errors.password && <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true"/>
                                </div>}
                            </div>
                            {errors.password && <p className="mt-2 text-sm text-red-600" id="email-error">
                                {errors.password.message}
                            </p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;