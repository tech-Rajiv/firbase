// src/components/Login.js
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firbase";
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setAuthLoading, setUser } from "../features/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(setAuthLoading(true));
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred, "usecred");
      dispatch(
        setUser({ user: userCred.user, token: userCred.user.accessToken })
      );
      navigate("/tweets");
      dispatch(setAuthLoading(false));
    } catch (err) {
      setErrMsg("Email or Password is incorrect");
      console.error("err", err.message);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };


  return (
    <form
      onSubmit={handleLogin}
      className="p-4 max-w-md mx-auto space-y-3 text-center"
    >
      <h2 className="text-xl font-bold">Login</h2>
      <input
        className="border p-2 w-full rounded-lg"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setErrMsg("");
          setEmail(e.target.value);
        }}
        required
      />
      <input
        className="border p-2 w-full rounded-lg"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setErrMsg("");
          setPassword(e.target.value);
        }}
        required
      />
      {errMsg ? <p className="text-sm text-red-400">{errMsg}</p> : ""}
      <button className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
        Login
      </button>

      <br />
      <NavLink to={"/signup"} className=" underline ml-5">
        {" "}
        or Signup
      </NavLink>
    </form>
  );
}
