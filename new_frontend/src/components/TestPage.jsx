import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../constants"

function TestStep(props) {
    return (
        <div className="bg-white">
            <p>{props.text}</p>
            <input type="text" placeholder="Ответ" />
        </div>
    )
}

export default function TestPage() {

    const [testInfo, setTestInfo] = useState([])
    const [cards, setCards] = useState(null)

    useEffect(() => {
        axios.get(`${API_URL}/get_test_by_id/${sessionStorage.getItem("current_test")}`)
            .then(r => {
                console.log(r.data)
                setTestInfo(r.data)
                const crds = r.data.answers.map((el, ind) => {
                    console.log("el, ind", el, ind)
                    return <TestStep key={ind} text={el} />
                })
                setCards(crds)
            })
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col bg-white border-1 border-gray-300 w-100 px-10 py-3 rounded-xs">
                <h2>Тема: {testInfo.title}</h2>
                <h3>Автор: {testInfo.author}</h3>
            </div>
            {cards}
        </div>
    )
}