import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCeVInbH4ZeCbM3w9jqdlbFTT07cCyBIMw",
  authDomain: "thread-dd406.firebaseapp.com",
  databaseURL: "https://thread-dd406.firebaseio.com",
  projectId: "thread-dd406",
  storageBucket: "thread-dd406.appspot.com",
  messagingSenderId: "247625559065"
};

 export const firebaseApp = firebase.initializeApp(config);
