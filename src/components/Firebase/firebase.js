import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCZKrKXhY9Su_aqHRj0iyyrmNASlD1SnPA",
  authDomain: "recipe-app-fc16f.firebaseapp.com",
  databaseURL: "https://recipe-app-fc16f.firebaseio.com",
  projectId: "recipe-app-fc16f",
  storageBucket: "recipe-app-fc16f.appspot.com",
  messagingSenderId: "201549089354",
  appId: "1:201549089354:web:c980f09a0009504403b4b3",
  measurementId: "G-0RJR332JTS"
}

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  //Auth API
  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);


  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  passwordReset = email => this.auth.sendPasswordResetEmail(email);

  passwordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;