var lenis
const script = document.createElement('script')
script.src = 'lenis.js'
script.type = 'text/javascript'
script.onload = () => {
	const scrollContainer = document.getElementById("main")

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
	})

	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}
	
	requestAnimationFrame(raf)
}
document.head.appendChild(script)

const navTitles = document.querySelectorAll('.nav-title')
const navLinks = document.querySelectorAll('.nav-link')
  
navTitles.forEach(navTitle => {
	navTitle.addEventListener('click', (event) => {
		const navTitleStyles = window.getComputedStyle(navTitle, '::after')

		if (
			event.pageX >= navTitle.offsetLeft + navTitle.offsetWidth - parseInt(navTitleStyles.right, 10) - parseInt(navTitleStyles.width, 10) &&
			event.pageX <= navTitle.offsetLeft + navTitle.offsetWidth - parseInt(navTitleStyles.right, 10) &&
			event.pageY >= navTitle.offsetTop   &&
			event.pageY <= navTitle.offsetTop  + navTitle.offsetHeight
		) { lenis.scrollTo(Array.from(document.querySelectorAll('.content-segment')).find(element => element.textContent.trim() === navTitle.textContent.trim())) }
	})
})
navLinks.forEach(navLink => {
	navLink.addEventListener('click', () => lenis.scrollTo(Array.from(document.querySelectorAll('.content-title')).find(element => element.textContent.trim() === navLink.textContent.trim())))
})

//Moving dots part
var canvas = document.getElementById("canvas"), ctx = canvas.getContext('2d')
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

var stars = [], FPS = 60, x = ((window.innerWidth * window.innerHeight) / 20000)

for (var i = 0; i < x; i++) {
	stars.push({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		radius: Math.random() * 1 + 1,
		vx: Math.floor(Math.random() * 50) - 25,
		vy: Math.floor(Math.random() * 50) - 25
	})
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	
	ctx.globalCompositeOperation = "lighter"
	
	for (var i = 0, x = stars.length; i < x; i++) {
		var s = stars[i]
	
		ctx.fillStyle = "white"
		ctx.beginPath()
		ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI)
		ctx.fill()
		ctx.fillStyle = 'black'
		ctx.stroke()
	}
	
	ctx.beginPath()
	for (var i = 0, x = stars.length; i < x; i++) {
		var starI = stars[i]
		ctx.moveTo(starI.x,starI.y)
		for (var j = 0, x = stars.length; j < x; j++) {
			var starII = stars[j]
			if(distance(starI, starII) < 150) { ctx.lineTo(starII.x,starII.y) }
		}
	}
	ctx.lineWidth = 0.05

	var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
		gradient.addColorStop(0, '#4158D0')
		gradient.addColorStop(0.5, '#C850C0')
		gradient.addColorStop(1, '#CFA42B')
		
	ctx.strokeStyle = gradient
	ctx.stroke()
}
function distance( point1, point2 ){
  	return Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) + (point2.y - point1.y) * (point2.y - point1.y))
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