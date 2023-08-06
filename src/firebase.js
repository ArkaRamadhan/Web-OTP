import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

var firebaseConfig = {
  apiKey: "AIzaSyBdA679k8Y0HMjwKdhAVNj47rly8uWIbZw",
  authDomain: "otp-app-demo-130b3.firebaseapp.com",
  projectId: "otp-app-demo-130b3",
  storageBucket: "otp-app-demo-130b3.appspot.com",
  messagingSenderId: "336871308863",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase