import React, { useState } from "react";
import { Heart, MessageCircleMore } from "lucide-react";

function SingleFeed({ feed }) {
  const [expandedObj, setExpandedObj] = useState({});
  function getDifference(time) {
    const date = new Date(time);
    const now = new Date();
    const diffMints = Math.floor((now - date) / 1000 / 60);
    if (diffMints < 60) {
      return `${diffMints} minutes ago`;
    }
    const diffHours = Math.floor(diffMints / 60);
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  }

  const handelExpand = (id) => {
    setExpandedObj((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="py-5 mb-5">
      {feed &&
        feed.map((tweet) => {
          const expanded = expandedObj[tweet.id];
          return (
            <div
              key={tweet.id}
              className="cover outline outline-gray-100 rounded-2xl p-3 mb-5"
            >
              <div className="info flex gap-2 items-center mb-4">
                <div className="logo relative w-7 h-7  rounded-full overflow-hidden bg-gray-200 shadow">
                  {tweet.authorPhoto && (
                    <img
                      src={tweet.authorPhoto}
                      alt=""
                      className="w-full h-full object-cover absolute top-0"
                    />
                  )}
                </div>
                <div className="">
                  <div className="p text-[13px]">{tweet.author}</div>
                  <div className="p text-[9px]">
                    {getDifference(tweet.createdAt)}
                  </div>
                </div>
              </div>
              <div className="container rounded-2xl overflow-hidden">
                {tweet.tweetImage && (
                  <div className="img h-72 max-h-96 overflow-hidden  bg-gray-50">
                    <img
                      src={tweet.tweetImage}
                      alt="image"
                      className="w-full h-full object-contain "
                    />
                  </div>
                )}
              </div>
              <div
                className={`data mt-4  px-1 ${expanded ? "" : "line-clamp-2"}`}
              >
                {tweet.tweet}
              </div>
              <div className="seemore">
                {tweet.tweet.length > 100 && (
                  <button
                    onClick={() => handelExpand(tweet.id)}
                    className="text-blue-500 text-sm mt-1 ml-1 cursor-pointer"
                  >
                    {expanded ? "See less" : "See more"}
                  </button>
                )}
              </div>
              <div className="likeComm mt-4 flex mb-3 gap-8 px-2">
                <button onClick={()=>{}} className="like flex gap-2 cursor-pointer"><Heart  /> {tweet.likes.length}</button>
                <button onClick={()=>{}} className="like flex gap-2 cursor-pointer"><MessageCircleMore /> {tweet.comments.length}</button>
              </div>
              <div className="icons"></div>
            </div>
          );
        })}
      <div className="icons text-xs px-2 flex mt-1"></div>
    </div>
  );
}

export default SingleFeed;

/**
 * <div className="like">
            like: 0
          </div>
 */
