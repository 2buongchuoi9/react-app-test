import classNames from "classnames"
import { Link, useLocation } from "react-router-dom"

const cl = classNames.bind()

const Breadcrumbs = () => {
    const location = useLocation()

    let currentPath = ""

    const crumbs = location.pathname
        .split("/")
        .filter((v) => v !== "")
        .map((v) => {
            currentPath += `/${v}`
            return { name: v, path: currentPath }
        })

    return (
        <div className="space-x-2 flex justify-center items-center pl-3">
            {crumbs.map((v, index) => {
                return (
                    <div key={v.path} className="space-x-2 text-base font-normal leading-relaxed">
                        <Link
                            to={v.path}
                            className={cl("mx-1 text-blue-gray-500", {
                                " opacity-50 hover:text-blue-500 hover:opacity-100": index < crumbs.length - 1,
                                " text-gray-950": index == crumbs.length - 1,
                            })}
                        >
                            {v.name}
                        </Link>
                        {index < crumbs.length - 1 && <span>/</span>}
                    </div>
                )
            })}
        </div>
    )
}
export default Breadcrumbs
