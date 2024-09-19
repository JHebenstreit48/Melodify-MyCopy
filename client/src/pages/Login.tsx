import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import '../pages/Login.css'; // CSS for styling

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  return (
    <div className="login-container">
      <img src="/src/assets/images/melodify-logo2.png" alt="Melodify Logo" className="logo" />
      <h2>{isRegister ? "Register Page" : "Login Page"}</h2>
      <div>
        {/* Toggle between Login and Register forms */}
        {isRegister ? <RegisterForm /> : <LoginForm />}
        <button className="toggle-button" onClick={toggleForm}>
          {isRegister
            ? "Already have an account? Login"
            : "New user? Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;