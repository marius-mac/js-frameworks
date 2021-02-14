import * as firebase from 'firebase/app';
import 'firebase/database';

const FirebaseConfig = {
    apiKey: 'AIzaSyBXUaKu4krsTy7ft6wGdjqLhyjJdGnVVm4',
    authDomain: 'wecancode-intermediate.firebaseapp.com',
    databaseURL: 'https://wecancode-intermediate.firebaseio.com',
    projectId: 'wecancode-intermediate',
    storageBucket: 'wecancode-intermediate.appspot.com',
    messagingSenderId: '374455041773'
};

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();

export const tweetsRef = databaseRef.child('tweets');
export const getTweetRef = tweetId => databaseRef.child(`tweets/${tweetId}`);
