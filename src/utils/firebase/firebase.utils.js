import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWwuPzREv-bts5LcE73A1RuTrvgFhM0e0",
  authDomain: "crown-clothing-db-d6040.firebaseapp.com",
  projectId: "crown-clothing-db-d6040",
  storageBucket: "crown-clothing-db-d6040.appspot.com",
  messagingSenderId: "791588396627",
  appId: "1:791588396627:web:5c71a0d90b6e1a785170a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const docRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = getDoc(docRef)
  if(!(await userSnapshot).exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(docRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log(error)
    }
    return userSnapshot
  }
}