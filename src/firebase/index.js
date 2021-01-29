import firebase from 'firebase/app';
import '@firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDOn4qyLl1FGjBQ3r8_owhVAs7WZc-Pc-I",
    authDomain: "coder-reactjs-7130.firebaseapp.com",
    projectId: "coder-reactjs-7130",
    storageBucket: "coder-reactjs-7130.appspot.com",
    messagingSenderId: "1015697010207",
    appId: "1:1015697010207:web:456da5872db0ff829f2f2a"
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
