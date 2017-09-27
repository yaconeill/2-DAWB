// 8.   Un alumno realizó una prueba. Se obtuvo la siguiente información: nombre del alumno,
//      cantidad total de preguntas que se le realizaron y cantidad de preguntas que contestó correctamente.
//      Se pide crear una(s) función(es) JS que lea los datos del estudiante,
//      informe el nivel del mismo según el porcentaje de respuestas correctas que ha obtenido, y sabiendo que:
//      1.	Nivel A: Porcentaje>=85%.
//      2.	Nivel B: Porcentaje>=70% y <85%.
//      3.	Nivel C: Porcentaje>=50% y <70%.
//      4.	Nivel D: Porcentaje<50%.
//       	Deberás mostrar en la consola un mensaje indicando los datos del estudiante y el nivel del alumno.
//           El mensaje en la consola aparecerá como "log" si es nivel A, "info" si es nivel B,
//           "warning" si es nivel C y "error" para nivel D
//       	Igual que lo anterior pero añadiendo a la web los datos del alumno con formato H2 y el nivel en H1
var student = [{
    "name": "",
    "question": parseInt(0),
    "correct": parseInt(0)
}];

function levelMeasurement(num) {
    var question, correct;
    var name = prompt("Introducir nombre:");
    do {
        question = isPositiveInt("Introducir preguntas respondidas:");
        correct = isPositiveInt("Introducir preguntas respondidas correctamente:");
        if (question < correct)
            alert("Las respuestas correctas deben ser menor o igual a las respondidas");
        else
            break;
    } while (true);

    // if (question < correct) {
    //     alert("Las respuestas correctas deben ser menor o igual a las respondidas");
    // } else {
    var percentage = (correct * 100) / question;
    if (parseInt(num) === 1) {
        console.log("Nombre del alumno: " + name + "\npreguntas contestadas: " +
            question + "\npreguntas acertadas: " + correct);
        switch (true) {
            case (percentage >= 85):
                console.log("Nivel A");
                break;
            case (percentage >= 70 && percentage < 85):
                console.info("Nivel B");
                break;
            case (percentage >= 50 && percentage < 70):
                console.warn("Nivel C");
                break;
            case (percentage < 50):
                console.error("Nivel D");
                break;
        }
    } else {
        document.getElementById('data').innerHTML = "Nombre del alumno: " + name + "<br>preguntas contestadas: " +
            question + "<br>preguntas acertadas: " + correct;
        switch (true) {
            case (percentage >= 85):
                document.getElementById('student').innerHTML = "Nivel A";
                break;
            case (percentage >= 70 && percentage < 85):
                document.getElementById('student').innerHTML = "Nivel B";
                break;
            case (percentage >= 50 && percentage < 70):
                document.getElementById('student').innerHTML = "Nivel C";
                break;
            case (percentage < 50):
                document.getElementById('student').innerHTML = "Nivel D";
                break;
        }
    }
    // }
}