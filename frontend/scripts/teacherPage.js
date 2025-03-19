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

const setTask = (id) => {
    sessionStorage.setItem("taskID", id)
    //console.log(sessionStorage.getItem("taskID"))
}

function addCard(data) {

    const cardContainer = document.getElementById('cardContainer')

    const newCard = document.createElement('div')
    newCard.className = 'card';
    newCard.innerHTML = `
    <h2>${data[1]}</h2>
    <h3>№ ${data[0]}</h3>
    <a class='aTag' id='${data[0]}' onclick='setTask(this.id)' href='task.html'>Открыть</a>
    `
    cardContainer.appendChild(newCard)

}


const loadTasks = () => {

    fetch(`${URL}/get_tasks_by_teacher/${sessionStorage.getItem("necessaryTeacher")}`)
    .then(async(response) => await response.json())
    .then((data) => {
        // console.log(typeof sessionStorage.getItem("necessaryTeacher"))

        console.log(data)
        
        if(data["status"]){

            for(let i = 0; i < data["tasks"].length; i++){

                addCard(data["tasks"][i])

            }

        } else {
            // alert("Ошибка. Задания не добавлены.")
            const messageH = document.getElementById("info")
            messageH.style.display = "block"
            messageH.style.color = "red"
            messageH.innerHTML = "Преподаватель пока не добавил задания."
        }

    })
    
}

function findTheme() {

    const input = document.getElementById('themeField');
    const filter = input.value.toLowerCase();
    const cards = document.getElementById('cardContainer').getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        const cardText = cards[i].getElementsByTagName('h2')[0].innerText.toLowerCase();
        if (cardText.includes(filter)) {
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = 'none';
        }
    }

}

function findTask() {
    const input_task = document.getElementById('taskField');
    const filter_task = input_task.value.toLowerCase();
    const cards = document.getElementById('cardContainer').getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        const cardText = cards[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        if (cardText.includes(filter_task)) {
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

const themeField = document.getElementById('themeField')
themeField.addEventListener('keyup', () => findTheme())
taskField.addEventListener('keyup', () => findTask())

window.addEventListener("load", () => {
    setTeacherProfile()
    loadTasks()
})