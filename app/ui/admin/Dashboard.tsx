'use client'
import {ReactNode, useState} from 'react'
import {Bars3Icon,} from '@heroicons/react/24/outline'
import Sidebar from "@/app/ui/admin/Sidebar";
import Appbar from "@/app/ui/admin/Appbar";

interface Props {
    children: ReactNode;
}

function Dashboard({children}: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className={"dark:bg-gray-900 dark:text-white"}>
            {/* sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

            {/*Right side Contents*/}
            <div className="lg:pl-72 dark:bg-gray-900 dark:text-white">
                <div
                    className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                            onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true"/>

                    {/* Navigation bar*/}
                    <Appbar/>

                </div>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    )
}


export default Dashboard;
