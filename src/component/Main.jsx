import { FaMicrophone, FaPlus } from "react-icons/fa";
import { PiMagicWandFill } from "react-icons/pi";
import { LuImage } from "react-icons/lu";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { useState, useRef, useEffect } from "react";
import send from "../assets/send.png";
import { Url } from "../constants";
import Answers from "./Answers";

const Main = ({ chats, setChats, activeChatId, setActiveChatId }) => {
  const [question, setQuestion] = useState("");
  const scrollRef = useRef();

  const askQuestion = async () => {
    if (!question.trim()) return;

    const payload = {
      contents: [{ parts: [{ text: question }] }],
    };

    try {
      const res = await fetch(Url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      const answerParts = text.split("* ").map((item) => item.trim());

      if (!activeChatId) {
        const newId = Date.now().toString();
        const newChat = {
          id: newId,
          title: question.slice(0, 25),
          messages: [{ type: "q", text: question }, { type: "a", text: answerParts }],
        };
        setChats((prev) => [...prev, newChat]);
        setActiveChatId(newId);
      } else {
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === activeChatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    { type: "q", text: question },
                    { type: "a", text: answerParts },
                  ],
                }
              : chat
          )
        );
      }

      setQuestion("");
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats, activeChatId]);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  return (
    <div className="w-full min-h-screen bg-[#1e1e1e] text-white flex flex-col justify-between px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Gemini</h1>
          <button className="bg-[#2f3133] text-sm px-2 py-1 rounded-full text-[#c1c5c9] hover:bg-[#333638]">2.5 Flash ▾</button>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-[#373a3c] text-xs px-4 sm:px-6 py-2 rounded-lg text-white hover:bg-[#333638]">✦ Upgrade</button>
          <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" src="https://i.pravatar.cc/40?img=12" alt="Profile" />
        </div>
      </div>

      <div className="flex justify-center mt-10 flex-1 text-center px-4">
        <h2 className="text-2xl sm:text-3xl text-blue-500 font-medium">
          {activeChat ? "" : "Hello User, Ask me anything"}
        </h2>
      </div>

      <div
        ref={scrollRef}
        className={`transition-all mt-5 duration-300 px-2 sm:px-4 mb-4 overflow-y-auto ${
          activeChat?.messages?.length > 0 ? "h-[65vh] custom-scrollbar" : "h-0"
        }`}
      >
        <ul className="space-y-4 flex flex-col">
          {activeChat?.messages.map((item, index) => (
            <li key={index} className={`flex ${item.type === "q" ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2 rounded-2xl ${item.type === "q" ? "bg-blue-600" : "bg-[#2e2e2e]"} text-white max-w-[70%]`}>
                {Array.isArray(item.text)
                  ? item.text.map((line, idx) => <Answers key={idx} ans={line} />)
                  : <Answers ans={item.text} />}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center px-2 sm:px-0">
        <div className="bg-[#232324] mb-5 w-full max-w-3xl rounded-3xl px-4 py-4 sm:py-6 flex items-center gap-2 sm:gap-4 border border-gray-600 flex-wrap sm:flex-nowrap">
          <div className="hover:bg-[#333638] rounded-full px-2 py-2">
            <FaPlus title="Add files" className="text-[#a1a1aa]" />
          </div>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            type="text"
            placeholder="Ask Gemini"
            className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-400 min-w-[150px] sm:min-w-[180px]"
          />
          <div className="flex items-center gap-2 sm:gap-4 text-gray-400 text-sm">
            <img onClick={askQuestion} className="w-5 cursor-pointer" src={send} alt="Send" />
            <PiMagicWandFill className="text-lg" title="Deep Research" />
            <HiMiniSquares2X2 className="text-lg" title="Canvas" />
            <LuImage className="text-lg" title="Image" />
          </div>
          <FaMicrophone className="text-gray-400 text-lg" title="Microphone" />
        </div>
      </div>
    </div>
  );
};

export default Main;
