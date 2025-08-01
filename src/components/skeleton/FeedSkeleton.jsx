import React from "react";

function FeedSkeleton() {
  const arr = [1, 2];
  return (
    <div className="py-5 mb-5">
      {arr.map((item) => (
        <div key={item} className="cover outline outline-gray-100 animate-pulse rounded-2xl p-3 mb-5">
          <div className="info flex gap-2 items-center mb-4">
            <div className="logo relative w-7 h-7  rounded-full overflow-hidden bg-gray-100 shadow"></div>
            <div className="">
              <div className="p text-[13px] w-15 h-2 rounded-2xl bg-gray-50"></div>
              <div className="p text-[13px] w-15 h-3 rounded-2xl mt-1 bg-gray-100"></div>
            </div>
          </div>
          <div className="container rounded-2xl overflow-hidden">
            <div className="img h-72  overflow-hidden  bg-gray-50"></div>
          </div>
          <div className="p text-[13px] w-96 mt-5 h-10 rounded-2xl bg-gray-50"></div>
          <div className="icons"></div>
        </div>
      ))}
    </div>
  );
}

export default FeedSkeleton;
