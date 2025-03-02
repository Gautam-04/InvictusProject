import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Main.css";
import { FaFacebook, FaGoogle, FaLinkedin, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        timestamp: serverTimestamp(),
      });

      toast.success("Sign up was successful");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with the registration");
      console.log(error);
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit} className="signup-form">
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />

      <div className="password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <span onClick={() => setShowPassword(!showPassword)} className="toggle-password-icon">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button type="submit" className="signup-btn">Sign Up</button>
      <div className="social-login">
      <p>Continue with</p>
      </div>
        <button type="button" className="social-btn google" onClick={googleAuth} aria-label="Sign in with Google">
          Google
        </button>
    </form>
  );
}

export default SignUp;
