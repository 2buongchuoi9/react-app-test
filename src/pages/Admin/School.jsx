import { useState } from "react"
import Modal from "~/components/Modal"
import Table from "~/components/Table"

const header = ["stt", "name", "phone"]

const data = [
    {
        key: 1,
        stt: 1,
        name: "dung",
        phone: (
            <h1 className="text-red-500" onClick={() => console.log("aosjkdnmasnd")}>
                Hello
            </h1>
        ),
    },
    { key: 2, stt: 2, name: "den", phone: "0936631402" },
    { key: 3, stt: 3, name: "den", phone: "0936631402" },
    { key: 4, stt: 4, name: "den", phone: "0936631402" },
    { key: 5, stt: 5, name: "den", phone: "0936631402" },
]

const School = () => {
    const [show, setShow] = useState(false)
    return (
        <div>
            <Table header={header} data={data} />

            <button className="bg-black" onClick={() => setShow(true)}>
                open
            </button>
            <Modal isVisible={show} onClose={() => setShow(false)}></Modal>
        </div>
    )
}
export default School
