document.addEventListener("DOMContentLoaded", function () {
    const chatWidgetBtn = document.getElementById("chatWidgetBtn");
    const chatBox = document.getElementById("chatBox");
    const closeChat = document.getElementById("closeChat");
    const chatInput = document.getElementById("chatInput");
    const sendChatBtn = document.getElementById("sendChatBtn");
    const chatMessages = document.getElementById("chatMessages");

    if (chatWidgetBtn && chatBox) {
        chatWidgetBtn.addEventListener("click", () => {
            chatBox.classList.add("active");
            setTimeout(() => { if (chatInput) chatInput.focus(); }, 100);
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
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`;

            const systemRule = "You are an official digital assistant for an Ahmadiyya Muslim Community resource portal. Answer queries strictly and comprehensively regarding Ahmadiyya Muslim Jama'at, its history, Khilafat, teachings, books of Hazrat Mirza Ghulam Ahmad (as), and AlIslam.org resources.";

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
                    body: JSON.stringify({ contents: [{ parts: [{ text: systemRule + "\n\nUser Question: " + userPrompt }] }] })
                });
                const data = await response.json();
                if (data.candidates && data.candidates[0].content) return data.candidates[0].content.parts[0].text;
                return "معذرت، سرور سے جواب موصول نہیں ہوا۔";
            } catch (error) { return "انٹرنیٹ کنکشن کا مسئلہ ہے۔"; }
        }

        async function handleSend() {
            if (!chatInput || !chatMessages) return;
            const text = chatInput.value.trim();
            if (text !== "") {
                chatMessages.innerHTML += `<div class="message user-message">${text}</div>`;
                chatInput.value = "";
                const loadingMsg = document.createElement("div");
                loadingMsg.className = "message bot-message";
                loadingMsg.textContent = "تلاش کیا جا رہا ہے...";
                chatMessages.appendChild(loadingMsg);
                
                const aiReply = await askGemini(text);
                loadingMsg.textContent = aiReply;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }

        if (sendChatBtn) sendChatBtn.addEventListener("click", handleSend);
        if (chatInput) chatInput.addEventListener("keypress", (e) => { if (e.key === "Enter") handleSend(); });
    }
});
