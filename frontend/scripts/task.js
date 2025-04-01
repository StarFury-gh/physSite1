
const elements = {
    teacher: document.getElementById("teacher"),
    theme: document.getElementById("theme"),
    task: document.getElementById("task"),
    num: document.getElementById("num"),
    taskContainer: document.querySelector(".task-container")
};

const getTask = async () => {
    const taskID = sessionStorage.getItem("taskID");
    console.log("Task ID from sessionStorage:", taskID);

    if (!taskID) {
        elements.taskContainer.innerHTML = "<p>Идентификатор задачи не найден.</p>";
        return;
    }

    try {
        const response = await fetch(`/get_task_by_id/${taskID}`);
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers.get("content-type"));

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Проверяем, что ответ — это JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error("Response is not JSON:", text);
            throw new Error("Response is not JSON");
        }

        const data = await response.json();
        console.log("Response from /get_task_by_id:", data);

        if (!data.status) {
            elements.taskContainer.innerHTML = "<p>Задача не найдена.</p>";
            return;
        }

        //порядок распаковки: id, author, text, image, theme
        const [id, author, text, image, theme] = data.task_info;
        console.log("Image for task:", image);
        
        elements.teacher.textContent = `Преподаватель: ${author || 'Не указан'}`;
        elements.theme.textContent = `Тема: ${theme || 'Не указана'}`;
        elements.task.textContent = `Текст: ${text || 'Нет текста'}`;
        elements.num.textContent = `№ ${id || 'Не определён'}`;
        if (image && image.trim()) {
            const imageContainer = document.createElement("div");
            imageContainer.className = "image-container";
            
            const imageHtml = `
                <img 
                    src="/images/${image}" 
                    alt="Task image" 
                    class="task-image" 
                    loading="lazy"
                    style="max-width: 300px; max-height: 300px;"
                    onerror="this.style.display='none'; console.log('Failed to load image: /images/${image}');">
                <button class="view-image-btn">Посмотреть изображение</button>
            `;
            
            imageContainer.innerHTML = imageHtml;
            elements.taskContainer.appendChild(imageContainer);

            imageContainer.querySelector(".view-image-btn")
                .addEventListener("click", () => openModal(`/images/${image}`));
        } else {
            const noImageMsg = document.createElement("p");
            noImageMsg.textContent = "Изображение для этой задачи отсутствует.";
            elements.taskContainer.appendChild(noImageMsg);
            console.log(`No image found for task ID ${taskID}`);
        }
    } catch (error) {
        console.error("Ошибка загрузки задачи:", error);
        elements.taskContainer.innerHTML = "<p>Ошибка загрузки задачи.</p>";
    }
};

const openModal = (() => {
    const modalTemplate = document.createElement("div");
    modalTemplate.className = "modal";
    
    return (imageSrc) => {
        const modal = modalTemplate.cloneNode(true);
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">×</span>
                <img src="${imageSrc}" alt="Full image" loading="lazy" style="max-width: 90%; max-height: 90%;">
            </div>
        `;
        
        document.body.appendChild(modal);

        const closeModal = () => modal.remove();
        
        modal.querySelector(".close-btn").addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    };
})();

window.onload = getTask;