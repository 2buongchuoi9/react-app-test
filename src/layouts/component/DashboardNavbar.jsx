import Breadcrumbs from "./Breadcrumbs"
// import { IoIosSearch } from "react-icons/io"
import { HiMiniUserCircle } from "react-icons/hi2"
import { IoNotificationsCircle } from "react-icons/io5"
import { MdSettings } from "react-icons/md"

const DashboardNavbar = () => {
    return (
        <div className="flex justify-between text-color py-3 bg-slate-400/30 rounded-lg">
            <Breadcrumbs />
            <div className="flex justify-end space-x-3">
                {/* <div className="relative text-gray-600 ">
                    <input
                        type="search"
                        placeholder="Search"
                        className="bg-white h-10 px-5 pr-10 border border-blue-100 rounded-full text-sm focus:outline-none focus-within:border-blue-500 transition-transform duration-300"
                    />
                    <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                        <IoIosSearch />
                    </button>
                </div> */}
                <button className="flex items-center space-x-2 rounded-lg hover:bg-bg_hover px-2">
                    <HiMiniUserCircle className="w-6 h-6 text-inherit" />
                    <span className="text-color font-medium">sigin</span>
                </button>
                <button className="rounded-lg hover:bg-bg_hover px-2">
                    <IoNotificationsCircle className="w-6 h-6 text-inherit" />
                </button>
                <button className="rounded-lg hover:bg-bg_hover px-2">
                    <MdSettings className="w-6 h-6 text-inherit" />
                </button>
            </div>
        </div>
    )
}
export default DashboardNavbar
