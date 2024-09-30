// src/Chat.tsx
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import botImage from "./assets/images/paris.jpg";
import { MessageProps, Senders } from "./types";
import Message from "./Message";

const Chat: React.FC = () => {
   const [messages, setMessages] = useState<MessageProps[]>([]);
   const [input, setInput] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);

   const handleSend = async () => {
      if (input.trim() === "") return;

      const userMessage: MessageProps = { sender: Senders.User, text: input, timeSent: new Date() };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      try {
         const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
               model: "gpt-3.5-turbo", // or 'gpt-4' if you have access
               messages: [{ role: "user", content: input }],
            },
            {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${
                     import.meta.env.VITE_OPENAI_API_KEY
                  }`,
               },
            }
         );

         const botMessage: MessageProps = {
            sender: Senders.Bot,
            text: response.data.choices[0].message.content.trim(),
            timeSent: new Date()
         };
         setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
         console.error("Error fetching from OpenAI:", error);
         const errorMessage: MessageProps = {
            sender: Senders.Bot,
            text: "Sorry, there was an error processing your request.",
            timeSent: new Date()
         };
         setMessages((prev) => [...prev, errorMessage]);
      } finally {
         //await new Promise( res => setTimeout(res, 10000) );
         setLoading(false);
      }
   };

   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         handleSend();
      }
   };

   return (
      <div className="container">
         <div className="chatWindow">
            {messages.map((msg, index) => (
               <Message sender={msg.sender} text={msg.text} timeSent={msg.timeSent}></Message>
            ))}
            {loading && (
               <div className={`message message-botTyping`}>
                  Bot is typing...
               </div>
            )}
         </div>
         <div className="inputContainer">
            <input
               className="input"
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyPress}
               placeholder="Type your message..."
            />
            <button className="button" onClick={handleSend} disabled={loading}>
               Send
            </button>
         </div>
      </div>
   );
};

export default Chat;
