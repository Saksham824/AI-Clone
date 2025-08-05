import menu from "../assets/menu.png";
import search from "../assets/search.png";
import { FaPlus, FaCog } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import { WandSparkles } from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = ({ chats, setActiveChatId, activeChatId, setChats }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setShowSidebar(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = (id) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  return (
    <>
      {/* Menu button fixed for mobile only */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setShowSidebar((prev) => !prev)}
            className="bg-gradient-to-br from-[#232526] to-[#414345] shadow-lg p-2 rounded-full hover:scale-105 transition"
          >
            <img src={menu} alt="Menu" className="w-5" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div
          className={`fixed sm:static z-40 bg-gradient-to-br from-[#232526] to-[#414345] shadow-2xl border-r border-[#333638]/40 h-screen flex flex-col justify-between p-4 transition-all duration-300
          ${collapsed ? "w-[70px]" : "w-[80vw] sm:w-[20%] sm:min-w-[240px]"}`}
        >
          <div>
            {/* Top Row */}
            <div className="flex items-center justify-between mb-8">
              <div
                onClick={() => setCollapsed(!collapsed)}
                className="hover:bg-[#333638]/60 px-2 py-2 rounded-full cursor-pointer relative group"
              >
                <img className="w-5" src={menu} alt="Menu" />
                {collapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition">
                    Expand Menu
                  </span>
                )}
              </div>

              {!collapsed && (
                <>
                  <div className="flex flex-col items-center">
                    
                    <h1 className="text-[#e0e6ed] text-xl font-semibold tracking-wide">
                      Gemini
                    </h1>
                    <div className="rounded-full bg-[#333638]/60 px-2 py-1 text-center mt-1">
                      <p className="text-[#a2a9b0] text-xs font-medium">
                        2.5 Flash
                      </p>
                    </div>
                  </div>
                  <div className="hover:bg-[#333638]/60 px-2 py-2 rounded-full">
                    <img className="w-5" src={search} alt="Search" />
                  </div>
                </>
              )}
            </div>

            {/* New Chat Button */}
            <div className="relative group w-full">
              <button
                className="flex items-center gap-6 p-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full text-sm w-full mb-3 shadow-md transition"
                onClick={() => setActiveChatId(null)}
              >
                <FaPlus className="text-base" />
                {!collapsed && (
                  <span className="font-medium">New chat</span>
                )}
              </button>
              {collapsed && (
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition">
                  New Chat
                </span>
              )}
            </div>

            {/* Explore Button */}
            <div className="relative group">
              <button className="flex items-center gap-6 p-2 hover:bg-[#333638]/60 rounded-full text-sm w-full text-[#a2a9b0] transition">
                <WandSparkles className="w-5 h-5 text-purple-400" />
                {!collapsed && (
                  <span className="font-medium">Explore Gems</span>
                )}
                {collapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition">
                    Explore more
                  </span>
                )}
              </button>
            </div>

            {/* Recent Chats */}
            {!collapsed && (
              <div className="mt-8 flex items-center justify-center text-gray-400 text-xs uppercase tracking-wide">
                <BiSolidMessageDetail className="text-blue-400" />
                <span className="text-[#a2a9b0] ml-4 font-bold">
                  Recent Chats
                </span>
              </div>
            )}

            {/* Chat Items */}
            <div className="mt-3 space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`flex items-center justify-between p-2 rounded-full cursor-pointer transition hover:bg-[#333638]/80 ${
                    chat.id === activeChatId
                      ? "bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow"
                      : ""
                  }`}
                >
                  {!collapsed ? (
                    <>
                      <span className="ml-3 truncate w-[120px]">
                        {chat.title}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(chat.id);
                        }}
                        className="hover:text-red-400 text-xs ml-2 transition"
                        title="Delete chat"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <BiSolidMessageDetail className="text-blue-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Settings */}
          <div className="relative group w-full">
            <div className="text-gray-400 flex items-center gap-4 p-2 hover:bg-[#333638]/60 rounded-full cursor-pointer transition">
              <FaCog className="ml-1" />
              {!collapsed && (
                <span className="text-[#a2a9b0]">Settings and help</span>
              )}
              {collapsed && (
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition">
                  Settings
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;