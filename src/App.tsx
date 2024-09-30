// src/App.tsx
import React from "react";
import Chat from "./Chat";

const App: React.FC = () => {
   return (
      <div className="root">
         <h1 style={{ textAlign: "center" }}>ChatGPT React App</h1>
         <Chat />
      </div>
   );
};

export default App;
