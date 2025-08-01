import { useState } from "react";
import TweetInp from "./TweetInp";
import Feed from "./Feed";
import Settings from "./Settings";
import { useSelector } from "react-redux";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("feed");

  const user = useSelector((state) => state.auth.user);
  return (
    <div className=" relative min-h-screen mt-10">
      <div className="info flex justify-start gap-2">
        <div className="logo relative cursor-pointer logo w-10 h-10 bg-gray-100 shadow rounded-full flex justify-center items-center overflow-hidden">
          {user.photoURL && (
            <img
              src={user.photoURL ? user.photoURL : ""}
              alt=""
              className="w-full h-full object-cover absolute top-0"
            />
          )}
        </div>
        <div className="p">
          <div className="greet">
            Welcome, {user.displayName ? user.displayName : "Guest"}
          </div>
          <div className="greet text-xs">{user.email}</div>
        </div>
      </div>
      <TweetInp />
      <div className="sections mt-8 flex gap-5">
        <button
          onClick={() => setActiveTab("feed")}
          className={`text-lg ${
            activeTab == "feed" ? " underline underline-offset-6" : "opacity-60"
          } duration-200 transition-all cursor-pointer`}
        >
          Feed
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`text-lg ${
            activeTab == "settings"
              ? " underline underline-offset-6"
              : "opacity-60"
          } duration-200 transition-all cursor-pointer`}
        >
          Settings
        </button>
      </div>
      {activeTab == "feed" && <Feed />}
      {activeTab == "settings" && <Settings />}
    </div>
  );
}

export default Dashboard;
