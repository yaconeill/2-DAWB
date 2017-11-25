var start;
var end;
var count = 1;

function startChrono() {
    start = new Date().getMilliseconds();
    document.getElementById('chrono').innerHTML = 'Comienza!!';
}

function endChrono() {
    end = new Date().getMilliseconds();

    var duration = Math.ceil((end - start) / 60);
    if (duration < 0)
        duration *= -1;
    document.getElementById('time').innerHTML = '<p>' + duration + '</p>';
    localStorage.setItem('Intento' + count, duration)
    count++;
}