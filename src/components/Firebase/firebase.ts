import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export interface IFirebase {
  auth: firebase.auth.Auth;
  database: firebase.database.Database;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
  passwordReset: (email: string) => Promise<void>;
  passwordUpdate?: (password: string) => Promise<void> | null;
  onAuthStateChanged: (callback: (user: app.User) => void) => void;
  user: (uid: string) => firebase.database.Reference;
  users: () => firebase.database.Reference;
}

const config = {
  apiKey: "AIzaSyCZKrKXhY9Su_aqHRj0iyyrmNASlD1SnPA",
  authDomain: "recipe-app-fc16f.firebaseapp.com",
  databaseURL: "https://recipe-app-fc16f.firebaseio.com",
  projectId: "recipe-app-fc16f",
  storageBucket: "recipe-app-fc16f.appspot.com",
  messagingSenderId: "201549089354",
  appId: "1:201549089354:web:c980f09a0009504403b4b3",
  measurementId: "G-0RJR332JTS",
}

export class Firebase implements IFirebase {
  auth: firebase.auth.Auth;
  database: firebase.database.Database;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.database = app.database();
  }

  //Auth API
  createUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);


  signInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  passwordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  passwordUpdate = (password: string) => {
    const currentUser = this.auth.currentUser;

    if (currentUser) {
      return currentUser.updatePassword(password);
    }

    return null;
  }

  onAuthStateChanged = (callback: (user: app.User) => void) => {
    this.auth.onIdTokenChanged((user) => {
      if (user) {
        callback(user)
      }
    });
  };

  //User API
  user = (uid: string) => this.database.ref(`users/${uid}`);
  users = () => this.database.ref('users');
}