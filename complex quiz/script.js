document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const quizIntro = document.getElementById('quiz-intro');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const startBtn = document.getElementById('start-quiz');
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const submitBtn = document.getElementById('submit-quiz');
    const restartBtn = document.getElementById('restart-quiz');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    const totalQuestionsDisplay = document.getElementById('total-questions');
    const progressBar = document.getElementById('progress-bar');
    const correctAnswersDisplay = document.getElementById('correct-answers');
    const wrongAnswersDisplay = document.getElementById('wrong-answers');
    const percentageDisplay = document.getElementById('percentage');
    const resultDetails = document.getElementById('result-details');
    const themeToggle = document.getElementById('theme-toggle');
    const difficultySelect = document.getElementById('difficulty');

    // Quiz variables
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 30;
    let userAnswers = [];
    let questions = [];
    let filteredQuestions = [];

    // Theme management
    themeToggle.addEventListener('click', toggleTheme);

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Initialize quiz questions
    function initializeQuestions() {
        questions = [
            {
                question: "What does the 'this' keyword refer to in JavaScript?",
                options: [
                    "The function where it's used",
                    "The object that owns the current code",
                    "The global window object",
                    "The parent object of the current object"
                ],
                answer: 1,
                explanation: "In JavaScript, 'this' refers to the object that owns the current code. Its value depends on how a function is called.",
                difficulty: "medium"
            },
            {
                question: "Which of these is NOT a JavaScript framework?",
                options: [
                    "React",
                    "Angular",
                    "Django",
                    "Vue"
                ],
                answer: 2,
                explanation: "Django is a Python web framework, not a JavaScript framework.",
                difficulty: "easy"
            },
            {
                question: "What is the time complexity of a binary search algorithm?",
                options: [
                    "O(1)",
                    "O(n)",
                    "O(log n)",
                    "O(n log n)"
                ],
                answer: 2,
                explanation: "Binary search has a time complexity of O(log n) because it halves the search space with each comparison.",
                difficulty: "hard"
            },
            {
                question: "Which HTML5 tag is used for sidebar content?",
                options: [
                    "<sidebar>",
                    "<side>",
                    "<aside>",
                    "<nav>"
                ],
                answer: 2,
                explanation: "The <aside> tag is used for content that is tangentially related to the content around it, like sidebars.",
                difficulty: "easy"
            },
            {
                question: "What does CSS stand for?",
                options: [
                    "Computer Style Sheets",
                    "Creative Style Sheets",
                    "Cascading Style Sheets",
                    "Colorful Style Sheets"
                ],
                answer: 2,
                explanation: "CSS stands for Cascading Style Sheets, which is used to style HTML documents.",
                difficulty: "easy"
            },
            {
                question: "Which of these is a pure function?",
                options: [
                    "function add(a, b) { return a + b + Math.random(); }",
                    "function add(a, b) { return a + b; }",
                    "function add(a, b) { console.log(a + b); }",
                    "function add(a, b) { return a + b + Date.now(); }"
                ],
                answer: 1,
                explanation: "A pure function always returns the same output for the same input and has no side effects.",
                difficulty: "medium"
            },
            {
                question: "What is the output of 'console.log(1 + '2' + 3)' in JavaScript?",
                options: [
                    "6",
                    "123",
                    "15",
                    "NaN"
                ],
                answer: 1,
                explanation: "JavaScript performs type coercion. The + operator concatenates strings, so 1 + '2' becomes '12', then '12' + 3 becomes '123'.",
                difficulty: "medium"
            },
            {
                question: "Which data structure uses LIFO (Last In First Out) principle?",
                options: [
                    "Queue",
                    "Stack",
                    "Array",
                    "Tree"
                ],
                answer: 1,
                explanation: "Stack uses the LIFO principle where the last element added is the first one to be removed.",
                difficulty: "medium"
            },
            {
                question: "What is the purpose of the 'finally' block in a try-catch statement?",
                options: [
                    "To handle errors that occur in the try block",
                    "To execute code regardless of whether an exception was thrown or caught",
                    "To define code that should run only if no errors occur",
                    "To catch specific types of exceptions"
                ],
                answer: 1,
                explanation: "The 'finally' block executes after the try and catch blocks, regardless of whether an exception was thrown or caught.",
                difficulty: "hard"
            },
            {
                question: "Which of these is NOT a valid HTTP method?",
                options: [
                    "GET",
                    "POST",
                    "FETCH",
                    "PUT"
                ],
                answer: 2,
                explanation: "The standard HTTP methods are GET, POST, PUT, DELETE, HEAD, OPTIONS, etc. FETCH is not an HTTP method.",
                difficulty: "medium"
            },
            {
                question: "What is the output of '3 == '3'' in JavaScript?",
                options: [
                    "true",
                    "false",
                    "undefined",
                    "TypeError"
                ],
                answer: 0,
                explanation: "The == operator performs type coercion, so it converts the string '3' to a number before comparison.",
                difficulty: "easy"
            },
            {
                question: "Which algorithm is used to find the shortest path between nodes in a graph?",
                options: [
                    "Bubble Sort",
                    "Dijkstra's Algorithm",
                    "Binary Search",
                    "Quick Sort"
                ],
                answer: 1,
                explanation: "Dijkstra's algorithm is used to find the shortest paths between nodes in a graph.",
                difficulty: "hard"
            },
            {
                question: "What does the 'SOLID' principle in OOP stand for?",
                options: [
                    "Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion",
                    "Structured, Organized, Logical, Integrated, Designed",
                    "Simple, Optimized, Layered, Isolated, Decoupled",
                    "System, Object, Logic, Interface, Data"
                ],
                answer: 0,
                explanation: "SOLID stands for Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.",
                difficulty: "hard"
            },
            {
                question: "Which of these is NOT a JavaScript primitive data type?",
                options: [
                    "string",
                    "number",
                    "object",
                    "boolean"
                ],
                answer: 2,
                explanation: "JavaScript primitive types are string, number, boolean, null, undefined, symbol, and bigint. Object is a reference type.",
                difficulty: "medium"
            },
            {
                question: "What is the purpose of the 'use strict' directive in JavaScript?",
                options: [
                    "To enable strict mode which catches common coding errors",
                    "To optimize the performance of the code",
                    "To enforce type safety in variables",
                    "To prevent the use of external libraries"
                ],
                answer: 0,
                explanation: "'use strict' enables strict mode which catches common coding errors and prevents the use of potentially problematic features.",
                difficulty: "hard"
            }
        ];

        // Filter questions based on difficulty
        const difficulty = difficultySelect.value;
        if (difficulty === 'all') {
            filteredQuestions = [...questions];
        } else {
            filteredQuestions = questions.filter(q => q.difficulty === difficulty);
        }

        // Shuffle questions
        filteredQuestions = shuffleArray(filteredQuestions);
        
        // Limit to 15 questions max
        filteredQuestions = filteredQuestions.slice(0, 15);
        totalQuestionsDisplay.textContent = filteredQuestions.length;
        userAnswers = new Array(filteredQuestions.length).fill(null);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Start quiz
    startBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        initializeQuestions();
        if (filteredQuestions.length === 0) {
            alert('No questions available for the selected difficulty. Please try another difficulty level.');
            return;
        }
        
        quizIntro.style.display = 'none';
        quizQuestions.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        scoreDisplay.textContent = score;
        
        showQuestion();
        startTimer();
    }

    // Display question
    function showQuestion() {
        if (currentQuestionIndex >= filteredQuestions.length) {
            showResults();
            return;
        }

        const question = filteredQuestions[currentQuestionIndex];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            
            // Highlight selected answer if exists
            if (userAnswers[currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', selectOption);
            optionsContainer.appendChild(optionElement);
        });

        // Update progress bar
        const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Update navigation buttons
        prevBtn.disabled = currentQuestionIndex === 0;
        
        if (currentQuestionIndex === filteredQuestions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    // Select option
    function selectOption(e) {
        const selectedOption = e.target;
        const selectedIndex = parseInt(selectedOption.dataset.index);
        
        // Remove selected class from all options
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        selectedOption.classList.add('selected');
        
        // Save user's answer
        userAnswers[currentQuestionIndex] = selectedIndex;
    }

    // Timer functions
    function startTimer() {
        clearInterval(timer);
        timeLeft = 30;
        timeDisplay.textContent = timeLeft;
        
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                timeUp();
            }
        }, 1000);
    }

    function timeUp() {
        // Mark as unanswered if no answer selected
        if (userAnswers[currentQuestionIndex] === null) {
            userAnswers[currentQuestionIndex] = -1;
        }
        
        // Auto proceed to next question
        nextQuestion();
    }

    // Navigation functions
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
    submitBtn.addEventListener('click', showResults);

    function nextQuestion() {
        clearInterval(timer);
        
        // Calculate score up to this point
        if (currentQuestionIndex < filteredQuestions.length) {
            const currentQuestion = filteredQuestions[currentQuestionIndex];
            if (userAnswers[currentQuestionIndex] === currentQuestion.answer) {
                score++;
                scoreDisplay.textContent = score;
            }
        }
        
        currentQuestionIndex++;
        
        if (currentQuestionIndex < filteredQuestions.length) {
            showQuestion();
            startTimer();
        } else {
            showResults();
        }
    }

    function prevQuestion() {
        clearInterval(timer);
        currentQuestionIndex--;
        showQuestion();
        startTimer();
    }

    // Show results
    function showResults() {
        clearInterval(timer);
        
        // Calculate final score
        let correct = 0;
        let wrong = 0;
        
        filteredQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                correct++;
            } else {
                wrong++;
            }
        });
        
        const percentage = Math.round((correct / filteredQuestions.length) * 100);
        
        // Display results
        correctAnswersDisplay.textContent = correct;
        wrongAnswersDisplay.textContent = wrong;
        percentageDisplay.textContent = `${percentage}%`;
        
        // Show detailed results
        resultDetails.innerHTML = '';
        filteredQuestions.forEach((question, index) => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('question-result');
            
            const isCorrect = userAnswers[index] === question.answer;
            if (isCorrect) {
                resultItem.classList.add('correct');
            } else {
                resultItem.classList.add('wrong');
            }
            
            let userAnswerText = "Unanswered";
            if (userAnswers[index] !== null && userAnswers[index] !== -1) {
                userAnswerText = question.options[userAnswers[index]];
            }
            
            const correctAnswerText = question.options[question.answer];
            
            resultItem.innerHTML = `
                <h3>Question ${index + 1}: ${question.question}</h3>
                <p><strong>Your answer:</strong> ${userAnswerText}</p>
                <p><strong>Correct answer:</strong> ${correctAnswerText}</p>
                <p class="explanation">${question.explanation}</p>
            `;
            
            resultDetails.appendChild(resultItem);
        });
        
        quizQuestions.style.display = 'none';
        quizResults.style.display = 'block';
    }

    // Restart quiz
    restartBtn.addEventListener('click', () => {
        quizResults.style.display = 'none';
        quizIntro.style.display = 'block';
    });
});