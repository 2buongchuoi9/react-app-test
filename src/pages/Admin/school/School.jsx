import { useEffect, useState } from "react"
import ModalImage from "~/components/ModalImage"
import Pagination from "~/components/Pagination"
import Table from "~/components/Table"
import http from "~/utils/httpRequest"

const header = [
    { title: "id", dataIndex: "id" },
    { title: "name", dataIndex: "name" },
    { title: "address", dataIndex: "address" },
    { title: "email", dataIndex: "email", render: (text) => <span className="text-red-600">{text}</span> },
    { title: "logo", dataIndex: "logo", render: (text) => <img alt="" src={text} /> },
]

// const data = [
//     { id: 12, key: 12, name: "PoLy HCM", adrress: "HCM", email: "polyHCM@fpt.edu.vn", logo: "ss" },
//     { id: 13, key: 13, name: "PoLy HN", adrress: "HN", email: "polyHN@fpt.edu.vn", logo: "logo" },
//     {
//         id: 22,
//         key: 22,
//         name: "PoLy Đà Nẵng",
//         adrress: "137 Nguyễn Thị Thập, phường Hòa Minh, quận Liên Chiểu, TP Đà Nẵng",
//         email: "danang@fpt.edu.vn",
//         logo: "http://res.cloudinary.com/anhdaden/image/upload/v1705234057/demo_spring/nbozf49eityacyuijaro.png",
//     },
//     {
//         id: 11,
//         key: 11,
//         name: "Trường THPT FPT Hà Nội",
//         adrress: "Khuôn viên Trường Đại học FPT, Khu CNC Hoà Lạc, Thạch Hoà, Thạch Thất, Hà Nội",
//         email: "thpt.vanphong.hoalac@fe.edu.vn",
//         logo: "http://res.cloudinary.com/anhdaden/image/upload/v1705234057/demo_spring/nbozf49eityacyuijaro.png",
//     },
//     {
//         id: 7,
//         key: 7,
//         name: "Đại học FPT",
//         adrress: "Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp. Thủ Đức, TP.HCM",
//         email: "daihoc.hcm@fpt.edu.vn",
//         logo: "http://res.cloudinary.com/anhdaden/image/upload/v1705234057/demo_spring/nbozf49eityacyuijaro.png",
//     },
// ]

const School = () => {
    const [show, setShow] = useState(false)
    const [schools, setSchool] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        const fetchApi = async () => {
            const data = await http.get(`/school?page=${page}&limit=${pageSize}`)
            console.log(data)
            const result = data.data

            setPage(result.page)
            setTotalPage(result.totalPage)
            setPageSize(result.pageSize)

            setSchool(result.content.map((v) => ({ ...v, key: v.id })))
        }
        fetchApi()
    }, [page, pageSize])

    const handlePageChange = ({ page, pageSize }) => {
        console.log(page, ":::::::::::::", pageSize)
        setPage(page)
        setPageSize(pageSize)
    }

    console.log(`page${page}::::size${pageSize}`)

    return (
        <div>
            <Table header={header} data={schools} />

            <Pagination pageSizelist={[10, 20, 30]} onChange={handlePageChange} page={page} totalPage={totalPage} pageSize={pageSize} />

            <button className="bg-black" onClick={() => setShow(true)}>
                open
            </button>
            <ModalImage isVisible={show} onClose={() => setShow(false)}></ModalImage>
        </div>
    )
}
export default School
