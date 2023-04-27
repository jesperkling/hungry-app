import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING,
	appId: import.meta.env.VITE_FIREBASE_APP,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT,
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const database = getFirestore(app)
const storage = getStorage(app)

export {
    app as default,
	analytics,
	auth,
    database,
    storage,
}