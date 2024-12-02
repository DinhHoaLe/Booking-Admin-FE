import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0K2bRvzIfkZPvLxfARm7gJXS_aF47YP0",
  authDomain: "testproject-edac9.firebaseapp.com",
  projectId: "testproject-edac9",
  storageBucket: "testproject-edac9.appspot.com",
  messagingSenderId: "1031104764261",
  appId: "1:1031104764261:web:2deefbd513963cb318e98c",
  measurementId: "G-N9R0H4230N",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
