import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const firebase = useFirebase();
   const navigate= useNavigate()
  
  //console.log("Firebase Context:", firebase); // Debugging Firebase context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    // useEffect(()=>{
    //   if(firebase.isLoggedIn){
    //       navigate("/")
    //   }
    // },[firebase,navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing in a user ...");


   
      const res = await firebase.signupEmailAndPassword(email, password);
      console.log("Signup Successful", res);
    
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
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
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
          Create Account
        </button>
        <hr />

        <button  className="btn btn-light border w-100 mt-3">
        <img 
          src="https://www.svgrepo.com/show/380993/google-logo-search-new.svg" 
          alt="Google Logo" 
          onClick={firebase.signinWithGoogle}
          style={{ width: "20px", marginRight: "10px" }} 
        />
  Sign Up with Google
</button>

      </form>

    </div>
  );
}

export default Signup;
