document.addEventListener("DOMContentLoaded", function () {
    // Sidebar Toggle
    const openMenu = document.getElementById("openMenu");
    const closeMenu = document.getElementById("closeMenu");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (openMenu && sidebar && overlay) {
        openMenu.addEventListener("click", () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        });

        const closeSidebar = () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        };

        if (closeMenu) closeMenu.addEventListener("click", closeSidebar);
        overlay.addEventListener("click", closeSidebar);

        document.querySelectorAll(".menu-link").forEach(link => {
            link.addEventListener("click", closeSidebar);
        });
    }

    // Accordion Toggle Functionality
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", function () {
            const item = this.parentElement;
            const content = item.querySelector(".accordion-content");

            // Close other items
            document.querySelectorAll(".accordion-item").forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    const otherContent = otherItem.querySelector(".accordion-content");
                    if (otherContent) otherContent.style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle("active");
            if (item.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Search Functionality
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const noResults = document.getElementById("noResults");

    function performSearch() {
        const filter = searchInput.value.toLowerCase().trim();
        const cards = document.querySelectorAll(".card");
        const accordionItems = document.querySelectorAll(".accordion-item");
        let hasMatches = false;

        // Search Cards
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(filter)) {
                card.style.display = "flex";
                hasMatches = true;
            } else {
                card.style.display = "none";
            }
        });

        // Search Accordion Items
        accordionItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(filter)) {
                item.style.display = "block";
                hasMatches = true;
            } else {
                item.style.display = "none";
            }
        });

        // Show/Hide No Results Message
        if (noResults) {
            noResults.style.display = hasMatches ? "none" : "block";
        }
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", performSearch);
        searchInput.addEventListener("keyup", function (e) {
            if (e.key === "Enter" || searchInput.value === "") {
                performSearch();
            }
        });
    }

    // ==========================================
    // Chatbot Popup Functionality (New Added)
    // ==========================================
    const chatWidgetBtn = document.getElementById("chatWidgetBtn");
    const chatBox = document.getElementById("chatBox");
    const closeChat = document.getElementById("closeChat");
    const chatInput = document.getElementById("chatInput");
    const sendChatBtn = document.getElementById("sendChatBtn");
    const chatMessages = document.getElementById("chatMessages");

    if (chatWidgetBtn && chatBox) {
        // Open chat window and focus input
        chatWidgetBtn.addEventListener("click", () => {
            chatBox.classList.add("active");
            setTimeout(() => {
                if (chatInput) chatInput.focus();
            }, 100);
        });

        // Close chat window
        if (closeChat) {
            closeChat.addEventListener("click", () => {
                chatBox.classList.remove("active");
            });
        }

        // Send message handler
        function handleSend() {
            const text = chatInput.value.trim();
            if (text !== "") {
                // Display User Message
                const userMsg = document.createElement("div");
                userMsg.className = "message user-message";
                userMsg.textContent = text;
                chatMessages.appendChild(userMsg);

                chatInput.value = "";
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Auto Bot Reply Simulation
                setTimeout(() => {
                    const botMsg = document.createElement("div");
                    botMsg.className = "message bot-message";
                    botMsg.textContent = "آپ کے سوال کا جواب تیار کیا جا رہا ہے...";
                    chatMessages.appendChild(botMsg);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 600);
            }
        }

        if (sendChatBtn) {
            sendChatBtn.addEventListener("click", handleSend);
        }

        if (chatInput) {
            chatInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    handleSend();
                }
            });
        }
    }
});
