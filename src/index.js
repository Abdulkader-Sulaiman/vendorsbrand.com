import React from "react";
import ReactDOM from "react-dom";
import firebase from "@firebase/app";
import "@firebase/firestore";
import { FirestoreProvider } from "react-firestore";
import {createStore, applyMiddleware, compose } from "redux";
import rootRenderer from "./store/reducers/rootReducer"
import { Provider } from "react-redux";
import App from "./App";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
 
const store = createStore(rootRenderer, 
    compose (
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, fbConfig)
    
    )
);
ReactDOM.render(
    <FirestoreProvider firebase={firebase}>
    <React.StrictMode>
       <Provider store={store}>
        <App />
        </Provider>
        </React.StrictMode>
    </FirestoreProvider>,
    document.getElementById("root")
);
