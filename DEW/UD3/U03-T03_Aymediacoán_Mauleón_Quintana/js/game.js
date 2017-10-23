/**
 *  Ahora caigo
 */
// var resetButton = document.getElementById('reset');
// var nextButton = document.getElementById('next');
// var checkButton = document.getElementById('check');
// resetButton.addEventListener('click', deleteLocalStorage);
// nextButton.addEventListener('click', ahoraCaigo);
// checkButton.addEventListener('click', check);

function questions() {
    return {
        1: {
            ques: "Archipiélago conocido como 'Las afortunadas'.",
            ans: "ISLAS CANARIAS",
            showAns: "I**AS **N*R*AS"
        },
        2: {
            ques: "¿Cómo se llama el satélite de planeta Tierra?",
            ans: "LUNA",
            showAns: "L**A"
        },
        3: {
            ques: "¿Cuál es la capital de Arizona?",
            ans: "PHOENIX",
            showAns: "P**E**X"
        },
        4: {
            ques: "Personajes que han salido en todas las pelicula de Star Wars:",
            ans: "R2-D2 y C-3PO",
            showAns: "R*-D* y C-**O"
        },
        5: {
            ques: "¿De qué color es el caballo blanco de Santiago?",
            ans: "BLANCO",
            showAns: "B**N*O"
        },
        6: {
            ques: "¿Cómo se llama el mejor de amigo de John Snow?",
            ans: "SAMWELL TARLY",
            showAns: "S**W**L T*RL*"
        },
        7: {
            ques: "¿En qué año se firmó la declaración de independencia de EEUU?",
            ans: "1776",
            showAns: "1**6"
        }
    };
}

function ahoraCaigo() {
    var question = new questions();
    var l = question;
    var rnd = () => { return Math.floor(Math.random() * (7 - 1 + 1)) + 1; }
    var random = rnd().toString();
    var pQues = document.getElementById('question');
    var inputAns = document.getElementById('answer');
    pQues.innerHTML = question[random].ques;
    inputAns.value = question[random].showAns;
}

function check() {
    var question = new questions();
    var curDate = new Date();
    var correct = "Respuesta correcta";
    var userQuestion = document.getElementById('question').innerHTML;
    var userAnswer = document.getElementById('answer').value.toUpperCase();
    var clave = 'answer_' + curDate.getTime();
    for (var i = 1; i <= 7; i++) {
        var h = i + '';
        if (question[h].ques == userQuestion) {
            if (question[h].ans == userAnswer)
                alert(correct);
        }
    }
    localStorage.setItem(clave, userAnswer);
    showHistory();
    // document.getElementById('history').innerHTML += '<br>' + userAnswer;    
}

function showHistory() {
    for (var q in window.localStorage) {
        var prueba = q.split('_')[0];
        if (q.split('_')[0] == 'answer') {
            var value = localStorage.getItem(q);
            document.getElementById('history').innerHTML += '<br>' + value;
        }
    }
}

function deleteLocalStorage() {
    for (var q in window.localStorage) {
        if (q.split('_')[0] == 'answer')
            localStorage.removeItem(q);
    }
}

ahoraCaigo();