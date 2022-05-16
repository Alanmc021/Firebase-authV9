import { useState, createContext, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../services/FirebaseConfig";
import { Navigate } from "react-router-dom";
const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadStorageData = () => {
      const storageUser = sessionStorage.getItem("@AuthFirebase:user");
      const storageToken = sessionStorage.getItem("@AuthFirebase:token");
      if (storageToken && storageUser) {
        setUser(storageUser);
      }
    };
    loadStorageData();
  });

  function signInGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error) => {
        const res = error.email;
        console.log(res)
        //const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  function signInWithEmailAndPasswordInFirebase(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", "token");
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      })
  }

  function recoveryPassword(email) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }

  function createUserInFirebase(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  function signOut() {
    sessionStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  }

  return (
    <AuthGoogleContext.Provider
      value={{
        signed: !!user,
        user,
        signInGoogle,
        signOut,
        signInWithEmailAndPasswordInFirebase,
        recoveryPassword,
        createUserInFirebase
      }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};
