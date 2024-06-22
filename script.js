function loadScript(url, callback) {
  const script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  script.onload = callback;
  document.head.appendChild(script);
}
var lenis;

function initializeLenis() {
  const scrollContainer = document.getElementById("main");

  lenis = new Lenis({
    wrapper: scrollContainer,
    content: scrollContainer,
    duration: 1.2,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  requestAnimationFrame(raf);
}
loadScript('lenis.js', initializeLenis);

const navTitles = document.querySelectorAll('.nav-title');
const navLinks = document.querySelectorAll('.nav-link');
  
navTitles.forEach(navTitle => {
  navTitle.addEventListener('click', (event) => {
    const navTitleStyles = window.getComputedStyle(navTitle, '::after');
    const right = parseInt(navTitleStyles.right, 10);
    const width = parseInt(navTitleStyles.width, 10);
    const top = navTitle.offsetTop;
    const bottom = top + navTitle.offsetHeight;

    const pseudoBox = {
      top: top,
      bottom: bottom,
      left: navTitle.offsetLeft + navTitle.offsetWidth - right - width,
      right: navTitle.offsetLeft + navTitle.offsetWidth - right
    };

    if (event.pageX >= pseudoBox.left && event.pageX <= pseudoBox.right && event.pageY >= pseudoBox.top && event.pageY <= pseudoBox.bottom) {
      const navTitleText = navTitle.textContent.trim();
      const contentSegment = Array.from(document.querySelectorAll('.content-segment')).find(element => element.textContent.trim() === navTitleText);

      if (contentSegment) { lenis.scrollTo(contentSegment); }
    }
  });
});
navLinks.forEach(navLink => {
  navLink.addEventListener('click', () => {
    const navLinkText = navLink.textContent.trim();
    const contentTitle = Array.from(document.querySelectorAll('.content-title')).find(element => element.textContent.trim() === navLinkText);

    if (contentTitle) { lenis.scrollTo(contentTitle); }
  });
});

var canvas = document.getElementById("canvas"), ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

var stars = [], FPS = 60, x = ((window.innerWidth * window.innerHeight) / 20000);

for (var i = 0; i < x; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 1,
    vx: Math.floor(Math.random() * 50) - 25,
    vy: Math.floor(Math.random() * 50) - 25
  });
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.globalCompositeOperation = "lighter";
  
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];
  
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.stroke();
  }
  
  ctx.beginPath();
  for (var i = 0, x = stars.length; i < x; i++) {
    var starI = stars[i];
    ctx.moveTo(starI.x,starI.y);
    for (var j = 0, x = stars.length; j < x; j++) {
        var starII = stars[j];
        if(distance(starI, starII) < 150) { ctx.lineTo(starII.x,starII.y); }
    }
  }
  ctx.lineWidth = 0.05;

  var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#4158D0');
    gradient.addColorStop(0.5, '#C850C0');
    gradient.addColorStop(1, '#CFA42B');
    
  ctx.strokeStyle = gradient;
  ctx.stroke();
}
function distance( point1, point2 ){
  var xs = 0;
  var ys = 0;
 
  xs = point2.x - point1.x;
  xs = xs * xs;
 
  ys = point2.y - point1.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}
function update() {
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];
  
    s.x += s.vx / FPS;
    s.y += s.vy / FPS;
    
    if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
    if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
  }
}
function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}
tick();