import React from "react";
import "./App.css";
import botImage from "./assets/images/paris.jpg";
import { MessageProps, Senders } from "./types";

const Message: React.FC<MessageProps> = ({ sender, text, timeSent }) => {
   const formattedTime =
      timeSent instanceof Date ? timeSent.toLocaleTimeString() : "";

   return (
      <div
         className={`message ${
            sender === Senders.Bot ? "message-bot" : "message-user"
         }`}
      >
         <div>{text}</div>
         <img className="img-message-avatar" src={botImage} alt="user-avatar" />
         <div className="message-time">{formattedTime}</div>
      </div>
   );
};

export default Message;
