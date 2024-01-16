import PropTypes from "prop-types"
import { useState, useEffect } from "react"

const CheckComponent = ({ index, onChange, isCheck }) => {
    return (
        <div key={`checkbox-${index}`} className="p-4 w-4">
            <div className="flex items-center">
                <input
                    id={`checkbox-table-${index}`}
                    type="checkbox"
                    checked={isCheck}
                    onChange={() => onChange(index)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor={`checkbox-table-${index}`} className="sr-only">
                    checkbox
                </label>
            </div>
        </div>
    )
}

const Table = ({ header, data }) => {
    const [selectRow, setSelectRow] = useState({})
    const [checkAll, setCheckAll] = useState(false)

    console.log(selectRow)

    useEffect(() => {
        setCheckAll(isAllRowsChecked())
    }, [selectRow])

    const isAllRowsChecked = () => {
        return data.length > 0 && selectRow.length === data.length
    }

    const handleOnChangeSelectRow = (index) => {
        const selectedRowKey = data[index].key.key

        setSelectRow((prev) => {
            const newSelect = { ...prev }

            if (newSelect[selectedRowKey]) {
                delete newSelect[selectedRowKey]
            } else {
                newSelect[selectedRowKey] = true
            }
            return newSelect
        })

        // const selectedRow = data[index]

        // if (selectRow.some((item) => item.key === selectedRow.key)) {
        //     // Hủy chọn nếu đã chọn
        //     setSelectRow(selectRow.filter((item) => item.key !== selectedRow.key))
        // } else {
        //     // Chọn nếu chưa chọn
        //     setSelectRow((prevSelectRow) => [...prevSelectRow, selectedRow])
        // }
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

        // setCheckAll(!checkAll)

        // if (!checkAll) {
        //     // Nếu chưa chọn tất cả, chọn tất cả các hàng
        //     setSelectRow([...data])
        // } else {
        //     // Nếu đã chọn tất cả, hủy chọn tất cả các hàng
        //     setSelectRow([])
        // }
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
                                        id="checkbox-all"
                                        type="checkbox"
                                        checked={checkAll}
                                        onChange={handleCheckAll}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <label htmlFor="checkbox-all" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            {header &&
                                header.map((v, i) => (
                                    <th
                                        key={i}
                                        scope="col"
                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                                    >
                                        {v}
                                    </th>
                                ))}
                            <th scope="col" className="p-4">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data &&
                            data.map((item, index) => (
                                <tr key={index} onClick={item.onClick} className={item.className}>
                                    <td>
                                        <CheckComponent
                                            index={index}
                                            onChange={handleOnChangeSelectRow}
                                            isCheck={selectRow[item.key] || false}
                                            // isCheck={selectRow.some((selected) => selected.key === item.key)}
                                        />
                                    </td>
                                    {Object.entries(item).map(([key, value], i) => {
                                        return key !== "key" ? <td key={i}>{value}</td> : null
                                    })}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

Table.propTypes = {
    header: PropTypes.array,
    data: PropTypes.array,
}

CheckComponent.propTypes = {
    index: PropTypes.number,
    onChange: PropTypes.func,
    isCheck: PropTypes.bool,
}

export default Table
