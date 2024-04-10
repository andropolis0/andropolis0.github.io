const beats = new Audio("massobeats-honey_jam.mp3");
let expcoll = 0;

function player() {
    expcoll = !expcoll;
    if (expcoll) expandPlayer();
    else collapsePlayer();
}

beats.addEventListener("timeupdate", updateCurrentTime);
var beatsPrevSeconds = 0;

function updateCurrentTime() {
    var sec = Math.floor(beats.currentTime % 60);
    var min = Math.floor(beats.currentTime / 60);
    
    if(beatsPrevSeconds != sec) {
        if(sec < 10) { sec = "0" + sec.toString(); }
        beatsPrevSeconds = Math.floor(beats.currentTime % 60);
        console.log(min + ":" + sec);
    } //Ended here// outputs right, but the next issue is line 30 in html
}

function expandPlayer() {
    fadeIn();
    document.getElementById('musicPlayerDiv').style.width="237px";
    document.getElementById('musicPlayerDiv').style.height="100px";
}
function collapsePlayer() {
    fadeOut();
    document.getElementById('musicPlayerDiv').style.width="36px";
    document.getElementById('musicPlayerDiv').style.height="36px";
    //beats.currentTime = 0;
}

function fadeIn() {
    beats.play();
    let vol = beats.volume*100;
    let fadein = setInterval( function() {
        if (vol < 100) { vol += 10; beats.volume = vol / 100; }
        else { clearInterval(fadein);}
    }, 100);
}
function fadeOut() {
    let vol = beats.volume*100;
    let fadeout = setInterval( function() {
        if (vol > 0) { vol -= 10; beats.volume = vol / 100; }
        else { clearInterval(fadeout); beats.pause();}
    }, 100);
}