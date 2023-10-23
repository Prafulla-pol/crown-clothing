import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,
   createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged  
} from 'firebase/auth'
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  const docRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = getDoc(docRef)
  if(!(await userSnapshot).exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(docRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })
    } catch (error) {
      console.log(error)
    }
    return userSnapshot
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

export const authSignOut = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);