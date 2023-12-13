'use client'
import {useState} from 'react'
import ModalDialogToDeleteUser from "@/app/ui/user/ModalDialogToDeleteUser";
import {FieldValues, useForm} from "react-hook-form";
import {useSession} from "next-auth/react";

interface Props {
    user: {
        email: string;
        name: string;
        role: string;
    }
}

export default function Profile({profileData}: Props) {
    const [open, setOpen] = useState(false)
    const {data} = useSession();
    const {register, getValues, handleSubmit} = useForm({
        defaultValues: {
            picture: null,
            email: data?.user?.email,
            name: data?.user?.name
        }
    });

    const onSubmit = (values: FieldValues) => {
        console.log(values)
    }

    return (
        <div className="xl:pl-72">
            <main>
                {/* Settings forms */}
                <div className="divide-y divide-white/5">
                    <div
                        className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                        <div>
                            <h2 className="text-base font-semibold leading-7">Personal
                                Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Use a permanent address where you can receive mail.
                            </p>
                        </div>

                        <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                <div className="col-span-full flex items-center gap-x-8">
                                    <img
                                        src={getValues("picture") ? getValues('picture') : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                        alt=""
                                        className="h-24 w-24 flex-none rounded-lg object-cover"
                                    />
                                    <div className={'flex items-center'}>
                                        <input
                                            type="file"
                                            className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold shadow-sm"
                                            {...register("picture")}

                                        />
                                        <p className="mt-2 text-xs leading-5">JPG, GIF or PNG. 1MB
                                            max.</p>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="email"
                                           className="block text-sm font-medium leading-6">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("email")}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="username"
                                           className="block text-sm font-medium leading-6 ">
                                        Username
                                    </label>
                                    <div className="mt-2 border rounded-md border-black">
                                        <div
                                            className="flex rounded-md ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                                   <span
                                                       className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                                                    example.com/
                                                      </span>
                                            <input
                                                {...register("name")}
                                                type="text"
                                                name="username"
                                                id="username"
                                                autoComplete="username"
                                                className="flex-1 bg-transparent py-1.5 pl-1 border-0 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="janesmith"
                                            />
                                        </div>
                                    </div>
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
                            <h2 className="text-base font-semibold leading-7">Change password</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Update your password associated with your account.
                            </p>
                        </div>

                        <form className="md:col-span-2">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="current-password"
                                           className="block text-sm font-medium leading-6">
                                        Current password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="current-password"
                                            name="current_password"
                                            type="password"
                                            autoComplete="current-password"
                                            className="block w-full rounded-md bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="new-password"
                                           className="block text-sm font-medium leading-6">
                                        New password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="new-password"
                                            name="new_password"
                                            type="password"
                                            autoComplete="new-password"
                                            className="block w-full rounded-md bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="confirm-password"
                                           className="block text-sm font-medium leading-6">
                                        Confirm password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="confirm-password"
                                            name="confirm_password"
                                            type="password"
                                            autoComplete="new-password"
                                            className="block w-full rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex">
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                    <div
                        className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                        <div>
                            <h2 className="text-base font-semibold leading-7">Delete account</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                No longer want to use our service? You can delete your account here. This action
                                is not reversible.
                                All information related to this account will be deleted permanently.
                            </p>
                        </div>

                        <div className="flex items-start md:col-span-2">
                            <button
                                onClick={() => setOpen(true)}
                                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                            >
                                Yes, delete my account
                            </button>
                            <ModalDialogToDeleteUser open={open} setOpen={setOpen}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
