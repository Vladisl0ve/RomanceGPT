import React from "react";
import "./App.css";
import botImage from "./assets/images/paris.jpg";
import { MessageProps, Senders } from "./types";

const Message: React.FC<MessageProps> = ({ sender, text }) => {
   return (
      <div
         className={`message ${
            sender == Senders.Bot ? "message-bot" : "message-user"
         }`}
      >
         {sender === Senders.Bot ? (
            <>
               <img className="img-message-avatar" src={botImage} alt="kek" />
               {text}
            </>
         ) : (
            <>
               {text}
               <img className="img-message-avatar" src={botImage} alt="kek" />
            </>
         )}
      </div>
   );
};

export default Message;
