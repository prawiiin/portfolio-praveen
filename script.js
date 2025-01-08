document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const chatOutput = document.getElementById('chat-output');
    const chatSubmit = document.getElementById('chat-submit');

    async function fetchAIResponse(userMessage) {
        const response = await fetch('/.netlify/functions/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        if (response.ok) {
            return data.reply;
        } else {
            throw new Error(data.error || "Something went wrong.");
        }
    }

    async function handleChat() {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            const userBubble = document.createElement('div');
            userBubble.textContent = `You: ${userMessage}`;
            chatOutput.appendChild(userBubble);

            chatInput.value = '';
            chatOutput.scrollTop = chatOutput.scrollHeight;

            const botBubble = document.createElement('div');
            botBubble.textContent = "Bot: Typing...";
            chatOutput.appendChild(botBubble);

            try {
                const botResponse = await fetchAIResponse(userMessage);
                botBubble.textContent = `Bot: ${botResponse}`;
            } catch (error) {
                botBubble.textContent = "Bot: Sorry, something went wrong.";
            }

            chatOutput.scrollTop = chatOutput.scrollHeight;
        }
    }

    chatSubmit.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelectorAll('.section').forEach(section => {
            section.classList.toggle('dark-mode');
        });
        document.querySelectorAll('.btn-contact').forEach(button => {
            button.classList.toggle('dark-mode');
        });
    });
});
