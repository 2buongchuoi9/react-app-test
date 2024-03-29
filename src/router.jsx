import { VscSymbolClass } from "react-icons/vsc"
import { PiStudent } from "react-icons/pi"
import { IoSchoolOutline, IoHomeOutline } from "react-icons/io5"
import { BsFileEarmarkExcel } from "react-icons/bs"
import School from "./pages/Admin/school/School"
import Student from "./pages/Admin/student/Student"
import AddStudent from "./pages/Admin/student/AddStudent"
import ImportExport from "./pages/Admin/ImportExport"
import UpdateStudent from "./pages/Admin/student/UpdateStudent"
// import Dashboard from "./layouts/Dashboard"

const icon = {
    className: "w-5 h-5 text-inherit",
}

export const routes = [
    {
        layout: "admin",
        pages: [
            {
                icon: <IoHomeOutline {...icon} />,
                name: "Home",
                path: "/home",
                element: <div>hello home admin</div>,
            },
            {
                icon: <IoSchoolOutline {...icon} />,
                name: "School",
                path: "/school",
                element: <School />,
            },
            {
                icon: <VscSymbolClass {...icon} />,
                name: "Class",
                path: "/class",
                // element: <Tables />,
            },
            {
                icon: <PiStudent {...icon} />,
                name: "Student",
                path: "/student",
                element: <Student />,
            },
            {
                icon: <BsFileEarmarkExcel {...icon} />,
                name: "Import-Export",
                path: "/file",
                element: <ImportExport />,
            },

            { path: "/student/add", element: <AddStudent /> },
            { path: "/student/update/:id", element: <UpdateStudent /> },
        ],
    },
]
