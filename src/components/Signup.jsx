import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firbase";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/authSlice";
import { useDispatch } from "react-redux";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
           const minimalUser = {
             uid: user.uid,
             email: user.email,
             displayName: user.displayName,
             photoURL: user.photoURL,
           };
           dispatch(setUser({ user: minimalUser, token }));
      navigate('/login')
    } catch (err) {
      console.error("Signup error:", err.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-4 max-w-md mx-auto space-y-3 text-center">
      <h2 className="text-xl font-bold">Signup</h2>
      <input
        className="border p-2 w-full rounded-lg"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full rounded-lg"
        type="password"
        placeholder="Password (6+ chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    
      <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
        Sign Up
      </button>
    </form>
  );
}
