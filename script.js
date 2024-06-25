const resetbtn = document.getElementById("reset");
const playbtn = document.getElementById("play");
const lapbtn = document.getElementById("lap");
const clrbtn = document.getElementById("lap-clear");
const timer = document.getElementsByClassName("time")[0];
let [minutes, seconds, miliseconds] = [0, 0, 0]
let isPlaying = false;
let timingcounter = null;
let count = 1;


function countTimer() {
    miliseconds++;
    if(miliseconds == 100) {
        miliseconds = 0;
        seconds++;
        if(seconds == 60) {
            seconds = 0;
            minutes++;
        }
    }
    let ms = miliseconds < 10 ? `0${miliseconds}` : miliseconds;
    let s = seconds < 10 ? `0${seconds}` : seconds;
    let m = minutes < 10 ? `0${minutes}` : minutes;

    timer.innerHTML  = `${m} : ${s} : ${ms}`;
}

playbtn.addEventListener('click', () => {
    if(!isPlaying) {
        timingcounter = setInterval(countTimer, 10);
        playbtn.innerHTML = "Pause";
        isPlaying = true;
    } else {
        playbtn.innerHTML = "Play";
        isPlaying = false;
        clearInterval(timingcounter);
    }
});

resetbtn.addEventListener('click', () => {
    isPlaying = false;
    clearInterval(timingcounter);
    timer.innerHTML = `00 : 00 : 00`;
    playbtn.innerHTML = 'Play';
    [miliseconds, seconds, minutes] = [0, 0, 0];
    clrbtn.style.visibility = "hidden";
    clearlaps();
});

function clearlaps() {
    document.getElementsByClassName("list-of-laps")[0].innerHTML = '';
    count = 0;
    clrbtn.style.visibility = "hidden";
}
lapbtn.addEventListener('click', () => {
    if(!isPlaying) { 
        return;
    }
    clrbtn.style.visibility = "visible";
    const laplist = document.getElementsByClassName("list-of-laps")[0];
    let time = timer.innerHTML;
    const listitem = document.createElement('li');
    const counttag = document.createElement("span");
    const timetag = document.createElement("span");
    counttag.innerHTML = count++;
    timetag.innerHTML = time;
    listitem.appendChild(counttag);
    listitem.appendChild(timetag);
    laplist.appendChild(listitem);
});

clrbtn.addEventListener('click', clearlaps);