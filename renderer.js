document.addEventListener('DOMContentLoaded', async () => {
    const questionsDiv = document.getElementById('questions');
  
    // Fetch questions from the main process
    const questions = await window.api.getQuestions();
    
    questions.forEach(question => {
      const questionElement = document.createElement('div');
      questionElement.textContent = `${question.id}: ${question.question_text}`;
      questionsDiv.appendChild(questionElement);
    });
  });