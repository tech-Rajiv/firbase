import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firbase"; // <-- your firebase config path

function Protection({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    //  console.log(user);
      if (!user) {
        navigate("/login", { replace: true });
      } else {
        setChecking(false);
      }
    });

    return () => unsubscribe();// clean up listener
  }, [navigate]);

  if (checking) return null; 

  return children;
}

export default Protection;
