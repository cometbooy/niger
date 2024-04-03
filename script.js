let question_field = document.querySelector(".question")
let answer_button = document.querySelectorAll(".answer")
let start_btn = document.querySelector(".start-btn")
let start_page = document.querySelector(".start-page")
let main_page = document.querySelector(".main-page")
let result_field = document.querySelector(".result")
let math_btn = document.querySelector(".math-quiz")
let phisic_btn = document.querySelector(".phisic-quiz")
let signs = ['-', '+', '*', '/' ]
let isCookies = false
let max_points
let subject = 'math'
let quiz_time = 25
let points = 0
let total_count = 0

math_btn.addEventListener("click", function(){
    subject = 'math'
    question_field.style.fontSize = "6em"
    quiz_time = 30
    math_btn.style.background = "#CC6600"
    phisic_btn.style.background = "#FF9933"
    
    console.log(subject)
})
phisic_btn.addEventListener("click", function(){
    subject = 'phisic'
    question_field.style.fontSize = "1em"
    quiz_time = 60*10
    phisic_btn.style.background = "#CC6600"
    math_btn.style.background = "#FF9933"

    console.log(subject)
})


let cookies = document.cookie.split(";")
for (let i = 0; i<cookies.length; i+=1){
    let name_value = cookies[i].split("=")
    if (name_value[0].includes("max-points")){
        isCookies = true
        max_points = name_value[1]
        result_field.innerHTML = `Ваш попередній результат: ${max_points}`
    }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { 
      
    randomIndex = Math.floor(Math.random() * currentIndex); 
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function randint(min, max){
    return Math.round(Math.random() * (max-min) + min)
}

function getRandomSign(){
    return signs[randint(0,3)]
}

class Phisics{
    constructor(question, correct_answer, answer1, answer2, answer3,  ){
        this.question = question
        this.answers = [
            correct_answer,
            answer1,
            answer2,
            answer3,
            
        ]

        this.correct = correct_answer
        shuffle(this.answers)

    }
    display(){
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i+=1){
            answer_button[i].innerHTML = this.answers[i]
        }
    }
}

phisic_question = [
    new Phisics('У водi, температура якої стала, спливає бульбашка повiтря. Вкажiть правильне твердження.', 
    "Виштовхувальна сила, що дiє на бульбашку, зростає",
    "Кiлькiсть речовини повiтря в бульбашцi зменшується.",
    "Тиск пари в бульбашцi зростає",
    "Об'ем бульбашки зменшується."),
    new Phisics('Пiд час iзохорного процесу тиск газу збiльшився удвiчi. Як змiнилася  концентрацiя  молекул газу?', 
    "Не змiнилася",
    "Зменшилася удвiчi",
    "Зросла в 4 рази",
    "Зросла удвiчi"),
    new Phisics("Який процес вiдбувається при накачуваннi повiтря у камеру автомобiльноrо колеса?",
    "Ізотермічний",
    "Ізохорний",
    "Жоден з вищезазначених",
    "Ізобарний"),
    new Phisics("За якої умови на дотик метал і дерево здаються однаково теплими?",
    "Якщо температури руки, металу і дерева однакові",
    "Якщо температури металу і дерева однакові",
    "Якщо температура металу більша за температуру руки людини",
    "Якщо температура металу менша за температуру дерева"),
    new Phisics("Основне рівняння МКТ ідеального газу встановлює зв'язок між ...",
    "середньою квадратичною швидкістю, концентрацією молекул газу та тиском газу",
    "об'ємом та кількістю молекул газу",
    "концентрацією молекул і температурою газу",
    "об'ємом, температурою та тиском газу")

]

shuffle(phisic_question)

class Question{
    constructor(){
        let a = randint(1, 50)
        let b = randint(1, 50)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == "+"){
            this.correct = a+b
        } 
        else if(sign == "-"){
            this.correct = a-b
        } 
        else if(sign == "*"){
            this.correct = a*b
        } 
        else if(sign == "/"){
            let answer = a/b * 100
            this.correct = Math.round(answer) /100
        }

        this.answers = [
            this.correct,
            randint(this.correct-11, this.correct+7),
            randint(this.correct-5, this.correct+21),
            randint(this.correct-14, this.correct+4),
        ]
        shuffle(this.answers)
        console.log(this.question)
        console.log(this.correct)
        console.log(this.answers)
    }
    display(){
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i+=1){
            answer_button[i].innerHTML = this.answers[i]
        }
    }
}

let current_question = new Question()




function displayResult(){
    start_page.style.display = "flex"
    main_page.style.display = "none"
    let accuracy = Math.round(points*100/total_count)
    result_field.innerHTML = `Ви дали ${points} правильних відповідей з ${total_count}.
    Точність: ${accuracy}%`
    document.cookie = `max-points = ${points}; max-age = ${60*60*24*365}`
}

function newQuestion(){
    if (subject == 'math'){
        current_question = new Question()   
    } else if (subject == "phisic"){
        if (phisic_question.length>0){
        current_question = phisic_question.shift()
        } else {
            displayResult()
        }


    }

}

start_btn.addEventListener("click", function(){
    start_page.style.display = "none"
    main_page.style.display = "flex"
    newQuestion()
    current_question.display()
    setTimeout(displayResult, quiz_time * 1000)
    points = 0
    total_count = 0
})


for (let i = 0; i< answer_button.length; i+=1){
    answer_button[i].addEventListener("click", function(){
        total_count += 1
        console.log(total_count)
        if (answer_button[i].innerHTML == current_question.correct){

            points += 1
            console.log(points)
            answer_button[i].style.background = "rgb(0, 255, 0)"
            
            anime({
                targets: answer_button[i],
                background: "#FF9933",
                delay: 100, 
                duration: 500,
                easing: "linear"
            }).finished.then(function(){
                newQuestion()
                current_question.display()
            })
        
            console.log("Правильно")
            
        } else{

             answer_button[i].style.background = "rgb(255, 0, 0)"
            
            anime({
                targets: answer_button[i],
                background: "#FF9933",
                delay: 100, 
                duration: 500,
                easing: "linear"
            }).finished.then(function(){
                newQuestion()
                current_question.display()
            })
            console.log("Неправильно")
        }
    })
}