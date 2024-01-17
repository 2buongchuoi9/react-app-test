import PropTypes from "prop-types"
import { IoCloseOutline } from "react-icons/io5"
import { Tab, Tabs } from "./Tabs"
import { useEffect, useState } from "react"
import http from "~/utils/httpRequest"
import ImageUpload from "./ImageUpload"
import Pagination from "./Pagination"
import classNames from "classnames"
import Loading from "./Loading"

const cl = classNames.bind()

const ModalImage = ({ isVisible, onClose, onSelectImage }) => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPage, setTotalPage] = useState(0)
    const [selectImage, setSelectImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState(null)

    const fetchApi = async () => {
        const data = await http.get(`/file/image?page=${page}&limit=${pageSize}`)
        const result = data.data
        console.log(result)
        setPage(result.page)
        setTotalPage(result.totalPage)
        setPageSize(result.pageSize)
        setImages(result.content)
    }

    useEffect(() => {
        if (isVisible) {
            setSelectImage(null)
            fetchApi()
        }
    }, [isVisible, page, pageSize])

    if (!isVisible) return null

    const handleClose = (e) => {
        if (e.target.id === "wrapper-modal") {
            setSelectImage(null)
            setPage(1)
            setPageSize(10)
            onClose()
        }
    }
    const handleUploadImage = async (file) => {
        if (!file) {
            alert("file null")
            return
        }
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("file", file)
            await http.post("/file/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            setLoading(false)
            fetchApi()
            alert("upload success")
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }
    const handleDeleteImage = async (image) => {
        if (image) {
            try {
                setLoading(true)
                await http.delete(`/file/image/${image.id}`)
                setLoading(false)
                setSelectImage(null)
                fetchApi()
                alert("delete success")
            } catch (error) {
                alert("delete error")
            }
        }
    }
    const handlePageChange = ({ page, pageSize }) => {
        console.log(page, ":::::::::::::", pageSize)
        setPage(page)
        setPageSize(pageSize)
    }

    return (
        <>
            {loading && <Loading />}
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
                                <div className=" h-[70vh]">
                                    <div className="flex w-[100%] space-x-5">
                                        <div className="px-2 py-4 mx-auto border overflow-auto h-[70vh] w-[80%]">
                                            <ul className="flex justify-center flex-wrap ">
                                                {images &&
                                                    images.map((v) => (
                                                        <li
                                                            key={v.url}
                                                            onClick={() => setSelectImage(v)}
                                                            className={cl("m-3 border-2 rounded-lg overflow-hidden cursor-pointe drop-shadow-md", {
                                                                " border-blue-600 border-2": selectImage === v,
                                                            })}
                                                        >
                                                            <img className="w-40 h-40  object-cover" src={v?.url} alt=""></img>{" "}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                        <div className="bg-slate-200 w-[25%] overflow-auto h-[70vh]">
                                            <div className="p-2">
                                                <div className="w-max mx-auto font-medium text-lg"> chi tiết</div>
                                                <hr className="w-11/12 mx-auto my-2" />
                                                <div className="flex justify-center items-center">
                                                    {selectImage && selectImage?.url && (
                                                        <div className="flex flex-col justify-center items-center">
                                                            <img
                                                                className={cl("w-40 h-40 object-cover border drop-shadow-lg rounded-lg ")}
                                                                src={selectImage?.url}
                                                                alt=""
                                                            />
                                                            <button
                                                                onClick={() => handleDeleteImage(selectImage)}
                                                                className="mt-2 rounded-lg bg-red-500 text-sm font-light hover:bg-opacity-85 text-white  px-3 py-1"
                                                            >
                                                                delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <Pagination
                                        pageSizelist={[10, 20, 30]}
                                        onChange={handlePageChange}
                                        page={page}
                                        totalPage={totalPage}
                                        pageSize={pageSize}
                                    />
                                    <button
                                        onClick={() => {
                                            onSelectImage(selectImage)
                                        }}
                                        className=" rounded-lg bg-btn text-lg font-normal hover:bg-opacity-85 text-white  px-3 py-1"
                                    >
                                        select
                                    </button>
                                </div>
                            </Tab>
                            <Tab label="them">
                                <ImageUpload onUpload={handleUploadImage} />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    )
}

ModalImage.propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
    onSelectImage: PropTypes.func,
}

export default ModalImage
