document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // AI ASSISTANT - CHAT FUNCTIONALITY
    // ==========================================

    const chatWidgetBtn = document.getElementById("chatWidgetBtn");
    const chatBox = document.getElementById("chatBox");
    const closeChat = document.getElementById("closeChat");
    const chatInput = document.getElementById("chatInput");
    const sendChatBtn = document.getElementById("sendChatBtn");
    const chatMessages = document.getElementById("chatMessages");

    if (!chatWidgetBtn || !chatBox || !chatInput || !sendChatBtn || !chatMessages) {
        return;
    }

    // ==========================================
    // OPEN CHAT
    // ==========================================

    function openChat() {
        chatBox.classList.add("active");
        chatBox.setAttribute("aria-hidden", "false");
        chatWidgetBtn.setAttribute("aria-expanded", "true");

        setTimeout(function () {
            chatInput.focus();
        }, 300);
    }

    // ==========================================
    // CLOSE CHAT
    // ==========================================

    function closeChatBox() {
        chatBox.classList.remove("active");
        chatBox.setAttribute("aria-hidden", "true");
        chatWidgetBtn.setAttribute("aria-expanded", "false");
    }

    // ==========================================
    // BUTTON EVENTS
    // ==========================================

    chatWidgetBtn.addEventListener("click", function () {
        if (chatBox.classList.contains("active")) {
            closeChatBox();
        } else {
            openChat();
        }
    });

    if (closeChat) {
        closeChat.addEventListener("click", closeChatBox);
    }

    // ==========================================
    // KEYBOARD ACCESS
    // ==========================================

    chatWidgetBtn.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();

            if (chatBox.classList.contains("active")) {
                closeChatBox();
            } else {
                openChat();
            }
        }
    });

    // ==========================================
    // ADD MESSAGE
    // ==========================================

    function addMessage(text, type) {

        const message = document.createElement("div");

        message.classList.add("message");

        if (type === "user") {
            message.classList.add("user-message");
        } else {
            message.classList.add("bot-message");
        }

        message.textContent = text;

        chatMessages.appendChild(message);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // ==========================================
    // TYPING INDICATOR
    // ==========================================

    function showTyping() {

        const typing = document.createElement("div");

        typing.classList.add("message", "bot-message");
        typing.id = "typingMessage";

        typing.textContent = "۔۔۔";

        chatMessages.appendChild(typing);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTyping() {

        const typing = document.getElementById("typingMessage");

        if (typing) {
            typing.remove();
        }
    }

    // ==========================================
    // LOCAL ANSWER DATABASE
    // ==========================================

    function getAnswer(question) {

        const q = question.toLowerCase().trim();

        // Greeting
        if (
            q.includes("السلام علیکم") ||
            q.includes("assalam") ||
            q.includes("salam") ||
            q === "hi" ||
            q === "hello"
        ) {
            return "وعلیکم السلام ورحمۃ اللہ وبرکاتہ! خوش آمدید۔ آپ جماعتِ احمدیہ، اسلام، قرآن، خلافت یا کسی دوسرے دینی موضوع کے بارے میں سوال کر سکتے ہیں۔";
        }

        // Ahmadiyya
        if (
            q.includes("احمدیہ") ||
            q.includes("احمدی") ||
            q.includes("ahmadi")
        ) {
            return "احمدیہ مسلم جماعت ایک عالمی روحانی اور اصلاحی جماعت ہے جس کی بنیاد حضرت مرزا غلام احمد قادیانی علیہ السلام نے 1889ء میں قادیان میں رکھی۔ جماعت اسلام کی حقیقی اور پُرامن تعلیمات کے فروغ پر زور دیتی ہے۔";
        }

        // Founder
        if (
            q.includes("بانی") ||
            q.includes("founder") ||
            q.includes("مرزا غلام احمد")
        ) {
            return "احمدیہ مسلم جماعت کے بانی حضرت مرزا غلام احمد قادیانی علیہ السلام ہیں۔ آپ نے 1889ء میں بیعت کا آغاز فرمایا۔ جماعت آپ کو مسیح موعود اور مہدی مانتی ہے۔";
        }

        // Khilafat
        if (
            q.includes("خلافت") ||
            q.includes("خلیفہ") ||
            q.includes("khilafat") ||
            q.includes("khalifa")
        ) {
            return "خلافتِ احمدیہ کا آغاز حضرت مسیح موعود علیہ السلام کی وفات کے بعد 1908ء میں ہوا۔ خلافت جماعت کی روحانی قیادت اور اتحاد کا مرکزی نظام ہے۔";
        }

        // Holy Quran
        if (
            q.includes("قرآن") ||
            q.includes("quran") ||
            q.includes("quran")
        ) {
            return "قرآن کریم اللہ تعالیٰ کی آخری مکمل کتابِ ہدایت ہے۔ ہماری ویب سائٹ کے قرآن سیکشن میں عربی متن اور مختلف زبانوں کے تراجم دستیاب ہیں۔";
        }

        // Islam
        if (
            q.includes("اسلام") ||
            q.includes("islam")
        ) {
            return "اسلام توحید، عبادت، نیکی، عدل، رحم اور انسانیت کی خدمت کی تعلیم دیتا ہے۔ احمدیہ مسلم جماعت اسلام کی ان بنیادی تعلیمات کو دنیا میں عام کرنے پر زور دیتی ہے۔";
        }

        // Five pillars
        if (
            q.includes("ارکان") ||
            q.includes("پانچ") ||
            q.includes("5 pillars") ||
            q.includes("five pillars")
        ) {
            return "اسلام کے پانچ بنیادی ارکان کلمہ شہادت، نماز، روزہ، زکوٰۃ اور حج ہیں۔";
        }

        // Salat
        if (
            q.includes("نماز") ||
            q.includes("salat") ||
            q.includes("namaz")
        ) {
            return "نماز اسلام کی بنیادی عبادات میں سے ہے اور اللہ تعالیٰ سے تعلق مضبوط کرنے کا اہم ذریعہ ہے۔";
        }

        // Fasting
        if (
            q.includes("روزہ") ||
            q.includes("ramzan") ||
            q.includes("رمضان") ||
            q.includes("fasting")
        ) {
            return "روزہ اسلام کی اہم عبادات میں سے ہے۔ رمضان المبارک میں مسلمان طلوعِ فجر سے غروبِ آفتاب تک روزہ رکھتے ہیں اور عبادت و نیکی میں اضافہ کرتے ہیں۔";
        }

        // Zakat
        if (
            q.includes("زکوۃ") ||
            q.includes("زکوٰۃ") ||
            q.includes("zakat")
        ) {
            return "زکوٰۃ اسلام کے بنیادی ارکان میں سے ہے اور صاحبِ نصاب مسلمانوں پر مقررہ شرائط کے مطابق فرض ہوتی ہے۔";
        }

        // Ruhani Khazain
        if (
            q.includes("روحانی خزائن") ||
            q.includes("ruhani khazain")
        ) {
            return "روحانی خزائن حضرت مرزا غلام احمد قادیانی علیہ السلام کی تصانیف کا مجموعہ ہے۔ ان کتب میں اسلامی عقائد، قرآن، روحانیت اور مختلف دینی موضوعات پر تفصیلی بحث ملتی ہے۔";
        }

        // MTA
        if (
            q.includes("mta") ||
            q.includes("ایم ٹی اے") ||
            q.includes("مسلم ٹیلی ویژن")
        ) {
            return "MTA International ایک عالمی اسلامی ٹیلی ویژن نیٹ ورک ہے جو دینی پروگرامز، خطابات، خطبات اور مختلف تعلیمی و تربیتی پروگرام نشر کرتا ہے۔";
        }

        // Jalsa
        if (
            q.includes("جلسہ") ||
            q.includes("jalsa")
        ) {
            return "جلسہ سالانہ ایک سالانہ دینی اور تربیتی اجتماع ہے جس میں تقاریر، دعائیں اور مختلف اصلاحی و تربیتی پروگرام شامل ہوتے ہیں۔";
        }

        // Humanity First
        if (
            q.includes("humanity first") ||
            q.includes("ہیومینٹی فرسٹ")
        ) {
            return "ہیومینٹی فرسٹ ایک بین الاقوامی رفاہی ادارہ ہے جو مختلف ممالک میں ضرورت مند اور آفت زدہ لوگوں کی مدد کے لیے انسانی خدمت کے منصوبے انجام دیتا ہے۔";
        }

        // Waqf-e-Nau
        if (
            q.includes("وقف نو") ||
            q.includes("وقفِ نو") ||
            q.includes("waqf e nau")
        ) {
            return "وقفِ نو ایک تربیتی اور خدمتِ دین کی تحریک ہے جس میں والدین اپنے بچوں کو دینی خدمت کے لیے وقف کرتے ہیں۔";
        }

        // Contact
        if (
            q.includes("رابطہ") ||
            q.includes("contact")
        ) {
            return "رابطے اور مزید معلومات کے لیے ویب سائٹ کے مینو میں موجود 'ہم سے رابطہ کریں' کا لنک استعمال کریں۔";
        }

        // Help
        if (
            q.includes("مدد") ||
            q.includes("help") ||
            q.includes("کیا کر سکتے") ||
            q.includes("what can you")
        ) {
            return "میں آپ کو احمدیہ مسلم جماعت، قرآن، خلافت، نماز، اسلامی تعلیمات، روحانی خزائن، MTA اور ویب سائٹ کے مختلف حصوں کے بارے میں بنیادی معلومات دے سکتا ہوں۔";
        }

        // Default
        return "آپ کا سوال موصول ہوا۔ اس موضوع کے بارے میں میرے پاس اس وقت محدود معلومات ہیں۔ براہِ کرم سوال کو تھوڑا واضح کرکے دوبارہ لکھیں، مثلاً: 'خلافت کیا ہے؟' یا 'روحانی خزائن کیا ہیں؟'";
    }

    // ==========================================
    // SEND MESSAGE
    // ==========================================

    function sendMessage() {

        const question = chatInput.value.trim();

        if (!question) {
            return;
        }

        // User message
        addMessage(question, "user");

        // Clear input
        chatInput.value = "";

        // Typing animation
        showTyping();

        // Small delay for natural response
        setTimeout(function () {

            removeTyping();

            const answer = getAnswer(question);

            addMessage(answer, "bot");

        }, 700);
    }

    // ==========================================
    // SEND BUTTON
    // ==========================================

    sendChatBtn.addEventListener("click", function () {
        sendMessage();
    });

    // ==========================================
    // ENTER KEY
    // ==========================================

    chatInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }

    });

    // ==========================================
    // ESCAPE KEY CLOSE
    // ==========================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (chatBox.classList.contains("active")) {
                closeChatBox();
            }

        }

    });

});