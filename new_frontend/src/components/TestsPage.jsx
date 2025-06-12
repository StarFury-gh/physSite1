import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../../constants"
import TestCard from "./TestCard"

export default function TestsPage() {

    const [tests, setTests] = useState([])
    const cards = tests.map((el) => {
        return <TestCard author={el.author} title={el.title} id={el.id} />
    })
    const [testsCards, setTestsCards] = useState(cards)
    const [testId, setTestId] = useState("")

    useEffect(() => {
        axios.get(`${API_URL}/get_tests`)
            .then(r => {
                console.log(r)
                setTests(r.data)
            })
    }, [])

    useEffect(() => {
        const testCard = tests.map((el) => {
            if (String(el.id).includes(testId)) {
                return <TestCard author={el.author} title={el.title} id={el.id} />
            }
            else {
                return
            }
        })
        setTestsCards(testCard)
    }, [testId, tests])

    return (
        <div className="flex flex-col items-center">
            <input className="border-2 border-blue-400 outline-0 px-2 py-1 my-5 rounded-lg" placeholder="Найти тест по ID" type="text" onChange={(e) => setTestId(e.target.value)} />
            <div className="flex flex-col items-center gap-5">
                {testsCards}
            </div>
        </div>
    )
}