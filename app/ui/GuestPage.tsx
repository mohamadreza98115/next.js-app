'use client'

import React, {useState} from "react";
import {mainNav, navigation} from "@/app/ui/constants";
import {Dialog} from "@headlessui/react";
import {
    AcademicCapIcon,
    CheckCircleIcon,
    HandRaisedIcon,
    RocketLaunchIcon, SparklesIcon, SunIcon,
    UserGroupIcon,
    XMarkIcon
} from "@heroicons/react/20/solid";
import {Bars3Icon} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/app/ui/Footer";

const stats = [
    {label: 'Business was founded', value: '2012'},
    {label: 'People on the team', value: '120+'},
    {label: 'Users on the platform', value: '250k'},
    {label: 'Paid out to creators', value: '$70M'},
]
const values = [
    {
        name: 'Be world-class.',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute [id] magna.',
        icon: RocketLaunchIcon,
    },
    {
        name: 'Take responsibility.',
        description: 'Anim aute [id] magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
        icon: HandRaisedIcon,
    },
    {
        name: 'Be supportive.',
        description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus voluptas blanditiis et.',
        icon: UserGroupIcon,
    },
    {
        name: 'Always learning.',
        description: 'Iure sed ab. Aperiam optio placeat dolor facere. Officiis pariatur eveniet atque et dolor.',
        icon: AcademicCapIcon,
    },
    {
        name: 'Share everything you know.',
        description: 'Laudantium tempora sint ut consectetur ratione. Ut illum ut rem numquam fuga delectus.',
        icon: SparklesIcon,
    },
    {
        name: 'Enjoy downtime.',
        description: 'Culpa dolorem voluptatem velit autem rerum qui et corrupti. Quibusdam quo placeat.',
        icon: SunIcon,
    },
]
const team = [
    {
        name: 'Leslie Alexander',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
        location: 'Toronto, Canada',
    },
    // More people...
]
const benefits = [
    'Competitive salaries',
    'Flexible work hours',
    '30 days of paid vacation',
    'Annual team retreats',
    'Benefits for you and your family',
    'A great work environment',
]

export default function GuestPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {mainNav.map((item) => (
                            <a key={item.name} href={item.href}
                               className="text-sm font-semibold leading-6 text-gray-900">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50"/>
                    <Dialog.Panel
                        className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <Link
                                        href="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>

            <main className="relative isolate">
                {/* Background */}
                <div
                    className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                        style={{
                            clipPath:
                                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                        }}
                    />
                </div>

                {/* Header section */}
                <div className="px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">We love
                            creators</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-700">
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                            Elit sunt amet
                            fugiat veniam occaecat fugiat aliqua.
                        </p>
                    </div>
                </div>

                {/* Content section */}
                <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <div
                            className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
                            <div>
                                <p>
                                    Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis
                                    mauris semper sed amet
                                    vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra
                                    tellus varius sit neque
                                    erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.
                                    Mattis mauris
                                    semper sed amet vitae sed turpis id.
                                </p>
                                <p className="mt-8">
                                    Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id
                                    blandit molestie
                                    auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius
                                    vulputate et ultrices
                                    hac adipiscing egestas.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Erat pellentesque dictumst ligula porttitor risus eget et eget. Ultricies tellus
                                    felis id dignissim
                                    eget. Est augue maecenas risus nulla ultrices congue nunc tortor. Enim et nesciunt
                                    doloremque nesciunt
                                    voluptate.
                                </p>
                                <p className="mt-8">
                                    Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id
                                    blandit molestie
                                    auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius
                                    vulputate et ultrices
                                    hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer
                                    orci.
                                </p>
                            </div>
                        </div>
                        <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
                            {stats.map((stat, statIdx) => (
                                <div key={statIdx}
                                     className="flex flex-col-reverse gap-y-3 border-l border-black/20 pl-6">
                                    <dt className="text-base leading-7 text-gray-700">{stat.label}</dt>
                                    <dd className="text-3xl font-semibold tracking-tight text-gray-600">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                {/* Image section */}
                <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
                    <img
                        src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80"
                        alt=""
                        className="aspect-[9/4] w-full object-cover xl:rounded-3xl"
                    />
                </div>

                {/* Values section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">Our values</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-700">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
                            suscipit eaque, iste
                            dolor cupiditate blanditiis.
                        </p>
                    </div>
                    <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
                        {values.map((value) => (
                            <div key={value.name} className="relative pl-9">
                                <dt className="inline font-semibold text-gray-700">
                                    <value.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                                                aria-hidden="true"/>
                                    {value.name}
                                </dt>
                                {' '}
                                <dd className="inline">{value.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Team section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">Our products</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-700">
                            Excepturi repudiandae alias ut. Totam aut facilis. Praesentium in neque vel omnis. Eos error
                            odio. Qui
                            fugit voluptatibus eum culpa.
                        </p>
                    </div>
                    <ul
                        role="list"
                        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {team.map((person) => (
                            <li key={person.name}>
                                <img className="aspect-[14/13] w-full rounded-2xl object-cover" src={person.imageUrl}
                                     alt=""/>
                                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-700">{person.name}</h3>
                                <p className="text-base leading-7 text-gray-600">{person.role}</p>
                                <p className="text-sm leading-6 text-gray-500">{person.location}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA section */}
                <div className="relative isolate -z-10 mt-32 sm:mt-40">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div
                            className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
                            <img
                                className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                                src="https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                alt=""
                            />
                            <div className="w-full flex-auto">
                                <h2 className="text-3xl font-bold tracking-tight text-800 sm:text-4xl">Join our
                                    team</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-700">
                                    Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum
                                    cupiditate veritatis
                                    in accusamus quisquam.
                                </p>
                                <ul
                                    role="list"
                                    className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-gray-800 sm:grid-cols-2"
                                >
                                    {benefits.map((benefit) => (
                                        <li key={benefit} className="flex gap-x-3">
                                            <CheckCircleIcon className="h-7 w-5 flex-none" aria-hidden="true"/>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10 flex">
                                    <a href="#" className="text-sm font-semibold leading-6 text-indigo-400">
                                        See our job postings <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                            style={{
                                clipPath:
                                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                            }}
                        />
                    </div>
                </div>
            </main>

            <Footer/>

        </div>
    )
}