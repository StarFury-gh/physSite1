const URL = "http://127.0.0.1:8000"

console.log(sessionStorage.getItem("taskID"))


//функции для поиска
function findTeacher() {
    const input = document.getElementById('teacher');
    const filter = input.value.toLowerCase();
    const cards = document.getElementById('cardContainer').getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        
        const cardTeacher = cards[i].getElementsByTagName('h3')[0].innerHTML.toLowerCase()
        if (cardTeacher.includes(filter)) {
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = 'none';
        }
    }
}
function findTheme() {

    const input = document.getElementById('theme');
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

const teacherField = document.getElementById('teacher')
const themeField = document.getElementById('theme')
teacherField.addEventListener('keyup', () => findTeacher())
themeField.addEventListener('keyup', () => findTheme())


//для использования чуть ниже (58 строка)
const setTask = (id) => {
    sessionStorage.setItem("taskID", id)
    // console.log(sessionStorage.getItem("taskID"))
}

//ну тут понятно чо она делает
function addCard(data) {

    const cardContainer = document.getElementById('cardContainer')

    const newCard = document.createElement('div')
    newCard.className = 'card';
    newCard.innerHTML = `
    <h2>${data[1]}</h2>
    <h3>${data[0]}</h3>
    <a class='aTag' id='${data[3]}' onclick='setTask(this.id)' href='task.html'>Открыть</a>
    `
    cardContainer.appendChild(newCard)

}


//при загрузке страницы добавляем карточки
window.addEventListener("load", () => {

    fetch(`${URL}/get_tasks`)
    .then(async(response) => await response.json())
    .then((data) => {
        if(data["status"]){

            for(let i = 0; i < data["tasks"].length; i++){

                addCard(data["tasks"][i])

            }

        } else {
            alert("Ошибка. Задания не добавлены.")
        }

    })


})

