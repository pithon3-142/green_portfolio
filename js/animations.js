// random orb movement
const orbs = document.querySelectorAll('.orb');

    function orbMovement() {
    orbs.forEach(orb => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    orbMovement();

setInterval(orbMovement, 5000);

//some simple jQuery imlementation
$(document).ready(function () {
    $("#home").hide().fadeIn(3000);
});