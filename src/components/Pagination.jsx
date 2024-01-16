import classNames from "classnames"
import PropTypes from "prop-types"

const cl = classNames.bind()

const Pagination = ({ page, totalPage, onChange, pageSizelist, pageSize }) => {
    const prev = () => {
        if (page > 1) {
            onChange({ page: page - 1, pageSize })
        }
    }

    const next = () => {
        if (page < totalPage) {
            onChange({ page: page + 1, pageSize })
        }
    }

    const handlePageSizeChange = (event) => {
        const newPageSize = parseInt(event.target.value)
        onChange({ page: 1, pageSize: newPageSize })
    }

    const range = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    }

    return (
        <div className={`flex items-center justify-start space-x-5`}>
            <div className="flex items-center justify-start space-x-2">
                <div className="bg-white p-4 flex items-center flex-wrap">
                    <ul className="inline-flex">
                        <li>
                            <button className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-r-0 border-green-600 rounded-l-lg focus:shadow-outline hover:bg-green-100">
                                Prev
                            </button>
                        </li>
                        {range(1, totalPage).map((pageNumber) => (
                            <li key={pageNumber}>
                                <button className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-r-0 border-green-600 focus:shadow-outline">
                                    {pageNumber}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-green-600 rounded-r-lg focus:shadow-outline hover:bg-green-100">
                                Next
                            </button>
                        </li>
                    </ul>
                </div>

                <button className="flex items-center " onClick={prev} disabled={page === 1}>
                    Previous
                </button>
                {range(1, totalPage).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => onChange({ page: pageNumber, pageSize })}
                        disabled={pageNumber === page}
                        className={cl(" bg-slate-500 py-1 px-2 rounded-md", { "bg-red-600": page === pageNumber })}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button className="flex items-center" onClick={next} disabled={page === totalPage}>
                    Next
                </button>
            </div>

            <div className="relative h-10 w-72 min-w-10">
                <select
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                >
                    {pageSizelist && pageSizelist.map((v) => <option key={v} value={v}>{`${v} element`}</option>)}
                </select>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    page size
                </label>
            </div>
        </div>
    )
}

Pagination.propTypes = {
    page: PropTypes.number,
    totalPage: PropTypes.number,
    onChange: PropTypes.func,
    pageSizelist: PropTypes.array,
    pageSize: PropTypes.number,
}

// Pagination.defaultProps = {
//     pageSizelist: [10, 30, 50],
//     pageSize: 10,
//     page: 1,
// }

export default Pagination
