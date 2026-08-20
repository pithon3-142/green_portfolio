const canvas = document.getElementById("canvas");
const navItems = document.querySelectorAll(".nav");

navItems.forEach((item) => {

    item.addEventListener("click", () => {
        const page = item.dataset.page;

        switch (page) {
            case "profile":
                canvas.style.transform = "translate(0vw, -100vh)";
                setTimeout(() => { alert("Scroll down for more content"); }, 3000);
                break;
            case "portfolio":
                canvas.style.transform = "translate(-200vw, -100vh)";
                setTimeout(() => { alert("Scroll down for more content"); }, 3000);
                break;
            case "repos":
                canvas.style.transform = "translate(-100vw, 0vh)";
                break;
            case "contact":
                canvas.style.transform = "translate(-100vw, -200vh)";
                break;
        }
    });
});
 