const canvas = document.getElementById("canvas");
const navItems = document.querySelectorAll(".nav");

navItems.forEach((item) => {

    item.addEventListener("click", () => {
        const page = item.dataset.page;

        switch (page) {
            case "home":
                canvas.style.transform = "translate(-100vw, -100vh)";
                break;
            case "profile":
                canvas.style.transform = "translate(100vw, 0vh)";
                break;
            case "portfolio":
                canvas.style.transform = "translate(-100vw, 0vh)";
                break;
            case "skills":
                canvas.style.transform = "translate(0vw, 100vh)";
                break;
            case "contact":
                canvas.style.transform = "translate(0vw, -100vh)";
                break;
        }
    });
});