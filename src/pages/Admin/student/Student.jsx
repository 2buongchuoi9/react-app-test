import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import Alert from "~/components/Alert"
import Loading from "~/components/Loading"
import ModalEditMany from "~/components/ModalEditMany"
// import Modal from "~/components/Modal"
import Pagination from "~/components/Pagination"
import Table from "~/components/Table"
import useDebounce from "~/hook/useDebounce"
import { getKeyFromValue } from "~/utils"
import { StatusStudent } from "~/utils/constan"
import http from "~/utils/httpRequest"

const cl = classNames.bind()

const header = [
    { title: "code", dataIndex: "code" },
    { title: "name", dataIndex: "name" },
    { title: "image", dataIndex: "image", render: (text) => <img className="rounded-full w-9 h-9 object-cover" alt="" src={text} /> },
    { title: "address", dataIndex: "address" },
    { title: "class Id", dataIndex: "clazzId" },
    { title: "phone", dataIndex: "phone" },
    { title: "birthday", dataIndex: "birthday" },
    {
        title: "status",
        dataIndex: "status",
        render: (v) => (
            <div
                className={cl(
                    "rounded-xl text-center flex justify-center items-center py-1 font-light text-sm text-white",
                    { "bg-blue-500": v === 0 },
                    { "bg-green-500": v === 1 },
                    { "bg-gray-500": v === 2 },
                    { "bg-orange-500": v === 3 },
                    { "bg-red-500": v === 4 }
                )}
            >
                {getKeyFromValue(v, StatusStudent)?.toLowerCase()}
            </div>
        ),
    },
    { title: "email", dataIndex: "email", render: (text) => <span className="text-red-600">{text}</span> },
]

const Student = () => {
    const [showAction, setShowAction] = useState(false)
    const [students, setStudents] = useState([])
    const [clazzs, setClazzs] = useState([])
    const [schools, setSchools] = useState([])
    const [selectStatus, setSelectStatus] = useState("")
    const [selectedOption, setSelectedOption] = useState({ type: "", value: "" })

    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPage, setTotalPage] = useState(0)

    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ isVisible: false, content: "" })
    const [externalSelectRow, setExternalSelectRow] = useState({})

    const debouncedSearch = useDebounce(search, 500)

    const inputRef = useRef()

    useEffect(() => {
        const fetchOrther = async () => {
            const dataSchool = await http.get("/school?limit=1000&page=1")
            const dataClazz = await http.get("/class?limit=1000&page=1")
            setSchools(dataSchool.data.content)
            setClazzs(dataClazz.data.content)
        }
        fetchOrther()
    }, [])

    const fetchApi = async () => {
        setLoading(true)
        const strSelect = selectedOption.type ? `/${selectedOption.type}/${selectedOption.value}` : ""
        const searchQuery = debouncedSearch ? `/search/${debouncedSearch}` : ""
        const sttQuery = selectStatus ? `&status=${selectStatus}` : ""
        const data = await http.get(`/student${strSelect}${searchQuery}?page=${page}&limit=${pageSize}${sttQuery}`)
        console.log("url", `/student${strSelect}?page=${page}&limit=${pageSize}${sttQuery}`)
        console.log(data)
        const result = data.data

        setPage(result.page)
        setTotalPage(result.totalPage)
        setPageSize(result.pageSize)
        setStudents(result.content.map((v) => ({ ...v, key: v.id })))

        setLoading(false)
    }
    useEffect(() => {
        fetchApi()
    }, [page, pageSize, selectedOption, debouncedSearch, selectStatus])

    const handlePageChange = ({ page, pageSize }) => {
        setPage(page)
        setPageSize(pageSize)
    }

    const handleSelectOnChange = (target) => {
        const { name, value } = target
        console.log(selectedOption)
        setSelectedOption({ type: value ? name : "", value })
    }

    const handleExternalSelectRowChange = (newSelectRow) => {
        setExternalSelectRow(newSelectRow)
    }

    const handleAction = () => {
        setShowAction(true)
        console.log(externalSelectRow)
        const newArray = Object.keys(externalSelectRow).map((key) => students.find((v) => v.id == key))
        console.log("newArray", newArray)
        console.log("action")
    }

    const handleDelete = async (item) => {
        setAlert({
            isVisible: true,
            content: `Are you sure to delete student: ${item.name}-${item.code}?`,
            onOk: async () => {
                // setLoading(true)
                try {
                    await http.delete(`/student/${item.id}`)
                    await fetchApi()
                } catch (error) {
                    alert(error)
                }
                // setLoading(false)

                console.log("Delete", item)
                setAlert((prev) => ({ ...prev, isVisible: false }))
            },
            onClose: () => setAlert((prev) => ({ ...prev, isVisible: false })),
        })
    }
    const navigate = useNavigate()
    const handleEdit = (item) => {
        console.log("edit", item)
        navigate(`/admin/student/update/${item.id}`)
    }
    const handleCallApiToUpdateManyData = async (status, clazzId) => {
        const ids = Object.keys(externalSelectRow)

        let data

        try {
            setLoading(true)
            data = await http.post("/student/update-many", { ids, status, clazzId })
        } catch (error) {
            console.log(error)
        }
        console.log(data)
        setShowAction(false)
        await fetchApi()
        setLoading(false)
    }

    return (
        <>
            {loading && <Loading />}
            <div>
                <div className="flex justify-between items-center space-x-6 mb-3">
                    <div className="flex justify-center items-center space-x-3">
                        {/* search with school id */}
                        <div className="relative h-10 w-56 min-w-10">
                            <select
                                name="school"
                                onChange={(e) => handleSelectOnChange(e.target)}
                                value={selectedOption.type === "school" ? selectedOption.value : ""}
                                className="peer h-full w-full rounded-[7px] border bg-white border-blue-gray-200 border-t-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            >
                                <option value="">select with school</option>
                                {schools && schools.map((v) => <option key={v.id} value={v.id}>{`${v.name} (${v.id})`}</option>)}
                            </select>
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium text-sm leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                school
                            </label>
                        </div>
                        {/* search with class id */}
                        <div className="relative h-10 w-56 min-w-10">
                            <select
                                name="class"
                                onChange={(e) => handleSelectOnChange(e.target)}
                                value={selectedOption.type === "class" ? selectedOption.value : ""}
                                className="peer h-full w-full rounded-[7px] border bg-white border-blue-gray-200 border-t-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            >
                                <option value="">select with class</option>
                                {clazzs && clazzs.map((v) => <option key={v.id} value={v.id}>{`${v.code} (${v.id})`}</option>)}
                            </select>
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium text-sm leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                class
                            </label>
                        </div>

                        {/* search with status */}
                        <div className="relative h-10 w-56 min-w-10">
                            <select
                                name="class"
                                onChange={(e) => {
                                    setSelectStatus(e.target.value)
                                    setSearch("")
                                }}
                                value={selectStatus}
                                className="peer h-full w-full rounded-[7px] border bg-white border-blue-gray-200 border-t-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            >
                                <option value="">select with status</option>
                                {Object.keys(StatusStudent).map((k) => (
                                    <option key={StatusStudent[k]} value={StatusStudent[k]}>{`${k.toLowerCase()} (${StatusStudent[k]})`}</option>
                                ))}
                            </select>
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium text-sm leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                status
                            </label>
                        </div>
                    </div>
                    {/* search */}
                    <div className="relative text-gray-600 flex justify-center items-center">
                        <input
                            ref={inputRef}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                handleSelectOnChange({ name: "", value: "" })
                            }}
                            value={search}
                            type="search"
                            placeholder="Search"
                            className="bg-white h-10 px-5 pr-10 border border-black/25 rounded-full text-sm focus:outline-none focus-within:border-blue-500 transition-transform duration-300"
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <IoIosSearch />
                        </button>
                    </div>
                    <div className="flex justify-center items-center space-x-3">
                        {/* Add student */}
                        <div>
                            <button className="h-10 px-4 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800">
                                <Link to={"/admin/student/add"}>Add student</Link>
                            </button>
                        </div>
                        {/* Action */}
                        <div>
                            <button
                                onClick={handleAction}
                                disabled={Object.keys(externalSelectRow).length === 0}
                                className={cl(
                                    "h-10 px-4 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800",
                                    { "cursor-not-allowed": Object.keys(externalSelectRow).length === 0 }
                                )}
                            >
                                Action
                            </button>
                        </div>
                    </div>
                </div>
                <Table header={header} data={students} onDelete={handleDelete} onEdit={handleEdit} setSelectedRow={handleExternalSelectRowChange} />
                <Pagination pageSizelist={[10, 20, 30]} onChange={handlePageChange} page={page} totalPage={totalPage} pageSize={pageSize} />
                {/* <button className="bg-black" onClick={() => setShow(true)}>
                    open
                </button>
                <Modal isVisible={show} onClose={() => setShow(false)}></Modal> */}
                <Alert {...alert} />
                <ModalEditMany
                    isVisible={showAction}
                    onClose={() => setShowAction(false)}
                    onSubmit={({ status, clazzId }) => handleCallApiToUpdateManyData(status, clazzId)}
                />
            </div>
        </>
    )
}
export default Student
