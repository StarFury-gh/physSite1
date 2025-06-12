import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../../constants"
import TestCard from "./TestCard"

export default function TestsPage(){

    const [tests, setTests] = useState([])
    const cards = tests.map((el) => {
        return <TestCard author={el.author} title={el.title}/>
    })

    useEffect(() => {
        axios.get(`${API_URL}/get_tests`)
        .then(r => {
            console.log(r)
            setTests(r.data)
        })
    }, [])

    return(
        <h1>Tests page</h1>
    )
}