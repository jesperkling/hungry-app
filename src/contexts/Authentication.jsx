import { createContext, useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  const signup = async (email, password, name) => {
    await createUserWithEmailAndPassword(auth, email, password);

    const docRef = doc(database, "users", auth.currentUser.uid);
    await setDoc(docRef, {
      name,
      email,
      admin: false,
    });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    // Listen to updates
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setUserName(user?.displayName);
      setUserEmail(user?.email);
      setLoading(false);

      if (user) {
        const docRef = doc(database, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAdmin(docSnap.data().admin);
        }
      } else {
        setAdmin(false);
      }
    });
    return unsubscribe;
  }, []);

  const values = {
    currentUser,
    signup,
    login,
    logout,
    userName,
    userEmail,
    admin,
  };

  return (
    <AuthContext.Provider value={values}>
      {loading ? (
        <div id="initial-loader">
          <h1>Loading..</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider as default, useAuthContext };
