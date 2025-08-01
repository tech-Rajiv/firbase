import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firbase";
import { useSelector } from "react-redux";

function Header() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    if (token) {
      setIsLogedIn(true);
    }
  }, [token]);
  const handelLogout = () => {
    signOut(auth);
    localStorage.removeItem("token");
    setIsLogedIn(false);
    navigate("/");
  };
  return (
    <div className="sm:py-5 mb-5  py-3 flex  justify-between border-b border-gray-200">
      <h2 className="font-semibold">X</h2>
      <div className="btns flex gap-5">
        <NavLink to={"/tweets"}>Tweets</NavLink>
        <NavLink to={"/about"}>About</NavLink>
      </div>

      {isLogedIn ? (
        <button className="cursor-pointer bg-gray-100 px-2 py-2 rounded-lg" onClick={handelLogout}>
          Logout
        </button>
      ) : (
        <NavLink to={"/login"} className="bg-gray-100 px-2 py-2 rounded-lg">login</NavLink>

      )}
    </div>
  );
}

export default Header;
