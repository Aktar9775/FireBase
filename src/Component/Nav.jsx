import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase auth functions

function Nav() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Check Firebase login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
        navigate("/"); // Redirect to home page if logged in
      } else {
        setUser(null); // Set user to null if logged out
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth, navigate]);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/Login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand fw-bold" href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/512px-Flat_tick_icon.svg.png"
              alt="Logo"
              width="35"
              height="35"
              className="d-inline-block align-text-top me-2"
            />
            MyBrand
          </a>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Bookform">
                  BookForm
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/BookOrders">
                  Orders
                </a>
              </li>
            </ul>

            {/* Search Bar */}
            <form className="d-flex me-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-light" type="submit">
                🔍
              </button>
            </form>

            {/* Authentication Section */}
            {user ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">Welcome, {user.email}</span>
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <a href="/Login" className="btn btn-outline-light me-2">
                  Login
                </a>
                <a href="/Signin" className="btn btn-light">
                  Signup
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
