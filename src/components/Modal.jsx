import PropTypes from "prop-types"
import { IoCloseOutline } from "react-icons/io5"
import { Tab, Tabs } from "./Tabs"
import { useEffect, useState } from "react"
import http from "~/utils/httpRequest"
import ImageUpload from "./ImageUpload"
import Pagination from "./Pagination"

const Modal = ({ isVisible, onClose }) => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPage, setTotalPage] = useState(0)

    const handleClose = (e) => {
        if (e.target.id === "wrapper-modal") {
            setPage(1)
            setPageSize(10)
            onClose()
        }
    }

    const [images, setImages] = useState(null)

    // console.log(images)

    useEffect(() => {
        const fetchApi = async () => {
            const data = await http.get(`/file/image?page=${page}&limit=${pageSize}`)
            const result = data.data
            console.log(result)
            setPage(result.page)
            setTotalPage(result.totalPage)
            setPageSize(result.pageSize)
            setImages(result.content)
        }
        if (isVisible) {
            // setPage(1)
            // setPageSize(10)
            fetchApi()
        }
    }, [isVisible, page, pageSize])

    if (!isVisible) return null

    const handleUploadImage = async (file) => {
        if (!file) {
            alert("file null")
            return
        }
        try {
            const formData = new FormData()
            formData.append("file", file)
            await http.post("/file/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            alert("upload success")
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }
    const handlePageChange = ({ page, pageSize }) => {
        console.log(page, ":::::::::::::", pageSize)
        setPage(page)
        setPageSize(pageSize)
    }

    return (
        <div
            id="wrapper-modal"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-0 flex justify-center items-center"
        >
            <div className="w-[90%] relative min-h-96 bg-white p-3 rounded-xl">
                <button onClick={() => onClose()} className="p-2 absolute top-1 right-1 hover:bg-bg_hover rounded-md">
                    <IoCloseOutline className="w-5 h-5" />
                </button>
                <div className="w-[100%]">
                    <Tabs>
                        <Tab label="chon">
                            <div className="flex flex-wrap h-[70vh] overflow-auto">
                                {images && images.map((v) => <img className="w-48 h-48" key={v.url} src={v.url} alt=""></img>)}
                            </div>
                            <Pagination
                                pageSizelist={[10, 20, 30]}
                                onChange={handlePageChange}
                                page={page}
                                totalPage={totalPage}
                                pageSize={pageSize}
                            />
                        </Tab>
                        <Tab label="them">
                            <ImageUpload onUpload={handleUploadImage} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
}

export default Modal
