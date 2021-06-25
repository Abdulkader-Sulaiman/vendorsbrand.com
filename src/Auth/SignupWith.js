import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// import "../css/Signup.css";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

// firebase.initializeApp({
//     apiKey: "AIzaSyDLoqcbTDMFuurtAyDgVEKZ6qwo0j0Osjk",
//     authDomain: "fir-auth-tutorial-ed11f.firebaseapp.com",
// });

class App extends Component {
    state = { isSignedIn: false };
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID, //
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false,
        },
    };

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ isSignedIn: !!user });
            // console.log("user", user);
        });
    };

    render() {
        return (
            <div className="App">
                {this.state.isSignedIn ? (
                    <span>
                        <Route
                            path="/"
                            render={() =>
                                !this.state.isLoggedIn ? (
                                    // <Header />
                                    <div>
                                        
                                    </div>
                                ) : (
                                    <Redirect to="/" />
                                )
                            }
                        />
                    </span>
                ) : (
                    <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                )}
            </div>
        );
    }
}

export default App;
