import React, { useState, useRef, useEffect } from 'react';
import "./Chatbot.css"
const faqs = {
  "hello": "Hi there! How can I assist you?",
  "hi": "Hello! How can I help you today?",
  "how are you": "I'm doing well, thank you for asking! How can I help you?",
  "how do I generate an image": "Simply describe what you want to see in natural language. Be as specific as possible about details like style, lighting, composition, and mood. For example: Create a watercolor painting of a cozy cafe in Paris at sunset with people sitting at outdoor tables.",
  "how long does it take to generate an image?": "Most images are generated within 10-30 seconds, depending on complexity and server load.",
  "how can I get better results?": "Be specific about details (colors, lighting, composition), Mention artistic style or reference artists, Include technical specifications (perspective, camera angle), Use descriptive adjectives, Specify what you don't want to see",
  "What types of images can't be generated?": "Explicit adult content, Violence or gore, Hate symbols, Celebrity deepfakes, Copyrighted characters, Personal information, Photorealistic faces of real people",
  "default": "I'm not sure about that. Please contact our support team for more detailed information.",
};

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatMessagesRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const getBotResponse = (message) => {
    const lowercaseMessage = message.toLowerCase();
    if (faqs[lowercaseMessage]) return faqs[lowercaseMessage];
    for (let key in faqs) {
      if (lowercaseMessage.includes(key)) return faqs[key];
    }
    return faqs.default;
  };

  const sendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage = { text: inputValue, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    const botResponse = getBotResponse(inputValue);
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    }, 500);

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <div className="chat-button" onClick={toggleChat} aria-label="Open chat">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      </div>

      {isChatOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h2>FAQ Chatbot</h2>
            <button className="close-button" onClick={toggleChat} aria-label="Close chat">×</button>
          </div>
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}-message`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              aria-label="Chat input"
            />
            <button onClick={sendMessage} aria-label="Send message">Send</button>
          </div>
        </div>
      )}

      
    </>
  );
}