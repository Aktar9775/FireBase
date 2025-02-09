# Fireonway - React + Vite + Firebase

Fireonway is a modern web application built using **React + Vite** with **Firebase** for authentication, Firestore database, and API integrations.

## 🚀 Getting Started

### 1. Create React + vite Project
```sh
   npm create vite@latest
```

### 2. Install Dependencies
```sh
npm install
npm install firebase
```

### 3. Configure Firebase
Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/) and set up:
- Authentication (Email, Google Sign-In)
- Firestore Database
- Firebase Hosting (Optional)
- Firebase Functions (Optional for APIs)

#### Firebase Configuration
Copy your Firebase config :
```sh
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};
```

### 4. Running the Project
```sh
npm run dev
```

## 🔥 Firebase Authentication

### Email & Password Authentication
```js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig';

const auth = getAuth(app);

const registerUser = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};
```

### Google Authentication
```js
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
  await signInWithPopup(auth, provider);
};
```

## 📦 Firebase Firestore Database
```js
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

const addData = async () => {
  await addDoc(collection(db, 'users'), { name: 'John Doe', email: 'john@example.com' });
};

const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
};
```

## 📂 Firebase Storage
```js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage(app);

const uploadFile = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
```

## 🌐 Firebase Cloud Functions (API)
```js
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';

const functions = getFunctions(app);
const myFunction = httpsCallable(functions, 'myFunction');

const callApi = async () => {
  const response = await myFunction({ data: 'test' });
  console.log(response.data);
};
```

## 📌 Deployment (Optional)

### Firebase Hosting
```sh
npm run build
firebase deploy
```

## 🎯 Features
- 🔥 Firebase Authentication (Email & Google Login)
- 📂 Firebase Storage for uploading images/files
- 📦 Firestore Database for real-time data storage
- 🌐 Firebase Cloud Functions for APIs

Feel free to contribute and improve Firreonway! 🎉

