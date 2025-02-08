import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

function Card(props) {
  const navigate = useNavigate();
  //const firebase = useFirebase();
  const { currentUser } = useFirebase();

  const handleViewMoreClick = (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!currentUser) {
      alert("You must be logged in to view more details.");
      navigate("/login"); // Redirect to login page if not logged in
    } else {
      // Navigate to the detail page with the book ID
      navigate(`/book/view/${props.id}`);
    }
  };

  return (
    <div>
      <div className="card" style={{ width: "300px", margin: "10px" }}>
        <img src={props.coverImage} className="card-img-top" alt="..." height={200} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            The book title is "{props.title}" and it has a price: {props.price}
          </p>
          <button className="btn btn-primary" onClick={handleViewMoreClick}>View more...</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
