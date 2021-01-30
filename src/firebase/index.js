import firebase from 'firebase/app';
import '@firebase/firestore';

const app = firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: "coder-reactjs-7130",
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
});

export function getFirebaseApp() {
    return app
};

export function getFirebase() {
    return firebase
}

export function getFirestore() {
    return firebase.firestore(app);
};
