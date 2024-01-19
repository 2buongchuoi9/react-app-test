import PropTypes from "prop-types"
import { useState, useEffect } from "react"

const CheckComponent = ({ index, onChange, isCheck }) => {
    return (
        <div key={`checkbox-${index}`} className="p-4 w-4">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={isCheck}
                    onChange={() => onChange(index)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
            </div>
        </div>
    )
}

const Table = ({ header, data, onEdit, onDelete, setSelectedRow: _setSelectRow }) => {
    const [selectRow, setSelectRow] = useState({})
    const [checkAll, setCheckAll] = useState(false)

    // const renderCell = (key, value, record) => {}

    useEffect(() => {
        setCheckAll(isAllRowsChecked())
        // send the selectedRow to parent component
        _setSelectRow && _setSelectRow(selectRow)
    }, [selectRow])

    const isAllRowsChecked = () => {
        return data.length > 0 && Object.keys(selectRow).length === data.length
    }

    const handleOnChangeSelectRow = (index) => {
        const key = data[index].key

        setSelectRow((prev) => {
            const newSelect = { ...prev }

            if (newSelect[key]) {
                delete newSelect[key]
            } else {
                newSelect[key] = true
            }
            return newSelect
        })
    }

    const handleCheckAll = () => {
        setCheckAll(!checkAll)

        if (!checkAll) {
            const newSelect = {}
            data.map((v) => {
                newSelect[v.key] = true
            })
            setSelectRow(newSelect)
        } else {
            setSelectRow({})
        }
    }

    return (
        <>
            <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-gray-100">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={checkAll}
                                        onChange={handleCheckAll}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                </div>
                            </th>
                            {header &&
                                header.map((v, i) => (
                                    <th
                                        key={i}
                                        scope="col"
                                        className="py-2 px-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                                    >
                                        {v.title}
                                    </th>
                                ))}
                            <th scope="col" className="py-2 px-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                <span className="">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data &&
                            data.map((item, rowIndex) => {
                                const row = [
                                    <td key="checkbox">
                                        <CheckComponent index={rowIndex} onChange={handleOnChangeSelectRow} isCheck={selectRow[item.key] || false} />
                                    </td>,
                                ]

                                header &&
                                    header.forEach((column, colIndex) => {
                                        const cellValue = item[column.dataIndex]
                                        const cellContent = column.render ? column.render(cellValue, item) : cellValue

                                        row.push(
                                            <td key={colIndex} className="py-2 px-3 text-xs font-medium text-left text-gray-700">
                                                {cellContent}
                                            </td>
                                        )
                                    })

                                {
                                    row.push(
                                        <td key="edit" className="space-x-1">
                                            <button
                                                onClick={() => onDelete(item)}
                                                className="p-2 text-sm text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
                                            >
                                                delete
                                            </button>
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="p-2 text-sm text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
                                            >
                                                edit
                                            </button>
                                        </td>
                                    )
                                }

                                return (
                                    <tr key={rowIndex} onClick={item.onClick} className={item.className}>
                                        {row}
                                    </tr>
                                )
                            })}

                        {/* {data &&
                            data.map((item, index) => (
                                <tr key={index} onClick={item.onClick} className={item.className}>
                                    <td>
                                        <CheckComponent index={index} onChange={handleOnChangeSelectRow} isCheck={selectRow[item.key] || false} />
                                    </td>
                                    {Object.entries(item).map(([key, value], i) => {
                                        return key !== "key" ? <td key={i}>{value}</td> : null
                                    })}
                                </tr>
                            ))} */}
                    </tbody>
                </table>
            </div>
        </>
    )
}

Table.propTypes = {
    header: PropTypes.arrayOf(
        PropTypes.shape({
            dataIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            title: PropTypes.string.isRequired,
            render: PropTypes.func,
        })
    ),
    data: PropTypes.array,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    setSelectedRow: PropTypes.func,
}

CheckComponent.propTypes = {
    index: PropTypes.number,
    onChange: PropTypes.func,
    isCheck: PropTypes.bool,
}

export default Table
