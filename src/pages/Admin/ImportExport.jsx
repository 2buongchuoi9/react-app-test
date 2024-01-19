import { useState } from "react"
import Loading from "~/components/Loading"
import http from "~/utils/httpRequest"

const FileUploaderDownloader = () => {
    const [load, setLoad] = useState(false)
    const [file, setFile] = useState(null)
    const [resultFile, setResultFile] = useState(null)

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
    }

    const handleUpload = async () => {
        try {
            setLoad(true)
            const formData = new FormData()
            formData.append("file", file)

            // Gửi file lên server và nhận file kết quả
            const response = await http.post("/file/upload-excel", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                responseType: "blob",
            })

            // Lưu trữ file kết quả để tải xuống sau này
            setResultFile(response.data)
        } catch (error) {
            console.error("Error uploading file:", error)
        }
        setLoad(false)
    }

    const handleDownloadResult = () => {
        // Kiểm tra xem đã có file kết quả hay chưa
        if (resultFile) {
            // Tạo URL cho file kết quả
            const resultFileURL = window.URL.createObjectURL(new Blob([resultFile]))

            // Tạo một link ẩn để tải xuống file kết quả
            const downloadLink = document.createElement("a")
            downloadLink.href = resultFileURL
            downloadLink.download = "resultFile.xlsx"
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
        } else {
            console.error("No result file available for download.")
        }
    }

    const handleExportAllStudentData = async () => {
        const data = await http.post("/file/export-excel", "", {
            responseType: "blob",
        })

        console.log(data)

        const resultFileURL = window.URL.createObjectURL(new Blob([data.data]))

        // Tạo một link ẩn để tải xuống file kết quả
        const downloadLink = document.createElement("a")
        downloadLink.href = resultFileURL
        downloadLink.download = "allData.xlsx"
        downloadLink.setAttribute("download", "allData.xlsx")
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    return (
        <div className="space-y-5">
            <div className="space-x-5">
                {load && <Loading />}
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                <button
                    className="p-3 text-sm text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
                    onClick={handleUpload}
                >
                    Upload File excel
                </button>
                <button
                    className="p-3 text-sm text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
                    onClick={handleDownloadResult}
                    disabled={!resultFile}
                >
                    Download Result File
                </button>
            </div>
            <button
                className="p-3 text-sm text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
                onClick={handleExportAllStudentData}
            >
                export all data student
            </button>
        </div>
    )
}

export default FileUploaderDownloader
