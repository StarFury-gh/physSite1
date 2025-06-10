import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import TeacherCard from "./TeacherCard";

export default function TeachersPage({compSetter}){
    const [teachersList, setTeachersList] = useState([])
    const cards = teachersList.map((el) => {
            return <TeacherCard id={el[0]} teacherName={el[1]} compSetter={compSetter}/>
        })
    const [teachersCards, setTeachersCard] = useState(cards)
    const [teacherId, setTeacherId] = useState("")

    const handleInputValueChange = (e) => {
        setTeacherId(e.target.value)
    }

    useEffect(()=>{
        axios.get(`${API_URL}/get_teachers`)
        .then(r => {
            setTeachersList(r.data.data)
        })
    },[])

    useEffect(() => {
        const teachersCards = teachersList.map(el => {
            if(String(el[0]).includes(teacherId)){
                return <TeacherCard id={el[0]} teacherName={el[1]} compSetter={compSetter}/>
            } else {
                return
            }
        })
        setTeachersCard(teachersCards)
    }, [compSetter, teacherId, teachersList])

    return(
        <div className="">
            <div className="flex flex-col items-center">
            <input onChange={(e) => {
                handleInputValueChange(e)
            }} className="border-2 border-blue-400 outline-0 px-2 py-1 my-5 rounded-lg w-56" type="text" placeholder="Найти преподавателя по ID" />
            <div className="flex w-full flex-row flex-wrap justify-around">
                {teachersCards}
            </div>
        </div>
        </div>
    )
}