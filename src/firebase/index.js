import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCG8N75st-klMsE9aMfkS_o0U68G7G4IKM",
	authDomain: "hungry-app-14b8d.firebaseapp.com",
	projectId: "hungry-app-14b8d",
	storageBucket: "hungry-app-14b8d.appspot.com",
	messagingSenderId: "338256780050",
	appId: "1:338256780050:web:0b3784b92d8b1dcabf31cb",
	measurementId: "G-FQKRZFQGFP"
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