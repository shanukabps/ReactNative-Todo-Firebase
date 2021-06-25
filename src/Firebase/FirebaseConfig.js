import * as firebase from 'firebase'
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCxWueGJcSq1rjCzxFlZpZsIIeB-tq0MBQ",
    authDomain: "todosapp-8de2d.firebaseapp.com",
    databaseURL: "https://todosapp-8de2d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todosapp-8de2d",
    storageBucket: "todosapp-8de2d.appspot.com",
    messagingSenderId: "410414127042",
    appId: "1:410414127042:web:03c5be4da6e204c5bce85b",
    measurementId: "G-7EWVKB6XCT"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
