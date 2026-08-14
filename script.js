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
/* Multi-Language Translation System */
const langButtons = document.querySelectorAll(".lang-btn");

const translations = {
    ur: {
        dir: "rtl",
        logoSub: "Resource",
        introTitle: "جماعتِ احمدیہ کا مختصر و مکمل تعارف",
        searchInputPlaceholder: "تلاش کریں (مثلاً: خلافت, نماز, کتب)...",
        searchBtn: "تلاش",
        depTitle: "اہم شعبہ جات",
        depSub: "آن لائن دینی و علمی مواد (براہِ راست روابط)",
        qnaTitle: "عام سوالات و جوابات",
        qnaSub: "عام مذہبی اور عقائدی سوالات کے مختصر و جامع جوابات",
        chatTitle: "AI الاسلام اسسٹنٹ",
        chatInputPlaceholder: "اپنا سوال لکھیں...",
        sendBtn: "بھیجیں"
    },
    en: {
        dir: "ltr",
        logoSub: "Portal",
        introTitle: "A Brief & Complete Introduction to Ahmadiyya Muslim Community",
        searchInputPlaceholder: "Search (e.g., Khilafat, Salat, Books)...",
        searchBtn: "Search",
        depTitle: "Key Departments",
        depSub: "Online religious and academic resources (Direct Links)",
        qnaTitle: "Frequently Asked Questions",
        qnaSub: "Short and comprehensive answers to religious and faith-based questions",
        chatTitle: "AI Al-Islam Assistant",
        chatInputPlaceholder: "Type your question...",
        sendBtn: "Send"
    },
    fr: {
        dir: "ltr",
        logoSub: "Portail",
        introTitle: "Une introduction brève et complète à la communauté musulmane Ahmadiyya",
        searchInputPlaceholder: "Rechercher (ex. : Khilafat, Salat, Livres)...",
        searchBtn: "Rechercher",
        depTitle: "Départements clés",
        depSub: "Ressources religieuses et académiques en ligne (Liens directs)",
        qnaTitle: "Questions Fréquemment Posées",
        qnaSub: "Réponses courtes et complètes aux questions religieuses",
        chatTitle: "Assistant IA Al-Islam",
        chatInputPlaceholder: "Tapez votre question...",
        sendBtn: "Envoyer"
    },
    bn: {
        dir: "ltr",
        logoSub: "পোর্টাল",
        introTitle: "আহমদিয়া মুসলিম জামায়াতের একটি সংক্ষিপ্ত ও সম্পূর্ণ পরিচিতি",
        searchInputPlaceholder: "অনুসন্ধান করুন (যেমন: খিলাফত, সালাত, বই)...",
        searchBtn: "অনুসন্ধান",
        depTitle: "মূল বিভাগসমূহ",
        depSub: "অনলাইন ধর্মীয় এবং একাডেমিক সম্পদ (সরাসরি লিঙ্ক)",
        qnaTitle: "সচরাচর জিজ্ঞাস্য প্রশ্নাবলী",
        qnaSub: "ধর্মীয় ও বিশ্বাসগত প্রশ্নগুলোর সংক্ষিপ্ত এবং ব্যাপক উত্তর",
        chatTitle: "এআই আল-ইসলাম সহকারী",
        chatInputPlaceholder: "আপনার প্রশ্ন লিখুন...",
        sendBtn: "পাঠান"
    },
    ar: {
        dir: "rtl",
        logoSub: "بوابة",
        introTitle: "مقدمة موجزة وكاملة عن الجماعة الإسلامية الأحمدية",
        searchInputPlaceholder: "بحث (مثل: الخلافة، الصلاة، الكتب)...",
        searchBtn: "بحث",
        depTitle: "الأقسام الرئيسية",
        depSub: "الموارد الدينية والأكاديمية عبر الإنترنت (روابط مباشرة)",
        qnaTitle: "الأسئلة الشائعة",
        qnaSub: "إجابات قصيرة وشاملة على الأسئلة الدينية والعقائدية",
        chatTitle: "مساعد الذكاء الاصطناعي الإسلام",
        chatInputPlaceholder: "اكتب سؤالك...",
        sendBtn: "إرسال"
    }
};

langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        langButtons.forEach(b => b.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");

        const lang = btn.getAttribute("data-lang");
        const t = translations[lang];

        if (t) {
            document.documentElement.setAttribute("lang", lang);
            document.documentElement.setAttribute("dir", t.dir);

            // Update text elements safely
            if (document.querySelector(".logo-sub")) document.querySelector(".logo-sub").textContent = t.logoSub;
            if (document.querySelector(".intro-title")) document.querySelector(".intro-title").textContent = t.introTitle;
            if (document.querySelector("#searchInput")) document.querySelector("#searchInput").placeholder = t.searchInputPlaceholder;
            if (document.querySelector("#searchBtn")) document.querySelector("#searchBtn").textContent = t.searchBtn;
            if (document.querySelector("#departments h2")) document.querySelector("#departments h2").textContent = t.depTitle;
            if (document.querySelector("#departments p")) document.querySelector("#departments p").textContent = t.depSub;
            if (document.querySelector("#qna h2")) document.querySelector("#qna h2").textContent = t.qnaTitle;
            if (document.querySelector("#qna p")) document.querySelector("#qna p").textContent = t.qnaSub;
            if (document.querySelector(".chat-header span")) document.querySelector(".chat-header span").textContent = t.chatTitle;
            if (document.querySelector("#chatInput")) document.querySelector("#chatInput").placeholder = t.chatInputPlaceholder;
            if (document.querySelector("#sendChatBtn")) document.querySelector("#sendChatBtn").textContent = t.sendBtn;
        }
    });
});
