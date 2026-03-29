// firebase-utils.js

/**
 * Firebase Utility Functions
 */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Authentication Functions
 */

// Sign in with Google
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("User signed in: ", result.user);
    } catch (error) {
        console.error("Error signing in: ", error);
    }
};

// Sign out user
export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("User signed out.");
    } catch (error) {
        console.error("Error signing out: ", error);
    }
};

/**
 * Firestore Operations
 */

// Add a document to Firestore
export const addDocument = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

// Retrieve documents from Firestore
export const getDocuments = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
};

/**
 * Cloudinary Integration
 */

// Function to upload to Cloudinary
export const uploadToCloudinary = async (file) => {
    const uploadPreset = "your_upload_preset";
    const cloudName = "your_cloud_name";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`; 
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        console.log("Uploaded to Cloudinary: ", data);
        return data;
    } catch (error) {
        console.error("Error uploading to Cloudinary: ", error);
    }
};
