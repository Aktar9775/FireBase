import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";
function BookForm() {
 const firebase= useFirebase()
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    coverImage: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!book.title || !book.author || !book.genre || !book.price) {
      return alert("Please fill in all required fields.");
    }
  
    try {
      await firebase.handleCreateNewList({ ...book, coverImage: book.coverImage || "" });
      alert("Book Registered Successfully!");
      setBook({ title: "", author: "", genre: "", price: "", coverImage: "" });
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to register book.");
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register a New Book</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <div className="mb-3">
          <label className="form-label">Book Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Genre</label>
          <select
            className="form-select"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Science Fiction">Science Fiction</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={book.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cover Image URL</label>
          <input
            type="url"
            className="form-control"
            name="coverImage"
            value={book.coverImage}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn" style={{backgroundColor:"rgb(230, 243, 255)"}}>
          Register Book 📚
        </button>
      </form>
    </div>
  );
}

export default BookForm;
