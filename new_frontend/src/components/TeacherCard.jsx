export default function TeacherCard(props){
    
    const handleClick = () => {
        props.compSetter("teacher_page")
        sessionStorage.setItem("current_teacher", props.id)
    }
    
    return(
        <div className="bg-white border-1 border-neutral-200 rounded-lg flex flex-col items-center justify-center px-10 py-5 w-80 my-2 mx-5 gap-2">
            <h2 className="text-2xl">{props.teacherName}</h2>
            <h3>ID: {props.id}</h3>
            <button onClick={()=>{
                handleClick()
            }} className="cursor-pointer hover:bg-blue-500 bg-blue-300 transition-colors duration-100 px-3 py-1.5 border-0 rounded-lg">Профиль</button>
        </div>
    )
}