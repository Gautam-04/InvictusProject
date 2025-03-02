import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SignIn from "../../components/Auth/SignIn";
import SignUp from "../../components/Auth/SignUp";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import tree from "../../assets/react.svg";
import logo from "../../assets/icon.svg"

function Auth() {
const [key, setKey] = useState("login");

  const navigate = useNavigate();


  return (
    <>
    <section className="login-signup-page">
      <div className="login-signup-image">
        <img src={logo} alt="Forest illustration" />
      </div>

      <div className="login-signup-form-container">
        <h2>{key === "login" ? "Login" : "Sign Up"}</h2>
        <Tabs
          id="login-signup-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          fill
        >
          <Tab eventKey="login" title="Login">
            <SignIn />
          </Tab>
          <Tab eventKey="signup" title="SignUp">
            <SignUp />
          </Tab>
        </Tabs>
      </div>
    </section>
    </>
    
  );
}

export default Auth