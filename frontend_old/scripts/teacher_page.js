const URL = "http://127.0.0.1:8000"

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

const inputField = document.getElementById('searchInput')
inputField.addEventListener('keyup', () => findNecessaryTeacher())

function addCard(name) {

    const cardContainer = document.getElementById('cardContainer');

    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.innerHTML = `<h2>${name}</h2>
                         <a href="${name}" target="_blank">Профиль</a>`;

    cardContainer.appendChild(newCard);

}

window.addEventListener("load", () => {

    try{
        fetch(`${URL}/get_teachers`)
        .then(async(response) => await response.json())
        .then((data) => {
            console.log(data)
            if(data["status"]){

                for(let i = 0; i < data["teachers"].length; i++){
                    console.log(`${data["teachers"]}\tI=${i}`)

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
