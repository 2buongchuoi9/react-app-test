import { Link, NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import logo from "../../../public/image/logo-fpt.png"
import classNames from "classnames"

const cl = classNames.bind()

function SideNav({ items }) {
    return (
        <aside className="fixed inset-0 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl border border-blue-gray-100 text-color">
            <div className="relative">
                <Link to={"/"} className="text-center">
                    <img className="mx-auto py-2" width={200} src={logo} alt="" />
                </Link>
                <hr className="h-px w-11/12 mx-auto bg-red-700"></hr>
                <div className="m-4">
                    {items.map(({ layout, pages }, index) => {
                        return (
                            <ul key={index} className="space-y-1">
                                {pages.map(
                                    ({ icon, name, path }) =>
                                        icon && (
                                            <li key={name}>
                                                <NavLink to={`/${layout}${path}`}>
                                                    {({ isActive }) => {
                                                        return (
                                                            <div
                                                                className={cl("flex items-center p-2 rounded-lg hover:bg-bg_hover", {
                                                                    "bg-black hover:bg-black text-white": isActive,
                                                                    " text-color": !isActive,
                                                                })}
                                                            >
                                                                <span className="mr-2 p-2">{icon}</span>
                                                                <span className="text-base leading-relaxed text-inherit font-medium">{name}</span>
                                                            </div>
                                                        )
                                                    }}
                                                </NavLink>
                                            </li>
                                        )
                                )}
                            </ul>
                        )
                    })}
                </div>
            </div>
        </aside>
    )
}

// return (
//     <li key={index} className="group ">
//         <NavLink to={path}>
//             {({ isActive }) => {
//                 console.log("is active:::::::::::", isActive)
//                 return (
//                     <div className={cl("flex p-2 rounded-lg hover:bg-[#607d8b1a]", { "bg-black": isActive })}>
//                         <span className="mr-2">{icon}</span>
//                         <span className="">{name}</span>
//                     </div>
//                 )
//             }}
//         </NavLink>
//     </li>
// )

SideNav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
}
// SideNav.defaultProps = {
//     items: null,
// }

export default SideNav
