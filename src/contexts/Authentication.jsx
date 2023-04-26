import { createContext, useContext, useState, useEffect } from "react";
import { auth, database, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  const signup = async (email, password, name, photo) => {
    await createUserWithEmailAndPassword(auth, email, password);

    const photoPic = await setDisplayPhoto(photo);
		setUserPhoto(photoPic);

    const docRef = doc(database, "users", auth.currentUser.uid);
    await setDoc(docRef, {
      name,
      email,
      photoURL: photoPic ? photoPic : null,
      admin: false,
    });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const setDisplayPhoto = async (photo) => {
		let photoURL = auth.currentUser.photoURL

		if (photo) {
			const fileRef = ref(storage, `photos/${auth.currentUser.email}/${photo.name}`);
			const uploadResult = await uploadBytes(fileRef, photo);

			photoURL = await getDownloadURL(uploadResult.ref);

			console.log("Photo has been uploaded:", photoURL);

			return photoURL
		}
	};

  const getAllUsers = async () => {
    const usersRef = collection(database, "users");
    const usersSnap = await getDocs(usersRef);
    const users = usersSnap.docs.map((doc) => doc.data());
    console.log(users);
    return users;
  };

  useEffect(() => {
    // Listen to updates
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setUserName(user?.displayName);
      setUserEmail(user?.email);
      setUserPhoto(user?.photoURL);
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
    setDisplayPhoto,
    userName,
    userEmail,
    userPhoto,
    admin,
    getAllUsers,
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
