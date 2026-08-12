// random orb movement
const orbs = document.querySelectorAll('.orb');

function orbMovement() {
    orbs.forEach(orbs => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        orbs.style.transform = `translate(${x}px, ${y}px)`;
    });
}

orbMovement();

setInterval(orbMovement, 3000);