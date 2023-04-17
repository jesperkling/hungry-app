import { createContext, useContext, useState, useEffect } from 'react'
import { auth, database } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const AuthContext = createContext()

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = async (email, password, name) => {
		await createUserWithEmailAndPassword(auth, email, password)

		const docRef = doc(database, 'users', auth.currentUser.uid) 
		await setDoc(docRef, {
			name,
			email,
			admin: false,
		})
	}

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    // add auth-state observer 
	useEffect(() => {
		// listen for auth-state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setUserName(user?.displayName)
			setUserEmail(user?.email)
			setLoading(false)
		})

		return unsubscribe
	}, [])

    const values = {
        // everything the children needs
        currentUser,
		signup,
        login,
        logout,
		userName,
		userEmail,
    }

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
    )
}

export {
    AuthContextProvider as default,
    useAuthContext,
}