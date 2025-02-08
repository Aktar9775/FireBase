import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { use } from "react";

function Login() {
 const firebase = useFirebase();
 const navigate= useNavigate()
   //console.log("Firebase Context:", firebase); // Debugging Firebase context
 
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
  //  console.log(firebase);
   
    useEffect(()=>{
      if(firebase.isLoggedIn){
          navigate("/")
      }
    },[firebase,navigate]);
   const handleSubmit = async (e) => {
     e.preventDefault();
     console.log("Login in a user ...");
 
     if (!email || !password) {
       console.error("Email and Password are required!");
       return;
     }
 
     try {
       const res = await firebase.signinwithEmailAndPassword(email, password);
       console.log("Login Successful", res);
     } catch (error) {
       console.error("Login Error:", error.message);
     }
   };
 
   return (
     <div className="container mt-5">
       <form onSubmit={handleSubmit}>
          <h1>Login</h1>
         <div className="mb-3">
           <label htmlFor="exampleInputEmail1" className="form-label">
             Email address
           </label>
           <input
             type="email"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             className="form-control"
             id="exampleInputEmail1"
             aria-describedby="emailHelp"
           />
           
         </div>
         <div className="mb-3">
           <label htmlFor="exampleInputPassword1" className="form-label">
             Password
           </label>
           <input
             type="password"
             onChange={(e) => setPassword(e.target.value)}
             value={password}
             className="form-control"
             id="exampleInputPassword1"
           />
         </div>
 
         <button type="submit" className="btn btn-primary">
          Login
         </button>
         <button className="btn btn-light border w-100 mt-3" onClick={firebase.signinWithGoogle}>
          <img 
            src="https://www.svgrepo.com/show/380993/google-logo-search-new.svg" 
            alt="Google Logo" 
            style={{ width: "20px", marginRight: "10px" }} 
          />
          Login with Google
        </button>
       </form>
     </div>
   );
}

export default Login
