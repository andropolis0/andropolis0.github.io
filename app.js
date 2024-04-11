const beats = new Audio("massobeats-honey_jam.mp3");
let expcoll = 1;
let testVar = 1;

function player() {
    expcoll = !expcoll;
    if(!expcoll) expandPlayer();
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
//collapses too fast only the first time ////////////
function expandPlayer() {
    if(testVar) { testVar = 0;
        beats.play();

        let vol = beats.volume*100;
        let fadein = setInterval( function() {
            if (vol < 100) { vol += 10; beats.volume = vol / 100; }
            else { clearInterval(fadein); testVar = 1; }
        }, 50);

        document.getElementById('musicPlayerDiv').style.width="237px";
        document.getElementById('musicPlayerDiv').style.height="100px";  
    }
}
function collapsePlayer() {
    if(testVar) { testVar = 0;
        let vol = beats.volume*100;
        let fadeout = setInterval( function() {
            if (vol > 0) { vol -= 10; beats.volume = vol / 100; }
            else { clearInterval(fadeout); beats.pause(); testVar = 1;}
        }, 50);

        document.getElementById('musicPlayerDiv').style.width="36px";
        document.getElementById('musicPlayerDiv').style.height="36px";
    }
}
//make wait time longer for extra measure