import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {

  const [secretKey, setSecretKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {

    const response = await fetch(
      "http://localhost:5000/signup",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password,
          secretKey
        })
      }
    );

    const data = await response.json();
    if (data.success) {
    alert(data.msg);
      // Navigate to Admin Login page
      navigate("/adminlogin");
    } else {
      alert(data.msg);
    }

};

  return (

    <div>

       <input
        type="password"
        placeholder="Enter Secret Key"
        onChange={(e) => setSecretKey(e.target.value)}
        />

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>
        Signup
      </button>

    </div>

  );
}

export default Signup;