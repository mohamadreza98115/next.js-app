'use client'
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

const Searchbar = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter()

    const handleSearch = useDebouncedCallback((e: { target: { value: string; } }) => {
        const params = new URLSearchParams(searchParams);
        if (e.target.value)
            e.target.value.length > 2 && params.set("q", e.target.value);
        else
            params.delete("q")

        replace(`${pathname}?${params}`)
    }, 400);


    return (
        <div className={'max-w-[24rem] p-2'}>
            {/*<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">*/}
            {/*    Search*/}
            {/*</label>*/}
            <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                </div>
                <input
                    onChange={handleSearch}
                    type="search"
                    name={"search"}
                    id="search"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search..."
                />
            </div>
        </div>
    );
};

export default Searchbar;