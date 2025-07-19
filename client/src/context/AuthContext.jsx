import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // sign in with Google (only authentication method allowed)
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  }

  // logout the user
  const logout = () => {
    return signOut(auth);
  }

  // manage user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if(user) {
        const {email, displayName, photoURL} = user;
        const userData = {
          email, username: displayName, photo: photoURL
        };
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};