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

const setTeacher = (id) => {
    sessionStorage.setItem("necessaryTeacher", id)
}

function addCard(id, name) {

    const cardContainer = document.getElementById('cardContainer');

    // const newCard = document.createElement('div');
    // newCard.className = 'card';
    // newCard.innerHTML = `<h2>${data}</h2>
    //                      <a href="teacherPage.html" target="_blank">Профиль</a>`;

    // cardContainer.appendChild(newCard);

    const newCard = document.createElement('div')
    newCard.className = 'card';
    newCard.innerHTML = `
    <h2>${name}</h2>
    <a class='aTag' id='${id}' onclick='setTeacher(this.id)' href='teacherPage.html'>Открыть</a>
    `
    cardContainer.appendChild(newCard)

}





//добавление карточек преподов из бдшки
window.addEventListener("load", () => {

    try{
        fetch(`/api/get_teachers`)
        .then(async(response) => await response.json())
        .then((data) => {
            console.log(data)
            if(data["status"]){
                for(let i = 0; i < data["data"].length; i++){
                    //id name
                    // console.log(data["data"][i][0])
                    // console.log("--------------------------------")
                    // console.log(data["data"][i][1])
                    addCard(data["data"][i][0], data["data"][i][1])
                }
            }
            else{
                alert("Ошибка загрузки профилей.")
            }
        })
    }
    catch{
        alert("Ошибка сервера.")
    }

})
