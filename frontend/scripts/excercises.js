const URL = "http://127.0.0.1:8000"

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

function addCard(data) {

    const cardContainer = document.getElementById('cardContainer');

    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.innerHTML = `<h2>${data[1]}</h2>
    <h3>${data[0]}</h3>
    <a>Открыть</a>`;

    cardContainer.appendChild(newCard);

}

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
