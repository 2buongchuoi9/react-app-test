import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./layouts/Dashboard"

function App() {
    return (
        <>
            <Routes>
                <Route path="/admin/*" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/admin/home" replace />} />
            </Routes>
        </>
    )
}

export default App
