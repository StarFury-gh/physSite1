const URL = "http://127.0.0.1:8000"

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
});

const addTask = () => {
    const taskText = document.getElementById("task-text-input").value
    const taskTheme = document.getElementById("task-theme-input").value
    const teacher = sessionStorage.getItem("current_user")
    if(!!taskText && !!taskTheme && !!teacher){

        try{
            fetch(`${URL}/add_task`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "theme": taskTheme,
                    "teacher": teacher,
                    "task_text": taskText
                })
            })
            .then(async (response) => await response.json())
            .then((data) => {
                if (data["status"]) {
                    messageH.style.display = "block"
                    messageH.style.color = "green"
                    messageH.innerHTML = "Задание добавлено."
                }
            })
    
        }
        catch{
            const messageH = document.getElementById("messageH")
            messageH.style.display = "block"
            messageH.style.color = "red"
            messageH.innerHTML = "Ошибка добавления."
        }
    } else {
        const messageH = document.getElementById("messageH")
        messageH.style.display = "block"
        messageH.style.color = "red"
        messageH.innerHTML = "Ошибка добавления."
    }

}