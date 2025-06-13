import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { getDoc, setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { updatePassword } from "firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

const fetchUserProfile = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const userSnap = await getDoc(userDocRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    throw new Error("User document not found in Firestore.");
  }
};

// authProvider
export const AuthProvide = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const reauthenticateUser = async (password) => {
  if (!currentUser || !currentUser.email) {
    throw new Error("User is not authenticated.");
  }

  const credential = EmailAuthProvider.credential(currentUser.email, password);
  await reauthenticateWithCredential(currentUser, credential);
};

  // register a user
  const registerUser = async (email, password, fullName, phone, address) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save extra user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      fullName,
      phone,
      address,
      createdAt: new Date().toISOString(),
    });

    return userCredential;
  };

  // login the user
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // sing up with google
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await signOut(auth);
      throw new Error(
        "This Google account is not registered. Please sign up first."
      );
    }

    return result;
  };

  const signUpWithGoogle = async (fullName, phone, address) => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
        phone: phone,
        address: address,
        createdAt: new Date().toISOString(),
      });
    }

    return result;
  };

  // logout the user
  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = async (updatedData) => {
    if (!currentUser) {
      throw new Error("No user is currently logged in.");
    }

    const userRef = doc(db, "users", currentUser.uid);

    try {
      await setDoc(userRef, updatedData, { merge: true }); // merge: true keeps other fields intact
      const updatedProfile = await fetchUserProfile(currentUser.uid);
      setCurrentUserData(updatedProfile); // Update local state
    } catch (error) {
      console.error("Failed to update user profile:", error);
      throw error;
    }
  };

  const changeUserPassword = async (currentPassword, newPassword) => {
    if (!currentUser) throw new Error("No user logged in");

    try {
      await reauthenticateUser(currentPassword);

      await updatePassword(currentUser, newPassword);
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  };

  // manage user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        (async () => {
          try {
            const profile = await fetchUserProfile(user.uid);
            setCurrentUserData(profile);
          } catch (error) {
            console.error("Failed to fetch user profile:", error.message);
            setCurrentUserData(null);
          }
        })();
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    currentUserData,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    signUpWithGoogle,
    logout,
    updateUserProfile,
    changeUserPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
