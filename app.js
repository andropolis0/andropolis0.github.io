const beats = new Audio("massobeats-honey_jam.mp3");
let expcoll = 1; //1 = expand, 0 = collapse

function player() {
    if(expcoll) expandPlayer();
    else collapsePlayer();
}

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

function expandPlayer() {
    beats.play();
    let vol = beats.volume*100;
    let fadein = setInterval( function() {
        if (vol < 100) { vol += 10; beats.volume = vol / 100; }
        else { clearInterval(fadein); expcoll = 0;}
    }, 50);

    document.getElementById('musicPlayerDiv').style.width="237px";
    document.getElementById('musicPlayerDiv').style.height="100px";
}
function collapsePlayer() {
    let vol = beats.volume*100;
    let fadeout = setInterval( function() {
        if (vol > 0) { vol -= 10; beats.volume = vol / 100; }
        else { clearInterval(fadeout); beats.pause(); expcoll = 1;}
    }, 50);

    document.getElementById('musicPlayerDiv').style.width="36px";
    document.getElementById('musicPlayerDiv').style.height="36px";
}



const timeline = document.querySelector('.timeline');

function changeTimelinePosition () {
    const percentagePosition = (100*audio.currentTime) / audio.duration;
    timeline.style.backgroundSize = `${percentagePosition}% 100%`;
    timeline.value = percentagePosition;
  }
  
  audio.ontimeupdate = changeTimelinePosition;
function changeSeek () {
    const time = (timeline.value * audio.duration) / 100;
    audio.currentTime = time;
}

timeline.addEventListener('change', changeSeek);