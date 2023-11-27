import {ChartPieIcon, DocumentDuplicateIcon, HomeIcon, ShoppingBagIcon, UserGroupIcon} from "@heroicons/react/20/solid";

export const userNavigation = [
    {name: 'Your profile', href: '#'},
    {name: 'Sign out', href: '#'},
]

export const navigation = [
    {name: 'Dashboard', href: '#', icon: HomeIcon, current: true},
    {name: 'Products', href: '/admin/products', icon: ShoppingBagIcon, current: false},
    {name: 'Users', href: '#', icon: UserGroupIcon, current: false},
]

export const teams = [
    {id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false},
    {id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false},
    {id: 3, name: 'Workcation', href: '#', initial: 'W', current: false},
]