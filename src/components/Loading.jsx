// import PropTypes from "prop-types"

const Loading = () => {
    return (
        <div className={`fixed inset-0 z-50 flex justify-center items-center bg-slate-900/40 backdrop-blur-sm `}>
            <div className="flex items-center space-x-5 z-50">
                <div className="w-24 h-24 border-[10px] border-t-blue-500 border-solid rounded-full animate-spin"></div>
                <p className="text-white text-xl font-semibold">Loading...</p>
            </div>
        </div>
    )
}

// Loading.propTypes = {
//     isLoading: PropTypes.bool,
// }
export default Loading
