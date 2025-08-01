import { X } from "lucide-react";
import React from "react";

function Modal() {
  return (
    <div className="absolute  w-full h-screen flex justify-center bg-black/50 items-center z-10 p-2">
      <div className="head bg-white min-h-50 max-w-xl p-5 rounded-2xl">
        <div className="head flex justify-between">
            <div className="heading"></div>
            <button className="cursor-pointer"><X strokeWidth={1} absoluteStrokeWidth /></button>
        </div>
        <div className="headline  text-center font-semibold">Attention Needed!</div>
        <p className="mt-4 sm:max-w-[80%] text-center mx-auto">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, unde! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, porro.</p>
        <div className="btns flex justify-between mt-5 gap-5 mb-2">
            <button className="w-full bg-gray-200 rounded-lg py-2 cursor-pointer">Back</button>
            <button className="w-full bg-black text-white rounded-lg py-2 cursor-pointer">Okay</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
