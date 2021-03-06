import React, { useContext, useState, useEffect } from "react";
import firebase, { auth, db } from "../firebase";
import { useTranslation } from "react-i18next";


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children, Value }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();


    function signup(email, password) {

        const data = {
            email: 'email',
            password: 'password'
          }

        return auth
            .createUserWithEmailAndPassword(email, password)
            
            .then((userCredential) => {


                // send verification mail.
                // userCredential.user.sendEmailVerification();
                // auth.signOut();
                // alert(t("Please go to your Email Inbox and verify your Email Address"));
            
            }).catch(alert);
    }
 
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}