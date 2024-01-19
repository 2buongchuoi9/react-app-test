import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { StatusStudent } from "~/utils/constan"
import http from "~/utils/httpRequest"

const ModalEditMany = ({ isVisible, onClose, onSubmit }) => {
    const [newStatus, setNewStatus] = useState("")
    const [newClazzId, setNewClazzId] = useState("")
    const [clazzs, setClazzs] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const a = await http.get("/class?limit=1000&page=1")
            setClazzs(a.data.content)
        }
        if (isVisible) fetchApi()
    }, [isVisible])

    if (!isVisible) return null

    const handleClose = (e) => {
        if (e.target.id === "wrapper-modal-action") {
            onClose()
        }
    }
    const handleOnSubmit = () => {
        onSubmit({ status: newStatus, clazzId: newClazzId })
    }

    return (
        <div>
            <div
                id="wrapper-modal-action"
                onClick={handleClose}
                className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-0 flex justify-center items-center"
            >
                <div className="w-[40%] relative min-h-96 bg-white p-3 rounded-xl">
                    <button onClick={() => onClose()} className="p-2 absolute top-1 right-1 hover:bg-bg_hover rounded-md">
                        <IoCloseOutline className="w-5 h-5" />
                    </button>
                    <div className="flex justify-center items-center mb-5">
                        <h3 className="text-xl font-semibold">Action update many student</h3>
                    </div>
                    <div className="px-4 py-5 space-y-5">
                        <div className="flex  justify-around items-center ps-4 space-x-5">
                            <div>
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Change status :
                                </label>
                            </div>
                            <div className="relative h-10 w-96 min-w-10">
                                <select
                                    onChange={(e) => setNewClazzId(e.target.value)}
                                    value={newClazzId}
                                    className="peer h-full w-full rounded-[7px] border bg-white border-blue-gray-200 border-t-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                >
                                    <option value="">select with school</option>
                                    {clazzs && clazzs.map((v) => <option key={v.id} value={v.id}>{`${v.code} (${v.id})`}</option>)}
                                </select>
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium text-sm leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Class
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-around items-center ps-4 space-x-5">
                            <div>
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Change class :
                                </label>
                            </div>
                            <div className="relative h-10 w-96 min-w-10">
                                <select
                                    name="school"
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    value={newStatus}
                                    className="peer h-full w-full rounded-[7px] border bg-white border-blue-gray-200 border-t-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                >
                                    <option value="">select with status</option>
                                    {Object.keys(StatusStudent).map((k) => (
                                        <option key={StatusStudent[k]} value={StatusStudent[k]}>{`${k.toLowerCase()} (${StatusStudent[k]})`}</option>
                                    ))}
                                </select>
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-medium text-sm leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Status
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 absolute bottom-1 right-1 space-x-5 ">
                        <button className="p-3 text-sm text-blue-100 transition-colors duration-150 bg-red-500 rounded-lg focus:shadow-outline hover:bg-red-700">
                            Delete All
                        </button>
                        <button
                            onClick={handleOnSubmit}
                            className="p-3 text-sm text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
                        >
                            Update All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalEditMany.propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
}
export default ModalEditMany
