(() => {
    const returnHome = () => {
        document.getElementById('canvas').style.transform = 'translate(-100vw, -100vh)';
    };

    if (window.jQuery) {
        $('.home-fab').on('click', returnHome);
        return;
    }

    document.querySelectorAll('.home-fab').forEach(button => button.addEventListener('click', returnHome));
})();
