var gtStyle; //Github's style

document.addEventListener('DOMContentLoaded', () => {
    gtStyle = document.getElementById('github').style;
});

function gtenter() {
    gtStyle.opacity = 1;
}
function gtredirect() {
    window.open("https://github.com/andropolis0", "_self");
}
function gtleave() {
    gtStyle.opacity = 0.5;
}