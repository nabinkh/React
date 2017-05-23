import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyCkUBoY4bExeqEOysBGM-TMJXeBBZy65Ek",
    authDomain: "hisab-kitab-f9e2b.firebaseapp.com",
    databaseURL: "https://hisab-kitab-f9e2b.firebaseio.com",
    projectId: "hisab-kitab-f9e2b",
    storageBucket: "hisab-kitab-f9e2b.appspot.com",
    messagingSenderId: "798109347896"
  };

export const firebaseApp=firebase.initializeApp(config);
export const userInfo=firebaseApp.database().ref('userInfo');