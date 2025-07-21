import menu from "../assets/menu.png";
import search from "../assets/search.png";
import { FaPlus, FaCog } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import { WandSparkles } from "lucide-react";
import { useState } from "react";

const Sidebar = ({ chats, setActiveChatId, activeChatId, setChats }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleDelete = (id) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  return (
    <div
      className={`bg-[#282a2c] h-[auto] sm:h-screen flex flex-col justify-between p-4 transition-all duration-300
   ${collapsed ? "w-[70px]" : "w-full sm:w-[18%] sm:min-w-[220px]"}`}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div 
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-[#333638] px-2 py-2 rounded-full cursor-pointer tooltip"
          >
            <img className="w-4" src={menu} alt="Menu" />
            {collapsed && <span className="tooltip-text mt-7">Expand Menu</span>}
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-[#a2a9b0] text-2xl font-medium">Gemini</h1>
              <div className="rounded-full hover:bg-[#333638] px-1 py-1 text-center">
                <p className="text-[#a2a9b0] text-sm font-medium">2.5 Flash</p>
              </div>
            </div>
          )}

          {!collapsed && (
            <div className="hover:bg-[#333638] px-2 py-2 rounded-full">
              <img className="w-4" src={search} alt="Search" />
            </div>
          )}
        </div>

        <div className="tooltip w-full">
          <button
          className="flex items-center gap-6 p-2 hover:bg-[#333638] rounded-full text-sm w-full mb-2"
          onClick={() => setActiveChatId(null)}
        >
          <FaPlus className="text-base text-gray-500" />
          {!collapsed && (
            <span className="text-[#a2a9b0] font-medium">New chat</span>
          )}
        </button>
        {collapsed && <span className="tooltip-text">New Chat</span>}
        </div>

        <button className="flex tooltip items-center gap-6 p-2 hover:bg-[#333638] rounded-full text-sm w-full">
          <WandSparkles className="w-4 h-4 text-gray-500" />
          {!collapsed && (
            <span className="text-[#a2a9b0] font-medium">Explore Gems</span>
          )}
          {collapsed && <span className="tooltip-text">Explore more</span>}
        </button>

        {!collapsed && (
          <div className="mt-6 flex items-center justify-center text-gray-400 text-xs uppercase tracking-wide">
            <BiSolidMessageDetail className="text-gray-500" />
            <span className="text-[#a2a9b0] ml-4 font-bold">Recent Chats</span>
          </div>
        )}

        <div className="mt-2 space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`flex items-center justify-between p-2 rounded-full cursor-pointer hover:bg-[#333638] ${
                chat.id === activeChatId ? "bg-[#333638]" : ""
              }`}
            >
              {!collapsed && (
                <>
                  <span className="text-[#a2a9b0] ml-3 truncate w-[120px]">
                    {chat.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(chat.id);
                    }}
                    className="hover:text-red-400 text-xs ml-2"
                  >
                    ✕
                  </button>
                </>
              )}
              {collapsed && <BiSolidMessageDetail className="text-gray-500" />}
            </div>
          ))}
        </div>
      </div>

      <div className="tooltip w-full">
        <div className="text-gray-400 flex items-center gap-4 p-2 hover:bg-[#333638] rounded-full">
          <FaCog className="ml-1" />
          {!collapsed && (
            <span className="text-[#a2a9b0]">Settings and help</span>
          )}
          {collapsed && <span className="tooltip-text">Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
