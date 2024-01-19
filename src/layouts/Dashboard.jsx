import { routes } from "~/router"
import SideNav from "./component/SideNav"
import DashboardNavbar from "./component/DashboardNavbar"
// import Table from "~/components/Table"
import { Route, Routes } from "react-router-dom"
// import AddStudent from "~/pages/Admin/student/AddStudent"
// import UpdateStudent from "~/pages/Admin/student/UpdateStudent"
// import School from "~/pages/Admin/School"

function Dashboard() {
    return (
        <div className="min-h-screen bg-white/45 ">
            <SideNav items={routes}></SideNav>
            <div className="p-4 ml-72 h-[1000px]">
                <DashboardNavbar />
                {/* <Table header={header} data={data} /> */}

                {/* <School></School> */}

                <div id="main" className="mt-5">
                    <Routes>
                        {routes.map(
                            ({ layout, pages }) =>
                                layout === "admin" && pages.map(({ path, element }) => <Route key={path} path={path} element={element} />)
                        )}
                    </Routes>
                </div>
            </div>
        </div>
    )
}
export default Dashboard
