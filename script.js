Document.addEventListener("DOMContentLoaded", function () {
    // ==========================================
    // 1. Sidebar Toggle Functionality
    // ==========================================
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

    // ==========================================
    // 2. Accordion Toggle Functionality
    // ==========================================
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

    // ==========================================
    // 3. Search & Filter Functionality
    // ==========================================
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const noResults = document.getElementById("noResults");

    function performSearch() {
        if (!searchInput) return;
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
    // 4. Multi-Language Translation System (Complete)
    // ==========================================
    const langButtons = document.querySelectorAll(".lang-btn");

    const translations = {
        ur: {
            dir: "rtl",
            logoBold: "الاسلام",
            logoSub: "Resource",
            menuTitle: "نیویگیشن Menu",
            navDep: "اہم شعبہ جات",
            navQna: "عام سوالات و جوابات",
            navQuran: "القرآن الکریم (تراجم)",
            navRuhani: "روحانی خزائن",
            navKhilafat: "خلافتِ احمدیہ",
            navMta: "ایم ٹی اے (MTA Live)",
            navLibrary: "کتب خانہ (Library)",
            navAsk: "سوال و جواب (AlIslam Q&A)",
            navPress: "پریس ریلیز",
            navContact: "ہم سے رابطہ کریں",
            bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            introTitle: "جماعتِ احمدیہ کا مختصر و مکمل تعارف",
            introQuoteTitle: "ہمارے مذہب کا خلاصہ اور لبِ لباب:",
            introQuoteText: "\"یہ ہے کہ لا اِلٰہ الا اللّہ محمد رسول اللّہ ہمارا اعتقاد جو ہم اس دنیوی زندگی میں رکھتے ہیں جس کے ساتھ ہم بفضل و توفیق باری تعالیٰ اس عالمِ گزران سے کوچ کریں گے یہ ہے کہ حضرت سیدنا و مولانا محمد مصطفٰے صلی اللہ علیہ وسلم خاتم النبیین و خیر المرسلین ہیں۔\"",
            introAuthor: "— حضرت مرزا غلام احمد قادیانی، مسیح موعود علیہ السلام",
            introDesc: "جماعتِ احمدیہ عالمگیر ایک زبردست روحانی و اصلاحی تحریک ہے جس کی بنیاد 1889ء میں رکھی گئی۔ اس کا بنیادی مقصد اسلام کی حقیقی، پرامن اور مخلصانہ تعلیمات کو دنیا بھر میں عام کرنا اور \"محبت سب کے لیے، نفرت کسی سے نہیں\" کے تحت انسانیت کی خدمت کرنا ہے۔",
            searchPlaceholder: "تلاش کریں (مثلاً: خلافت, نماز, کتب)...",
            searchBtnText: "تلاش",
            depHeader: "اہم شعبہ جات",
            depDesc: "آن لائن دینی و علمی مواد (براہِ راست روابط)",
            card1Title: "القرآن الکریم",
            card1Desc: "عربی متن، اردو ترجمہ اور تفصیلی تفاسیر۔",
            card2Title: "روحانی خزائن",
            card2Desc: "حضرت مسیح موعود علیہ السلام کی تمام تصانیف۔",
            card3Title: "خلافتِ احمدیہ",
            card3Desc: "خلفائے احمدیت کے خطبات اور ہدایات۔",
            card4Title: "ایم ٹی اے انٹرنیشنل",
            card4Desc: "براہِ راست نشریات اور اسلامی پروگرامز۔",
            card5Title: "سوال و جواب",
            card5Desc: "عام مذہبی اور عقائدی سوالات کے جوابات۔",
            card6Title: "اخبارات و رسائل",
            card6Desc: "الفضل، الموعود اور جماعت کے دیگر رسائل۔",
            qnaHeader: "عام سوالات و جوابات",
            qnaDesc: "عام مذہبی اور عقائدی سوالات کے مختصر و جامع جوابات",
            noResultsText: "کوئی نتیجہ نہیں ملا۔ برائے مہربانی مختلف الفاظ سے تلاش کریں۔",
            chatTitleText: "AI الاسلام اسسٹنٹ",
            botWelcome: "السلام علیکم! میں آپ کا ڈیجیٹل اسسٹنٹ ہوں۔ آپ کیا جاننا چاہتے ہیں؟",
            chatPlaceholder: "اپنا سوال لکھیں...",
            sendBtnText: "بھیجیں"
        },
        en: {
            dir: "ltr",
            logoBold: "Al-Islam",
            logoSub: "Portal",
            menuTitle: "Navigation Menu",
            navDep: "Key Departments",
            navQna: "Frequently Asked Questions",
            navQuran: "Holy Quran (Translations)",
            navRuhani: "Ruhani Khazain",
            navKhilafat: "Ahmadiyya Khilafat",
            navMta: "MTA Live",
            navLibrary: "Library",
            navAsk: "Al-Islam Q&A",
            navPress: "Press Releases",
            navContact: "Contact Us",
            bismillah: "In the name of Allah, the Gracious, the Merciful",
            introTitle: "A Brief & Complete Introduction to Ahmadiyya Muslim Community",
            introQuoteTitle: "Summary and Essence of Our Faith:",
            introQuoteText: "\"It is that La ilaha illallah Muhammadur Rasulullah. Our belief which we hold in this worldly life, and with which—by the grace and help of God Almighty—we will depart from this transient world, is that Hazrat Syedna wa Mawlana Muhammad Mustafa, peace and blessings of Allah be upon him, is the Khatam-un-Nabiyyin and Khair-ul-Mursaleen.\"",
            introAuthor: "— Hazrat Mirza Ghulam Ahmad of Qadian, the Promised Messiah",
            introDesc: "The Ahmadiyya Muslim Community is a vibrant spiritual and reform movement founded in 1889. Its primary objective is to revive the true, peaceful teachings of Islam worldwide and serve humanity under the motto 'Love for All, Hatred for None'.",
            searchPlaceholder: "Search (e.g., Khilafat, Salat, Books)...",
            searchBtnText: "Search",
            depHeader: "Key Departments",
            depDesc: "Online religious and academic resources (Direct Links)",
            card1Title: "The Holy Quran",
            card1Desc: "Arabic text, translations, and detailed commentaries.",
            card2Title: "Ruhani Khazain",
            card2Desc: "Complete compiled works of the Promised Messiah.",
            card3Title: "Ahmadiyya Khilafat",
            card3Desc: "Sermons, addresses, and guidance from the Khulafa.",
            card4Title: "MTA International",
            card4Desc: "Live broadcasts and faith-inspiring Islamic programs.",
            card5Title: "Questions & Answers",
            card5Desc: "Answers to common religious and faith-based questions.",
            card6Title: "Newspapers & Periodicals",
            card6Desc: "Al-Fazl, Al-Mau'ood, and other community publications.",
            qnaHeader: "Frequently Asked Questions",
            qnaDesc: "Short and comprehensive answers to religious and faith-based questions",
            noResultsText: "No results found. Please try searching with different keywords.",
            chatTitleText: "AI Al-Islam Assistant",
            botWelcome: "Assalamu Alaikum! I am your digital assistant. What would you like to know?",
            chatPlaceholder: "Type your question...",
            sendBtnText: "Send"
        },
        fr: {
            dir: "ltr",
            logoBold: "Al-Islam",
            logoSub: "Portail",
            menuTitle: "Menu de Navigation",
            navDep: "Départements clés",
            navQna: "Questions Fréquemment Posées",
            navQuran: "Saint Coran (Traductions)",
            navRuhani: "Ruhani Khazain",
            navKhilafat: "Khilafat Ahmadiyya",
            navMta: "MTA Direct",
            navLibrary: "Bibliothèque",
            navAsk: "Q&A Al-Islam",
            navPress: "Communiqués de presse",
            navContact: "Contactez-nous",
            bismillah: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux",
            introTitle: "Une introduction brève et complète à la communauté musulmane Ahmadiyya",
            introQuoteTitle: "Résumé et essence de notre foi :",
            introQuoteText: "\"C'est que La ilaha illallah Muhammadur Rasulullah. Notre croyance... est que Hazrat Muhammad Mustafa, paix et bénédictions soient sur lui, est le Sceau des prophètes.\"",
            introAuthor: "— Hazrat Mirza Ghulam Ahmad de Qadian, le Messie Promis",
            introDesc: "La communauté musulmane Ahmadiyya est un mouvement spirituel et réformateur fondé en 1889. Son objectif principal est de propager les enseignements pacifiques de l'islam.",
            searchPlaceholder: "Rechercher (ex. : Khilafat, Salat, Livres)...",
            searchBtnText: "Rechercher",
            depHeader: "Départements clés",
            depDesc: "Ressources religieuses et académiques en ligne (Liens directs)",
            card1Title: "Le Saint Coran",
            card1Desc: "Texte arabe, traductions et commentaires détaillés.",
            card2Title: "Ruhani Khazain",
            card2Desc: "Œuvres complètes du Messie Promis.",
            card3Title: "Khilafat Ahmadiyya",
            card3Desc: "Sermons et directives des Khulafa.",
            card4Title: "MTA International",
            card4Desc: "Diffusions en direct et programmes islamiques.",
            card5Title: "Questions & Réponses",
            card5Desc: "Réponses aux questions religieuses courantes.",
            card6Title: "Journaux et Périodiques",
            card6Desc: "Al-Fazl et autres publications communautaires.",
            qnaHeader: "Questions Fréquemment Posées",
            qnaDesc: "Réponses courtes et complètes aux questions religieuses",
            noResultsText: "Aucun résultat trouvé. Veuillez essayer d'autres mots-clés.",
            chatTitleText: "Assistant IA Al-Islam",
            botWelcome: "Assalamu Alaikum ! Je suis votre assistant numérique. Que souhaitez-vous savoir ?",
            chatPlaceholder: "Tapez votre question...",
            sendBtnText: "Envoyer"
        },
        bn: {
            dir: "ltr",
            logoBold: "আল-ইসলাম",
            logoSub: "পোর্টাল",
            menuTitle: "নেভিগেশন মেনু",
            navDep: "মূল বিভাগসমূহ",
            navQna: "সচরাচর জিজ্ঞাস্য প্রশ্নাবলী",
            navQuran: "পবিত্র কুরআন (অনুবাদ)",
            navRuhani: "রূহানী খাযাইন",
            navKhilafat: "আহমদিয়া খিলাফত",
            navMta: "এমটিএ লাইভ",
            navLibrary: "গ্রন্থাগার",
            navAsk: "আল-ইসলাম প্রশ্ন ও উত্তর",
            navPress: "প্রেস বিজ্ঞপ্তি",
            navContact: "যোগাযোগ করুন",
            bismillah: "শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু",
            introTitle: "আহমদিয়া মুসলিম জামায়াতের একটি সংক্ষিপ্ত ও সম্পূর্ণ পরিচিতি",
            introQuoteTitle: "আমাদের ধর্মের মূল সারসংক্ষেপ:",
            introQuoteText: "\"তা হলো লা ইলাহা ইল্লাল্লাহু মুহাম্মাদুর রাসূলুল্লাহ। দুনিয়ার জীবনে আমাদের এই বিশ্বাস...\"",
            introAuthor: "— হযরত মির্জা গোলাম আহমদ কাদিয়ানী, প্রতিশ্ৰুত মসীহ",
            introDesc: "আহমদিয়া মুসলিম জামায়াত ১৮৮৯ সালে প্রতিষ্ঠিত একটি বৈশ্বিক আধ্যাত্মিক ও সংস্কারমূলক আন্দোলন۔",
            searchPlaceholder: "অনুসন্ধান করুন (যেমন: খিলাফত, সালাত, বই)...",
            searchBtnText: "অনুসন্ধান",
            depHeader: "মূল বিভাগসমূহ",
            depDesc: "অনলাইন ধর্মীয় এবং একাডেমিক সম্পদ (সরাসরি লিঙ্ক)",
            card1Title: "আল-কুরআনুল কারীম",
            card1Desc: "আরবি পাঠ, বাংলা অনুবাদ এবং বিস্তারিত তাফসীর۔",
            card2Title: "রূহানী খাযাইন",
            card2Desc: "প্রতিশ্ৰুত মসীহ আলাইহিস সালামের সকল গ্রন্থাবলী۔",
            card3Title: "আহমদিয়া খিলাফত",
            card3Desc: "খুলাফায়ে আহমদের খুতবা ও দিকনির্দেশনা۔",
            card4Title: "এমটিএ ইন্টারন্যাশনাল",
            card4Desc: "সরাসরি সম্প্রচার এবং শিক্ষামূলক ইসলামী অনুষ্ঠান۔",
            card5Title: "প্রশ্ন ও উত্তর",
            card5Desc: "সাধারণ ধর্মীয় ও বিশ্বাসগত প্রশ্নগুলোর উত্তর۔",
            card6Title: "সংবাদপত্র ও সাময়িকী",
            card6Desc: "আল-ফজল এবং অন্যান্য জামഅতের প্রকাশনা۔",
            qnaHeader: "সচরাচর জিজ্ঞাস্য প্রশ্নাবলী",
            qnaDesc: "ধর্মীয় ও বিশ্বাসগত প্রশ্নগুলোর সংক্ষিপ্ত এবং ব্যাপক উত্তর",
            noResultsText: "কোনো ফলাফল পাওয়া যায়নি। অনুগ্রহ করে ভিন্ন শব্দ দিয়ে অনুসন্ধান করুন۔",
            chatTitleText: "এআই আল-ইসলাম সহকারী",
            botWelcome: "আসসালামু আলাইকুম! আমি আপনার ডিজিটাল সহকারী। আপনি কী জানতে চান?",
            chatPlaceholder: "আপনার প্রশ্ন লিখুন...",
            sendBtnText: "পাঠান"
        },
        ar: {
            dir: "rtl",
            logoBold: "الإسلام",
            logoSub: "بوابة",
            menuTitle: "قائمة التنقل",
            navDep: "الأقسام الرئيسية",
            navQna: "الأسئلة الشائعة",
            navQuran: "القرآن الكريم (الترجمات)",
            navRuhani: "الخزائن الروحانية",
            navKhilafat: "الخلافة الأحمدية",
            navMta: "قناة إم تي إيه",
            navLibrary: "المكتبة",
            navAsk: "الأسئلة والأجوبة الإسلامية",
            navPress: "البيانات الصحفية",
            navContact: "اتصل بنا",
            bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            introTitle: "مقدمة موجزة وكاملة عن الجماعة الإسلامية الأحمدية",
            introQuoteTitle: "خلاصة ديننا وجوهره:",
            introQuoteText: "\"هو أن لا إله إلا الله محمد رسول الله. اعتقادنا الذي نحمله في هذه الحياة الدنيا... هو أن حضرة سيدنا ومولانا محمد مصطفى صلى الله عليه وسلم هو خاتم النبيين.\"",
            introAuthor: "— حضرة مرزا غلام أحمد القادياني، المسيح الموعود",
            introDesc: "الجماعة الإسلامية الأحمدية هي حركة روحية وإصلاحية عالمية تأسست عام 1889. هدفها الرئيسي هو نشر التعاليم الحقيقية للإسلام.",
            searchPlaceholder: "بحث (مثل: الخلافة، الصلاة، الكتب)...",
            searchBtnText: "بحث",
            depHeader: "الأقسام الرئيسية",
            depDesc: "الموارد الدينية والأكاديمية عبر الإنترنت (روابط مباشرة)",
            card1Title: "القرآن الكريم",
            card1Desc: "النص العربي، الترجمات والتفاسير المفصلة.",
            card2Title: "الخزائن الروحانية",
            card2Desc: "جميع مؤلفات المسيح الموعود عليه السلام.",
            card3Title: "الخلافة الأحمدية",
            card3Desc: "خطب وتوجيهات الخلفاء الأحمديين.",
            card4Title: "إم تي إيه الدولية",
            card4Desc: "البث المباشر والبرامج الإسلامية الهادفة.",
            card5Title: "الأسئلة والأجوبة",
            card5Desc: "إجابات على الأسئلة الدينية والعقائدية الشائعة.",
            card6Title: "الصحف والمجلات",
            card6Desc: "الفضل ومطبوعات الجماعة الأخرى.",
            qnaHeader: "الأسئلة الشائعة",
            qnaDesc: "إجابات قصيرة وشاملة على الأسئلة الدينية والعقائدية",
            noResultsText: "لم يتم العثور على نتائج. يرجى محاولة البحث بكلمات أخرى.",
            chatTitleText: "مساعد الذكاء الاصطناعي الإسلام",
            botWelcome: "السلام عليكم! أنا مساعدك الرقمي. ماذا تريد أن تعرف؟",
            chatPlaceholder: "اكتب سؤالك...",
            sendBtnText: "إرسال"
        }
    };

    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            langButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const lang = btn.getAttribute("data-lang");
            const t = translations[lang];

            if (t) {
                document.documentElement.setAttribute("lang", lang);
                document.documentElement.setAttribute("dir", t.dir);

                document.querySelectorAll("[data-i18n]").forEach(el => {
                    const key = el.getAttribute("data-i18n");
                    if (t[key]) {
                        el.textContent = t[key];
                    }
                });

                document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
                    const key = el.getAttribute("data-i18n-placeholder");
                    if (t[key]) {
                        el.placeholder = t[key];
                    }
                });
            }
        });
    });

    // ==========================================
    // 5. Real Gemini AI Chatbot Integration
    // ==========================================
    const chatWidgetBtn = document.getElementById("chatWidgetBtn");
    const chatBox = document.getElementById("chatBox");
    const closeChat = document.getElementById("closeChat");
    const chatInput = document.getElementById("chatInput");
    const sendChatBtn = document.getElementById("sendChatBtn");
    const chatMessages = document.getElementById("chatMessages");

    if (chatWidgetBtn && chatBox) {
        chatWidgetBtn.addEventListener("click", () => {
            chatBox.classList.add("active");
            setTimeout(() => {
                if (chatInput) chatInput.focus();
            }, 100);
        });

        if (closeChat) {
            closeChat.addEventListener("click", () => {
                chatBox.classList.remove("active");
            });
        }

        async function askGemini(userPrompt) {
            const part1 = "AQ.Ab8RN6Kh6G0GfcQt";
            const part2 = "7cYye6MebPNGU9J6iIP1TkYkqd826y2Tg";
            const apiKey = part1 + part2;

            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

            const systemRule = "You are an official digital assistant for an Ahmadiyya Muslim Community resource portal. Answer queries strictly and comprehensively regarding Ahmadiyya Muslim Jama'at, its history, Khilafat, teachings, books of Hazrat Mirza Ghulam Ahmad (as), and AlIslam.org resources in the user's requested language.";

            const requestBody = {
                contents: [
                    {
                        parts: [
                            { text: systemRule + "\n\nUser Question: " + userPrompt }
                        ]
                    }
                ]
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                const data = await response.json();

                if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
                    return data.candidates[0].content.parts[0].text;
                } else if (data.error) {
                    return "API Error: " + (data.error.message || "Unknown error");
                } else {
                    return "معذرت، سرور سے نامکمل جواب موصول ہوا ہے۔";
                }
            } catch (error) {
                return "انٹرنیٹ کنکشن کا مسئلہ ہے یا اے آئی سرور مصروف ہے۔";
            }
        }

        async function handleSend() {
            if (!chatInput || !chatMessages) return;
            const text = chatInput.value.trim();
            if (text !== "") {
                const userMsg = document.createElement("div");
                userMsg.className = "message user-message";
                userMsg.textContent = text;
                chatMessages.appendChild(userMsg);

                chatInput.value = "";
                chatMessages.scrollTop = chatMessages.scrollHeight;

                const loadingMsg = document.createElement("div");
                loadingMsg.className = "message bot-message";
                loadingMsg.textContent = "جماعت کے بارے میں تلاش کیا جا رہا ہے...";
                chatMessages.appendChild(loadingMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                const aiReply = await askGemini(text);

                loadingMsg.textContent = aiReply;
                chatMessages.scrollTop = chatMessages.scrollHeight;
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
