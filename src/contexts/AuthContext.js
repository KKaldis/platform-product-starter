import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({ display: "popup" });

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const setNewPassword = (actionCode, newPassword) => {
    return confirmPasswordReset(auth, actionCode, newPassword);
  };

  const updateMyEmail = (email) => {
    return updateEmail(currentUser, email);
  };

  const updateMyPassword = (password) => {
    return updatePassword(currentUser, password);
  };

  const checkOldPassword = (password) => {
    const credentials = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    return reauthenticateWithCredential(currentUser, credentials);
  };

  const Reauthenticate = (password) => {
    const credentials = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    return reauthenticateWithCredential(currentUser, credentials);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithFacebook = () => {
    return signInWithPopup(auth, facebookProvider);
  };

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsuscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    resetPassword,
    logout,
    updateMyEmail,
    updateMyPassword,
    checkOldPassword,
    Reauthenticate,
    signInWithGoogle,
    signInWithFacebook,
    setNewPassword,
    verifyPasswordResetCode,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
