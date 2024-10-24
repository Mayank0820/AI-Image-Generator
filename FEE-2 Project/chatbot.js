const faqs = {
    "hello": "Hi there! How can I assist you?",
    "hi": "Hello! How can I help you today?",
    "how are you": "I'm doing well, thank you for asking! How can I help you?",
    "How do I generate an image?":"Simply describe what you want to see in natural language. Be as specific as possible about details like style, lighting, composition, and mood. For example: Create a watercolor painting of a cozy cafe in Paris at sunset with people sitting at outdoor tables.",
    "How long does it take to generate an image?":"Most images are generated within 10-30 seconds, depending on complexity and server load.",
    "How can I get better results?":"Be specific about details (colors, lighting, composition), Mention artistic style or reference artists,Include technical specifications (perspective, camera angle),Use descriptive adjectives,Specify what you don't want to see",
    "What types of images can't be generated?":"Explicit adult content, Violence or gore, Hate symbols, Celebrity deepfakes, Copyrighted characters, Personal information,  Photorealistic faces of real people"
    
};

function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = chatContainer.style.display === 'none' || chatContainer.style.display === '' 
        ? 'block' 
        : 'none';
    

    if (chatContainer.style.display === 'block') {
        document.getElementById('userInput').focus();
    }
}


function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim().toLowerCase();
    
    if (message === '') return;


    addMessage(input.value, 'user');
    

    const response = getBotResponse(message);
    setTimeout(() => addMessage(response, 'bot'), 500);


    input.value = '';
}


function getBotResponse(message) {

    if (faqs[message]) return faqs[message];

    for (let key in faqs) {
        if (message.includes(key)) return faqs[key];
    }

    return faqs.default;
}


function addMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});