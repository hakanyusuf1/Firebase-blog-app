// Import the functions you need from the SDKs you need

import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  toastWarnNotify,
  toastSuccessNotify,
  toastErrorNotify,
} from "./toastNotify";

import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL6akyTUbvyQMoe1H4GLk6XZZqL_6nFH4",
  authDomain: "blog-app-hyb.firebaseapp.com",
  databaseURL: "https://blog-app-hyb-default-rtdb.firebaseio.com",
  projectId: "blog-app-hyb",
  storageBucket: "blog-app-hyb.appspot.com",
  messagingSenderId: "543638207682",
  appId: "1:543638207682:web:a8645d24f39530ec45cf5b",
  measurementId: "G-EDZPC96J3P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const createUser = async (email, password, navigate, displayName) => {
  //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    toastSuccessNotify("Registered successfully!");
    navigate(-1);
  } catch (err) {
    toastErrorNotify(err.message);
  }
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
//! Email/password ile girişi enable yap
export const signIn = async (email, password, navigate) => {
  //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate(-1);
    toastSuccessNotify("Logged in successfully!");

    // localStorage.setItem("user", JSON.stringify(userCredential.user));
  } catch (err) {
    toastErrorNotify(err.message);
  }
};

export const userObserver = (setCurrentUser) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      // User is signed out
      setCurrentUser(false);
    }
  });
};

export const logOut = (navigate) => {
  signOut(auth);

  toastSuccessNotify("Logout successfully!");
  navigate("/");
};

export const signUpProvider = (navigate) => {
  //? Google ile giriş yapılması için kullanılan firebase metodu
  const provider = new GoogleAuthProvider();
  //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    })
    .catch((error) => {
      // Handle Errors here.
      toastErrorNotify(error.message);
    });
};

export const addData = (newBlog) => {
  // Create a new post reference with an auto-generated id
  const db = getDatabase(app);
  const postListRef = ref(db, "blogs");
  const newPostRef = push(postListRef);
  set(newPostRef, {
    title: newBlog?.title,
    photoUrl: newBlog?.photoUrl,
    text: newBlog?.text,
    displayName: newBlog?.displayName,
    likes: newBlog?.likes,
    userId: newBlog?.userId,
  });
};

export const GetDataList = () => {
  const [blogList, setBlogList] = useState();
  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "blogs");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const baglantiArray = [];

      for (let id in data) {
        baglantiArray.push({ id, ...data[id] });
      }
      setBlogList(baglantiArray);
    });
  }, []);
  return { blogList };
};
export const DeleteData = (id, navigate) => {
  const db = getDatabase();
  navigate(-1);
  remove(ref(db, "blogs/" + id));
};
export const EditBlog = (values) => {
  const db = getDatabase();
  const updates = {};
  updates["blogs/" + values.id] = values;
  return update(ref(db), updates);
};
