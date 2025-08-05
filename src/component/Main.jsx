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
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  const askQuestion = async () => {
    if (!question.trim()) return;

    const payload = {
      contents: [{ parts: [{ text: question }] }],
    };

    setIsTyping(true);

    try {
      const res = await fetch(Url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      const answerParts = text.split("* ").map((item) => item.trim());

      if (!activeChatId) {
        const newId = Date.now().toString();
        const newChat = {
          id: newId,
          title: question.slice(0, 25),
          messages: [
            { type: "q", text: question },
            { type: "a", text: answerParts },
          ],
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
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats, activeChatId, isTyping]);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  return (
    <div className="w-full h-screen  bg-gradient-to-br from-[#18181b] via-[#232526] to-[#1e1e1e] text-white flex flex-col justify-between px-2 sm:px-6 py-4 transition-all duration-300">
      {/* Header */}
      <div className="flex ml-12 sm:ml-12 items-center justify-between flex-wrap gap-2 pb-2 border-b border-white/10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-glow">
            Gemini
          </h1>
          <button className="bg-[#232324]/80 text-xs sm:text-sm px-3 py-1 rounded-full text-[#c1c5c9] hover:bg-[#333638] border border-[#333638] shadow transition">
            2.5 Flash ▾
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-gradient-to-r hidden md:block from-blue-600 to-purple-600 text-xs px-4 sm:px-6 py-2 rounded-lg text-white shadow hover:from-blue-500 hover:to-purple-500 transition font-semibold">
            ✦ Upgrade
          </button>
          <img
            className="w-9 h-9 hidden md:block sm:w-11 sm:h-11 rounded-full object-cover border-2 border-blue-500 shadow"
            src="https://i.pravatar.cc/40?img=12"
            alt="Profile"
          />
        </div>
      </div>

      {/* Welcome */}
      <div className="flex justify-center mt-10 flex-1 text-center px-2 sm:px-4">
        <h2 className="text-2xl sm:text-3xl text-blue-400 font-semibold drop-shadow-glow">
          {activeChat ? "" : "Hello User, Ask me anything"}
        </h2>
      </div>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className={`transition-all mt-5 duration-300 px-1 sm:px-4 mb-4 overflow-y-auto custom-scrollbar 
          ${activeChat?.messages?.length > 0 ? "h-[45vh] sm:h-[60vh]" : "h-0"}
        `}
      >
        <ul className="space-y-4 flex flex-col">
          {activeChat?.messages.map((item, index) => (
            <li
              key={index}
              className={`flex ${
                item.type === "q" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl shadow-lg transition-all whitespace-pre-line
                  ${
                    item.type === "q"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border border-blue-500/30"
                      : "bg-[#232324]/80 text-gray-100 border border-white/10"
                  }
                  max-w-[85vw] sm:max-w-[70%] text-left break-words`}
              >
                {Array.isArray(item.text) ? (
                  item.text.map((line, idx) => <Answers key={idx} ans={line} />)
                ) : (
                  <Answers ans={item.text} />
                )}
              </div>
            </li>
          ))}
          {isTyping && (
            <li className="flex justify-start">
              <div className="flex items-center gap-1 text-blue-400 font-medium">
                Gemini is typing
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-150">.</span>
                <span className="animate-bounce delay-300">.</span>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Input Area */}
      <div className="flex justify-center px-1 sm:px-0">
        <div
          className="bg-white/10 backdrop-blur-lg mb-5 w-full max-w-3xl rounded-3xl px-3 py-3 sm:py-5 flex items-center gap-2 sm:gap-4 border border-white/10 shadow-2xl
            flex-wrap sm:flex-nowrap transition-all focus-within:ring-2 focus-within:ring-blue-400"
        >
          <button
            className="hover:bg-blue-500/10 rounded-full p-2 transition"
            aria-label="Add files"
          >
            <FaPlus className="text-[#a1a1aa] text-lg" />
          </button>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askQuestion()}
            type="text"
            placeholder="Ask Gemini anything..."
            className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-400 min-w-[120px] sm:min-w-[180px] text-base sm:text-lg px-2"
            aria-label="Ask Gemini"
          />
          <div className="flex items-center gap- sm:gap-2 text-gray-400 text-base">
            <button
              onClick={askQuestion}
              className="p-2 rounded-full hover:bg-blue-600/20 transition group"
              aria-label="Send"
            >
              <img
                className="w-5 group-hover:scale-110 transition-transform"
                src={send}
                alt="Send"
              />
            </button>
            <button
              className="p-2 hidden md:block rounded-full hover:bg-purple-600/20 transition"
              aria-label="Deep Research"
            >
              <PiMagicWandFill className="text-lg" />
            </button>
            <button
              className="p-2 hidden md:block rounded-full hover:bg-pink-600/20 transition"
              aria-label="Canvas"
            >
              <HiMiniSquares2X2 className="text-lg" />
            </button>
            <button
              className="p-2 hidden md:block rounded-full hover:bg-green-600/20 transition"
              aria-label="Image"
            >
              <LuImage className="text-lg" />
            </button>
          </div>
          <button
            className="ml-2 p-2 rounded-full hover:bg-blue-600/20 transition"
            aria-label="Microphone"
          >
            <FaMicrophone className="text-gray-400 text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;