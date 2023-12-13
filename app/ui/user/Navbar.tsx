'use client'
import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, Cog6ToothIcon, XMarkIcon} from '@heroicons/react/24/outline'
import Link from "next/link";
import {ShoppingCartIcon, UserIcon} from "@heroicons/react/20/solid";
import ProfileImage from '@/public/profileImage.jpg'
import Image from "next/image";
import {useSession} from "next-auth/react";
import Logout from "@/app/ui/user/Logout";
import {usePathname} from "next/navigation";
import {userNav} from "@/app/ui/constants";

type ClassNames = string[];

function classNames(...classes: ClassNames): string {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const {data, status} = useSession();
    const pathname = usePathname();
    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({open}) => (
                <>
                    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}>
                        <div className="flex h-16 justify-between">
                            <div className="-mr-2 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex">
                                <div className="hidden sm:flex flex-shrink-0 items-center">
                                    <img
                                        className="block h-8 w-auto lg:hidden"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt="Your Company"
                                    />
                                    <img
                                        className="hidden h-8 w-auto lg:block"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt="Your Company"
                                    />
                                </div>

                                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {
                                        userNav.map((nav, i) => {
                                            const current = pathname.endsWith(nav.href)
                                            return <Link
                                                key={i}
                                                href={nav.href}
                                                className={classNames(current ? "border-indigo-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700","inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700")}
                                            >
                                                {nav.name}
                                            </Link>
                                        })
                                    }
                                </div>

                            </div>
                            <div className="sm:ml-6 flex items-center">
                                <Link href={"/user/orders"}>
                                    <button
                                        type="button"
                                        className="rounded-full bg-transparent text-gray-400 p-1 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>
                                </Link>

                                {/* Profile dropdown */}
                                {status === "unauthenticated" ?
                                    <div className={'inline-flex pl-2'}>
                                        <Link href={"/login"}
                                              className={"border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-gray-700"}>SignIn</Link>
                                        <Link href={"/register"}
                                              className={"border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-gray-700"}>SignUp</Link>
                                    </div> :
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button
                                                className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                <span className="sr-only">Open user menu</span>
                                                <Image
                                                    className="h-8 w-8 rounded-full"
                                                    src={ProfileImage}
                                                    alt="profile image"
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href="/user/profile"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            <UserIcon className="h-5 w-5 inline pr-1 pb-1"
                                                                      aria-hidden="true"/>
                                                            Your Profile
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            <Cog6ToothIcon className="h-5 w-5 inline pr-1 pb-1"
                                                                           aria-hidden="true"/>
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Logout active={active}/>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>}
                            </div>

                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">

                        <div className="space-y-1 pb-3 pt-2">
                            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                            {
                                userNav.map((nav, i) => {
                                    const current = pathname.endsWith(nav.href)
                                    return <Disclosure.Button
                                        key={i}
                                        as="a"
                                        href="#"
                                        className={classNames(current ? "bg-indigo-50 border-indigo-500 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700" : "", "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700")}
                                    >
                                        {nav.name}
                                    </Disclosure.Button>
                                })
                            }
                        </div>

                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
