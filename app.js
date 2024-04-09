let playF = false; //Playing function
const beats = new Audio("massobeats - honey jam.mp3");

function testFunctt() {
    playF = !playF;
    if (playF) expandPlayer();
    else collapsePlayer();
}

function expandPlayer() {
    beats.play();
    document.getElementById('musicPlayerDiv').style.width="100px";
}
function collapsePlayer() {
    beats.pause();
    beats.currentTime = 0;
    document.getElementById('musicPlayerDiv').style.width="36px";
}