"use client";
import React, { useState } from "react";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setChatHistory((prev) => [...prev, { user: userInput, bot: "Typing..." }]);
    setUserInput("");

    try {
      const response = await fetch("api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      console.log(data);
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { user: userInput, bot: data.botReply || "Sorry no response." },
      ]);
    } catch (error) {
      console.error("error:", error);
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { user: userInput, bot: "Something went wrong." },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4 max-w-xl mx-auto">
      <div className="w-full bg-gray-100 p-4 rounded-lg h-96 overflow-y-scroll">
        {chatHistory.map((chat, index) => (
          <div key={index} className="mb-2">
            <p className="text-blue-600">
              <strong>You:</strong> {chat.user}
            </p>
            <p className="text-gray-800">
              <strong>Bot:</strong> {chat.bot}
            </p>
          </div>
        ))}
      </div>

      <div className="flex w-full space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
