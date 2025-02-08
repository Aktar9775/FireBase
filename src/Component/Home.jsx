import React, {useEffect, useState} from 'react'
import { useFirebase } from '../context/Firebase'
import Card from "../Component/Card";
function Home() {
  const [Book, setBook]=useState([]);

  const firebase= useFirebase();
   useEffect(()=>{
      //firebase.listAllBooks().then(docs=>console.log(docs.docs[1].data().title));
      firebase.listAllBooks().then((Book)=>setBook(Book.docs))

   },[]);
   if(Book==null) return <h1>Loading...</h1>

  return (
    <div>
      <h1 className="glow" style={{fontWeight:"bold", alignContent:"center", textAlign:"center",fontSize:"5rem",
        
       }}> <img src="https://res.cloudinary.com/hevo/image/upload/f_auto,q_auto/v1618982001/hevo-learn/image00.png" alt="" height={250}/></h1>
        <div className='container d-flex g-2 p-3 flex-wrap' >
           {Book.map(books => <Card key={books.id} id={books.id} {...books.data()}/>)}
        </div>


    </div>


  )
}

export default Home
