document.addEventListener("DOMContentLoaded", function () {

    const themeToggleBtn = document.getElementById("themeToggleBtn");

    // Theme button agar HTML mein nahi hai to automatically bana do
    if (!themeToggleBtn) {

        const button = document.createElement("button");

        button.id = "themeToggleBtn";
        button.className = "theme-toggle-btn";
        button.type = "button";
        button.setAttribute("aria-label", "Change theme");

        button.textContent = "🌙 Dark Mode";

        // Navbar mein button automatically add hoga
        const navbar = document.querySelector(".navbar");

        if (navbar) {
            navbar.appendChild(button);
        }
    }

    const button = document.getElementById("themeToggleBtn");

    // Saved theme
    let currentTheme = localStorage.getItem("theme");

    if (!currentTheme) {
        currentTheme = "light";
        localStorage.setItem("theme", "light");
    }

    document.documentElement.setAttribute("data-theme", currentTheme);

    // Button text
    if (button) {
        button.textContent =
            currentTheme === "dark"
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";
    }

    // Theme change
    if (button) {

        button.addEventListener("click", function () {

            const current =
                document.documentElement.getAttribute("data-theme");

            const newTheme =
                current === "dark" ? "light" : "dark";

            document.documentElement.setAttribute(
                "data-theme",
                newTheme
            );

            localStorage.setItem("theme", newTheme);

            button.textContent =
                newTheme === "dark"
                    ? "☀️ Light Mode"
                    : "🌙 Dark Mode";
        });
    }

});