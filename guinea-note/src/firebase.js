import * as firebase from 'firebase';

// Initialize Firebase
var config = {
apiKey: "AIzaSyAblb_HCgLDz1CKV-i67dWU-tXy-3RCu5c",
authDomain: "guinea-note.firebaseapp.com",
databaseURL: "https://guinea-note.firebaseio.com",
projectId: "guinea-note",
storageBucket: "",
messagingSenderId: "328979804807"
};
firebase.initializeApp(config);

  export default firebase;