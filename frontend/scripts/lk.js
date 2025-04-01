const login = document.getElementById("user-login");
const current_login = sessionStorage.getItem("current_user");
login.innerHTML = current_login;

const logout = () => {
    sessionStorage.setItem("current_user", "");
    window.location.href = "./index.html";
};

const fetchTasks = async () => {
    try {
        const response = await fetch("/get_tasks");
        const data = await response.json();
        if (data.status) {
            const tasks = data.tasks;
            const container = document.querySelector(".cont");
            container.innerHTML = "<h2>Загруженные задания</h2>";
            tasks.forEach(task => {
                const [author, theme, text, id, image] = task;
                console.log(`Task ID: ${id}, Image: ${image}`);
                const taskElement = document.createElement("div");
                taskElement.classList.add("task-item");
                let imageHtml = image ? `<img src="/images/${image}" alt="Task image" onerror="this.style.display='none'">` : '';
                taskElement.innerHTML = `
                    <p><strong>ID:</strong> ${id}</p>
                    <p><strong>Автор:</strong> ${author}</p>
                    <p><strong>Тема:</strong> ${theme}</p>
                    <p><strong>Текст:</strong> ${text}</p>
                    ${imageHtml}
                    <button class="view-task-btn" onclick="viewTask(${id})">Посмотреть задачу</button>
                    <button class="delete-btn" onclick="deleteTask(${id})">Удалить</button>
                    <hr>
                `;
                container.appendChild(taskElement);
            });
        } else {
            document.querySelector(".cont").innerHTML = "<p>Заданий пока нет.</p>";
        }
    } catch (error) {
        console.error("Ошибка запроса:", error);
        document.querySelector(".cont").innerHTML = "<p>Ошибка загрузки заданий.</p>";
    }
};

//Переход на task.html
const viewTask = (taskId) => {
    sessionStorage.setItem("taskID", taskId);
    window.location.href = "./task.html";
};

const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`/delete_task/${taskId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            fetchTasks();
        } else {
            const errorText = await response.text();
            alert(`Не удалось удалить: ${errorText}`);
        }
    } catch (error) {
        alert("Ошибка сервера при удалении");
    }
};

const uploadImage = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("image-input");
    const file = fileInput.files[0];
    if (!file) {
        alert("Выберите файл!");
        return;
    }

    const taskId = prompt("Введите ID задачи для привязки изображения:");
    if (!taskId || isNaN(taskId)) {
        alert("Введите корректный ID задачи!");
        return;
    }

    console.log("Uploading image for task ID:", taskId);

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`/upload?taskId=${taskId}`, {
            method: "POST",
            body: formData
        });
        if (response.ok) {
            const result = await response.json();
            if (result.status) {
                console.log("Загруженный файл:", result.filename);
                alert(`Изображение загружено: ${result.filename}`);
                const updateResponse = await fetch(`/update_task_image/${taskId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: result.filename })
                });
                if (updateResponse.ok) {
                    console.log(`Image updated for task ${taskId}`);
                } else {
                    console.error("Failed to update image:", await updateResponse.text());
                }
                fetchTasks();
            } else {
                alert("Ошибка загрузки: " + result.info);
            }
        } else {
            const errorText = await response.text();
            alert(`Ошибка сервера: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error("Ошибка загрузки:", error);
        alert("Ошибка сервера при загрузке");
    }
};

window.onload = fetchTasks;