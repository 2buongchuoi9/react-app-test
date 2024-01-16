import axios from "axios"

const http = axios.create({
    baseURL: "http://localhost:8084/api/v2",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
})
export default http
