import React, { useEffect } from 'react'
import { useFirebase } from '../context/Firebase'
function Orders() {
  const firebase = useFirebase();
  useEffect(()=>{
    firebase.fetchMyOrder();
  },[])
  return (
    <div>
     <h1>This is Order page</h1> 
    </div>
  )
}

export default Orders
