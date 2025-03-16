const URL = "http://127.0.0.1:8000"

const id = sessionStorage.getItem("necessaryTeacher")

const setTeacherProfile = () => {
    const id1 = sessionStorage.getItem("necessaryTeacher")

    const usernameProfileH = document.getElementById("username")

    fetch(`${URL}/get_teacher_by_id/${id1}`)
    .then(async(response) => await response.json())
    .then((data) => {
        console.log(data)
        usernameProfileH.innerHTML = data["teacher"]
    })
}
const loadTasks = () => {
    
}

window.addEventListener("load", () => {
    setTeacherProfile()
})