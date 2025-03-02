import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Main.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Add eye icons for password toggle
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
// import axios from "axios";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

    async function googleAuth() {
      try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
  
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
  
        if (!docSnap.exists()) {
          await setDoc(docRef, {
            name: user.displayName,
            email: user.email,
            timestamp: serverTimestamp(),
          });
        }
  
        navigate("/");
      } catch (error) {
        toast.error("Could Not Authenticate with Google!");
        console.log(error);
      }
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if(userCredential.user){
        navigate("/")
      }
    } catch (error) {
      toast.error("Bad Sign-In Credentials",error);
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <div className="password-input-container">
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Password" 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <span onClick={() => setShowPassword(!showPassword)} className="toggle-password-icon">
          {showPassword ? <FaEyeSlash /> : <FaEye />} 
        </span>
      </div>

      <button type="submit">Login</button>

      <div className="social-login">
        <p>Continue with</p>
      </div>
      <button type="button" className="social-btn google" onClick={googleAuth} aria-label="Sign in with Google">
          Google
        </button>
    </form>
  );
}

export default SignIn;