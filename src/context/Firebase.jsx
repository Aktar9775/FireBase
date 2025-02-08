import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import {getFirestore, collection, addDoc, getDocs, getDoc ,doc, query ,where} from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDa-BRUbbr7Cgfh9tQncAXBpEnndPjlDiY",
  authDomain: "fireonway-ae810.firebaseapp.com",
  projectId: "fireonway-ae810",
  storageBucket: "fireonway-ae810.firebasestorage.app",
  messagingSenderId: "557062663421",
  appId: "1:557062663421:web:96d24bd7460ea2cc01a294",
};
export const useFirebase = () => useContext(FirebaseContext);
const firebaseapp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseapp);
const firestore= getFirestore(firebaseapp);

const GoogleProvider = new GoogleAuthProvider();
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  const signupEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  const signinwithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);
  const signinWithGoogle = () => signInWithPopup(firebaseAuth, GoogleProvider);

const handleCreateNewList = async (book) => {
  if (!book.title || !book.author || !book.genre || !book.price) {
    throw new Error("Missing required fields");
  }

  await addDoc(collection(firestore, "books"), {
    title: book.title,
    author: book.author,
    genre: book.genre,
    price: book.price,
    coverImage: book.coverImage || "", // Ensure no undefined values
    userID: user.uid,
    email : user.email,
    userName: user.displayName,
    userPhoto: user.photoURL
  });
  console.log(user);
  
};

const listAllBooks =()=>{
  return getDocs(collection(firestore,'books'))
}
 
const GetbookID=async(id)=>{
const docref = doc(firestore, 'books', id);
const result = await getDoc(docref);
return result;
}

const fetchMyOrder= async()=>{
const collectionRef= collection(firestore, 'books');
const q = query (collectionRef, where("userID","==",user.uid))
const result= await getDocs(q);
console.log(result);

}

const placeOrder= async(bookID,qty)=>{
  const collectionref= collection(firestore, 'books',bookID, 'Orders');
  const result= await addDoc( collectionref,{
    userID: user.uid,
    email : user.email,
    userName: user.displayName,
    userPhoto: user.photoURL,
    qty,
  })
  return result
}

  const isLoggedIn= user ? true:false
  return (
    <FirebaseContext.Provider
      value={{
        currentUser:user,
        signupEmailAndPassword,
        signinwithEmailAndPassword,
        signinWithGoogle,
        handleCreateNewList,
        listAllBooks,
        GetbookID,
        placeOrder,
        fetchMyOrder,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
