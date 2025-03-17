function checkAnswers(correctAnswers) {
    const userAnswerA = document.getElementById("answerA").value.trim();
    const userAnswerB = document.getElementById("answerB").value.trim();
    const userAnswerC = document.getElementById("answerC").value.trim();

    let correctCount = 0;
    if (userAnswerA === correctAnswers.A) correctCount++;
    if (userAnswerB === correctAnswers.B) correctCount++;
    if (userAnswerC === correctAnswers.C) correctCount++;

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Правильных ответов: ${correctCount} из 3`;

    showCorrectAnswer("correctAnswerA", correctAnswers.A);
    showCorrectAnswer("correctAnswerB", correctAnswers.B);
    showCorrectAnswer("correctAnswerC", correctAnswers.C);

    highlightAnswers(userAnswerA, correctAnswers.A, "answerA");
    highlightAnswers(userAnswerB, correctAnswers.B, "answerB");
    highlightAnswers(userAnswerC, correctAnswers.C, "answerC");

    document.getElementById("backButton").style.display = "block";
}

function highlightAnswers(userAnswer, correctAnswer, elementId) {
    const inputElement = document.getElementById(elementId);
    if (userAnswer === correctAnswer) {
        inputElement.style.border = "2px solid green";
    } else {
        inputElement.style.border = "2px solid red";
    }
}

function showCorrectAnswer(elementId, correctAnswer) {
    const correctAnswerElement = document.getElementById(elementId);
    correctAnswerElement.textContent = `Правильный ответ: ${correctAnswer}`;
    correctAnswerElement.style.display = "block";
}