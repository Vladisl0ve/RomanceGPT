// src/Chat.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}


const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
          messages: [{ role: 'user', content: input }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const botMessage: Message = {
        sender: 'bot',
        text: response.data.choices[0].message.content.trim(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
      const errorMessage: Message = {
        sender: 'bot',
        text: 'Sorry, there was an error processing your request.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="container">
      <div className='chatWindow'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.message, alignSelf: 'flex-start' }}>
            Bot is typing...
          </div>
        )}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.input}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} style={styles.button} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '70vh',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box',
    textAlign: 'center'
  },
  chatWindow: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#f9f9f9',
  },
  message: {
    maxWidth: '80%',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
  },
  inputContainer: {
    display: 'flex',
    marginTop: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};


export default Chat;
