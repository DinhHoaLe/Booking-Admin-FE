import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0K2bRvzIfkZPvLxfARm7gJXS_aF47YP0",
  authDomain: "testproject-edac9.firebaseapp.com",
  databaseURL: "https://testproject-edac9-default-rtdb.firebaseio.com/", 
  projectId: "testproject-edac9",
  storageBucket: "testproject-edac9.appspot.com",
  messagingSenderId: "1031104764261",
  appId: "1:1031104764261:web:2deefbd513963cb318e98c",
  measurementId: "G-N9R0H4230N",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
