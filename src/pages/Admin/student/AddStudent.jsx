import { useEffect, useState } from "react"
import Loading from "~/components/Loading"
import ModalImage from "~/components/ModalImage"
import { StatusStudent } from "~/utils/constan"
import http from "~/utils/httpRequest"

import PropTypes from "prop-types"
import { useParams } from "react-router-dom"
// import Alert from "~/components/Alert"

const AddStudent = ({ isAdd = true }) => {
    // const [curentStudent, setCurrentStudent] = useState()

    const [std, setStd] = useState({})

    const [clazzs, setClazzs] = useState([])

    const [showImage, setShowImage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { id } = useParams()
    // console.log("id", id)

    console.log(std)

    useEffect(() => {
        const fetchOrther = async () => {
            const dataClazz = await http.get("/class?limit=1000&page=1")
            setClazzs(dataClazz.data.content)
            if (!isAdd && id) {
                let data
                try {
                    data = await http.get(`/student/${id}`)
                } catch (error) {
                    alert(error.response.data.message)
                }
                setStd(data.data)
            }
        }
        fetchOrther()
    }, [isAdd, id])

    const handleSelectImage = (img) => {
        // setImage(img.url)
        setStd((prev) => ({ ...prev, image: img.url }))
        setShowImage(false)
    }
    const handleOnSubmit = async () => {
        // validate

        console.log(std)

        console.log("id::::", id)

        try {
            // setIsLoading(true)
            isAdd ? await http.post("/student", std) : await http.post(`/student/${id}`, std)
            alert((isAdd ? "add" : "update") + " is success")
        } catch (error) {
            console.log(error)
            alert(error?.response?.data?.message || "err")
        }
        setIsLoading(false)
        console.log("submit", std)
    }

    return (
        <div>
            {isLoading && <Loading />}
            <ModalImage isVisible={showImage} onClose={() => setShowImage(false)} onSelectImage={handleSelectImage}></ModalImage>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-600">{isAdd ? "Add sudent" : "Update student"}</h2>
                        <p className="text-gray-500 mb-6"></p>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600 space-y-2">
                                    <p className="font-medium text-lg">Student Details</p>
                                    <div className="min-h-40 w-40 rounded-lg overflow-hidden">
                                        {std?.image && <img src={std.image} alt="" className="w-40 h-40 object-cover" />}
                                    </div>
                                    <button
                                        onClick={() => setShowImage(true)}
                                        className="p-1 text-sm my-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
                                    >
                                        add image
                                    </button>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-3">
                                            <label>Name</label>
                                            <input
                                                onChange={(e) => setStd((prev) => ({ ...prev, name: e.target.value }))}
                                                value={std?.name}
                                                type="text"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label>Code</label>
                                            <input
                                                disabled
                                                type="text"
                                                name="full_name"
                                                id="full_name"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={std?.code}
                                            />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label>Email</label>
                                            <input
                                                onChange={(e) => setStd((prev) => ({ ...prev, email: e.target.value }))}
                                                value={std?.email}
                                                type="text"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="email@domain.com"
                                            />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label>Address</label>
                                            <input
                                                onChange={(e) => setStd((prev) => ({ ...prev, address: e.target.value }))}
                                                value={std?.address}
                                                type="text"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label>Class</label>
                                            <select
                                                onChange={(e) => setStd((prev) => ({ ...prev, clazzId: Number(e.target.value) }))}
                                                value={std?.clazzId}
                                                className="w-full h-10 border mt-1 rounded px-4 bg-gray-50 "
                                            >
                                                {clazzs && clazzs.map((v) => <option key={v.id} value={v.id}>{`${v.code} (${v.id})`}</option>)}
                                            </select>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label>birthday</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    onChange={(e) => setStd((prev) => ({ ...prev, birthday: e.target.value }))}
                                                    value={std?.birthday}
                                                    type="text"
                                                    placeholder="Birthday"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label>phone</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    type="text"
                                                    onChange={(e) => setStd((prev) => ({ ...prev, phone: e.target.value }))}
                                                    value={std?.phone}
                                                    placeholder="phone"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label>Status</label>
                                            <select
                                                onChange={(e) => setStd((prev) => ({ ...prev, status: e.target.value }))}
                                                value={std?.status}
                                                className="w-full h-10 border mt-1 rounded px-4 bg-gray-50 "
                                            >
                                                {Object.keys(StatusStudent).map((k) => (
                                                    <option key={StatusStudent[k]} value={StatusStudent[k]}>{`${k.toLowerCase()}`}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="md:col-span-5">
                                            <div className="inline-flex items-center">
                                                <input type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                                                <label className="ml-2">My billing address is different than above.</label>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label>How many soda pops?</label>
                                            <div className="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <button className="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                                                    svg
                                                </button>
                                                <input
                                                    name="soda"
                                                    id="soda"
                                                    placeholder="0"
                                                    className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                    value="0"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    onClick={handleOnSubmit}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

AddStudent.propTypes = {
    isAdd: PropTypes.bool,
}

export default AddStudent
