import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Protection from "./Protection";
import Header from "./components/Header";
import Home from "./components/Home";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { setUser } from "./features/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firbase";
import useTweetAPI from "./hooks/useTweetAPI";
import About from "./components/About";

function App() {
  const dispatch = useDispatch();
  useTweetAPI();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("User is logged in:", user.email);
      const token = await user.getIdToken();
      const minimalUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      dispatch(setUser({ user: minimalUser, token }));
    } else {
      console.log("User is logged out.");
    }
  });
  return (
    <div className="relative bg-gray-100">
      {/* <Modal /> */}
      <div className="container max-w-2xl mx-auto min-h-screen bg-white px-2 py-2 sm:py-5 sm:px-10">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/tweets"
            element={
              <Protection>
                <Dashboard />
              </Protection>
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
