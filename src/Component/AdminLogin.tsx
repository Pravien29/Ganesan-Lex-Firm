// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AdminLogin() {

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  

//   const handleLogin = async () => {

//     try {

//       const response = await fetch(
//         "http://localhost:5000/admin-login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             email,
//             password,

//           })
//         }
//       );

//       if (!response.ok) {
//         alert("Invalid email or password");
//         return;
//       }

//       const data = await response.json();

//       // save admin data
//       localStorage.setItem(
//         "admin",
//         JSON.stringify(data)
//       );

//       alert("Login successful");

//       // redirect
//       navigate("/admin");

//     } catch (error) {

//       console.log(error);

//       alert("Server error");

//     }
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f5f5f5"
//       }}
//     >

//       <div
//         style={{
//           width: "350px",
//           background: "#fff",
//           padding: "30px",
//           borderRadius: "10px",
//           boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
//         }}
//       >

//         <h2
//           style={{
//             textAlign: "center",
//             marginBottom: "20px"
//           }}
//         >
//           Advocate Login
//         </h2>

//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "12px",
//             marginBottom: "15px",
//             borderRadius: "5px",
//             border: "1px solid #ccc"
//           }}
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "12px",
//             marginBottom: "20px",
//             borderRadius: "5px",
//             border: "1px solid #ccc"
//           }}
//         />

//         <button
//           onClick={handleLogin}
//           style={{
//             width: "100%",
//             padding: "12px",
//             backgroundColor: "#4f46e5",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer"
//           }}
//         >
//           Login
//         </button>

//       </div>

//     </div>
//   );
// }

// export default AdminLogin;