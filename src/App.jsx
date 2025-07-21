import { useEffect, useState } from "react";
import MainScreen from "./component/Main";
import Sidebar from "./component/Sidebar";
import "./App.css";

function App() {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chats");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  return (
    <div className="flex">
      <Sidebar
        chats={chats}
        setActiveChatId={setActiveChatId}
        activeChatId={activeChatId}
        setChats={setChats}
      />
      <MainScreen
        chats={chats}
        setChats={setChats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
      />
    </div>
  );
}

export default App;
