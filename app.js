const beats = new Audio("massobeats-honey_jam.mp3");
      beats.volume = 0;
let expcoll = true; //1 = expand, 0 = collapse

var mpStyle; //Music-player's style
var timeline;
var ptStyle; //Player-title's style
document.addEventListener('DOMContentLoaded', () => {
    mpStyle = document.getElementById('music-player').style;
    timeline = document.getElementById('timeline');
    ptStyle = document.getElementById('player-title').style;
});

function player() {
    if(expcoll) expandPlayer();
    else collapsePlayer();
}
function expandPlayer() {
    beats.play();
    let vol = beats.volume * 100;
    let fadein = setInterval(() => {
        if (vol < 100) { vol += 10; beats.volume = vol / 100; }
        else { clearInterval(fadein); }
    }, 50);

    mpStyle.width = "233px";
    mpStyle.height = "72px";

    ptStyle.opacity = 1;

    timeline.style.opacity = 1;
    setTimeout(() => { expcoll = false; }, 500);
}
function collapsePlayer() {
    let vol = beats.volume*100;
    let fadeout = setInterval(() => {
        if (vol > 0) { vol -= 10; beats.volume = vol / 100; }
        else { clearInterval(fadeout); beats.pause(); beats.currentTime = 0; }
    }, 50);

    mpStyle.width = "36px";
    mpStyle.height = "36px";

    ptStyle.opacity = 0;

    timeline.style.opacity = 0;
    setTimeout(() => { expcoll = true; }, 500);
}




/*

design the ui first

const timeline = document.querySelector('.timeline');

function changeTimelinePosition () {
    const percentagePosition = (100*beats.currentTime) / beats.duration;
    timeline.style.backgroundSize = `${percentagePosition}% 100%`;
    timeline.value = percentagePosition;
  }
  
  beats.ontimeupdate = changeTimelinePosition;
function changeSeek () {
    const time = (timeline.value * beats.duration) / 100;
    beats.currentTime = time;
}

timeline.addEventListener('change', changeSeek);


beats.addEventListener("timeupdate", updateCurrentTime);
let beatsPrevSeconds = 0;
function updateCurrentTime() {
    let sec = Math.floor(beats.currentTime % 60);
    let min = Math.floor(beats.currentTime / 60);
    
    if(beatsPrevSeconds != sec) {
        if(sec < 10) { sec = "0" + sec.toString(); }
        beatsPrevSeconds = Math.floor(beats.currentTime % 60);
        console.log(min + ":" + sec);
    } //Ended here// outputs right, but the next issue is line 30 in html
}
*/