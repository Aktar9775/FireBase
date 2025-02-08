import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useFirebase();  // Get current user from context
  const [data, setData] = useState(null);
  const [qnt, setQnt] = useState(1);
  const firebase = useFirebase();

  useEffect(() => {
    console.log("Current User:", currentUser);  // Debug log to check if user is null or not
    if (!currentUser) {
      navigate("/login");  // Redirect to login if the user is not logged in
    } else {
      // Fetch the book details if logged in
      console.log("Fetching book details for bookID:", params.bookID);
      firebase.GetbookID(params.bookID)
        .then((value) => {
          setData(value.data());
          console.log("Fetched book data:", value.data());
        })
        .catch((error) => {
          console.error("Error fetching book data:", error);
        });
    }
  }, [params.bookID, currentUser, navigate, firebase]);  // Ensure dependencies are handled properly

  if (data === null) return <h1>Loading...</h1>;  // Ensure this is displayed until the data is available

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const result = await firebase.placeOrder(params.bookID, Number(qnt));
      console.log("Order placed:", result);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className='container'>
      <h2 style={{ textAlign: "center", fontSize: "3rem" }}>Book Details</h2>
      <hr />
      <div className='row pt-5'>
        <div className="col-4">
          <img src={data.coverImage} className="rounded shadow-lg" alt="Book Cover" height={400} width={400} />
        </div>
        <div className="col">
          <h1>Title: {data.title}</h1>
          <h2>Written by: {data.author}</h2>
          <h3>Genre type: {data.genre}</h3>
          <div>
            <hr />
            <div className="d-flex justify-content-around">
              <div>
                <img src={data.userPhoto} className="rounded-circle" alt="User" height={150} width={200} />
              </div>
              <div>
                <h2>User Details</h2>
                <h4>UserName: {data.userName}</h4>
                <h4>Email: {data.email}</h4>
              </div>
            </div>
          </div>
          <hr />
          <div className='d-flex flex-wrap justify-content-between'>
            <h1>Price: {data.price} INR</h1>
            <div>
              <label htmlFor="number">Number of Book purchase:</label>
              <input
                type="number"
                onChange={(e) => setQnt(e.target.value)}
                value={qnt}
                placeholder='Enter Qty'
              />
            </div>
            <button onClick={placeOrder} className='btn btn-success'>Pay now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
