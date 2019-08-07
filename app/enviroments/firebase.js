//import firebase from '@firebase/app';
import firebase from 'react-native-firebase';
import '@firebase/auth';
import '@firebase/database';

const config = {
  apiKey: 'AIzaSyBSPSr6jZpsUnL2KPE3zig30IeLDOochIQ',
  authDomain: 'reactnativecourse-313b5.firebaseapp.com',
  databaseURL: 'https://reactnativecourse-313b5.firebaseio.com',
  projectId: 'reactnativecourse-313b5',
  storageBucket: 'reactnativecourse-313b5.appspot.com',
  messagingSenderId: '698076673696'
};

let instance = null;

class FirebaseService {
  constructor() {
    if (!instance) {
      this.app = firebase.initializeApp(config);
      instance = this;
    }
    return instance;
  }
}

const firebaseService = new FirebaseService().app;
export default firebaseService;
