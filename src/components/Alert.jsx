import PropTypes from "prop-types"
import { IoCloseOutline } from "react-icons/io5"

const Alert = ({ title = "Warning", content, isVisible, onOk, onClose }) => {
    const handleOk = () => {
        onOk && onOk()
    }

    const handleClose = () => {
        onClose && onClose()
    }

    return isVisible ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg relative">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <button onClick={() => onClose()} className="p-2 absolute top-1 right-1 hover:bg-black/15  bg-bg_hover rounded-md">
                        <IoCloseOutline className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-gray-600">{content}</p>
                <div className="flex justify-end mt-6">
                    <button className="text-red-500 px-4 py-2 mr-2" onClick={handleClose}>
                        Close
                    </button>
                    <button
                        className="p-3 text-sm text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
                        onClick={handleOk}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    ) : null
}

Alert.propTypes = {
    isVisible: PropTypes.bool,
    onOk: PropTypes.func,
    onClose: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.any,
}

export default Alert
