import { useState } from "react"
import { RiArrowDropDownLine } from "react-icons/ri"

const SelectSearch = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase())
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative group">
                <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                >
                    <span className="mr-2">
                        Open Dropdown <RiArrowDropDownLine />
                    </span>
                </button>
                <div
                    id="dropdown-menu"
                    className={`${
                        isOpen ? "" : "hidden"
                    } absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1`}
                >
                    {/* Search input */}
                    <input
                        id="search-input"
                        className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                        type="text"
                        placeholder="Search items"
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    {/* Dropdown content goes here */}
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                        Uppercase
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                        Lowercase
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                        Camel Case
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                        Kebab Case
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SelectSearch
