const URL = "http://127.0.0.1:8000"

const data1 = localStorage.getItem("teacher_page")

//для поиска
function findNecessaryTeacher() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const cards = document.getElementById('cardContainer').getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        const cardText = cards[i].getElementsByTagName('h2')[0].innerText.toLowerCase();
        if (cardText.includes(filter)) {
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        }
    }
}





//для добавления
const inputField = document.getElementById('searchInput')
inputField.addEventListener('keyup', () => findNecessaryTeacher())

function addCard(data) {

    const cardContainer = document.getElementById('cardContainer');

    // const newCard = document.createElement('div');
    // newCard.className = 'card';
    // newCard.innerHTML = `<h2>${data}</h2>
    //                      <a href="teacherPage.html" target="_blank">Профиль</a>`;

    // cardContainer.appendChild(newCard);

    const newCard = document.createElement('div')
    newCard.className = 'card';
    newCard.innerHTML = `
    <h2>${data[1]}</h2>
    <a class='aTag' id='${data[3]}' onclick='setTask(this.id)' href='task.html'>Открыть</a>
    `
    cardContainer.appendChild(newCard)

}





//добавление карточек преподов из бдшки
window.addEventListener("load", () => {

    try{
        fetch(`${URL}/get_teachers`)
        .then(async(response) => await response.json())
        .then((data) => {
            if(data["status"]){

                for(let i = 0; i < data["teachers"].length; i++){

                    addCard(data["teachers"][i])

                }

            } else {
                alert("Ошибка. Преподаватели не добавлены.")
            }

        })
    }
    catch{
        alert("Ошибка сервера.")
    }

})
