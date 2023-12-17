import {HomeIcon, ShoppingBagIcon, UserGroupIcon} from "@heroicons/react/20/solid";


export const baseUrl = "http://localhost:3000";

export const userNavigation = [
    {name: 'Your profile', href: '#'},
    {name: 'Sign out', href: '/api/auth/signout'},
]

export const categories = [
    {id: 1, name: 'Clothing'},
    {id: 2, name: 'Smartphones'},
    {id: 3, name: 'Laptops'},
    {id: 4, name: 'Fragrances'},
]

export const navigation = [
    {name: 'Dashboard', href: '/admin', icon: HomeIcon},
    {name: 'Products', href: '/admin/products', icon: ShoppingBagIcon},
    {name: 'Users', href: '/admin/users', icon: UserGroupIcon},
]

export const mainNav = [
    {name: 'Dashboard', href: '/admin', icon: HomeIcon},
    {name: 'Contact', href: '#', icon: ShoppingBagIcon},
    {name: 'About', href: '/about', icon: UserGroupIcon},
]

export const userNav = [
    {name: 'Products', href: '/user/products'},
    {name: 'Team', href: '/user/team'},
    {name: 'Project', href: '/user/projects'},
    {name: 'Calendar', href: '/user/calendar'},
]

export const input_error_classes = "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"


export const teams = [
    {id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false},
    {id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false},
    {id: 3, name: 'Workcation', href: '#', initial: 'W', current: false},
]