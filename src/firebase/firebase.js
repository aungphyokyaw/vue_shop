import firebase from "firebase";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAr7j67kGztqjsypAMqW4tshpZBuAFu4es",
    authDomain: "shopping-a80be.firebaseapp.com",
    projectId: "shopping-a80be",
    storageBucket: "shopping-a80be.appspot.com",
    messagingSenderId: "421604428646",
    appId: "1:421604428646:web:d12fb069c3dee623f316a7"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let fireStore = firebaseApp.firestore();

export default fireStore;