import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as ROUTES from "./Routes/routes";
import Dashboard from "./components/header/Centered_Tabs";
import { AuthProvider } from "../src/contexts/AuthContext";
import ProfilePage from "./components/BrandProfile/Brandprofile__Page.js";
import { Suspense } from "react";
import NotFound from "./components/pages/NotFound";
import SignUp from "./Auth/SignUp";
import logIn from "./Auth/SignIn";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1890ff",
        },
    },
});

function App() {
    const { t } = useTranslation();
    return (
        <ThemeProvider theme={theme}>
            <usePlacesAPI />

            <Router>
                <div className="app">
                    <div className="language-select">
                        {/* <LanguageSelect /> */}

                        <AuthProvider>
                            <Suspense fallback={<p>Login...</p>}>
                                <Switch>
                                    <Route
                                        exact
                                        path={ROUTES.Dashboard}
                                        component={Dashboard}
                                    />
                                    <Route
                                        exact
                                        path={ROUTES.LOGIN}
                                        component={logIn}
                                    />
                                    <Route
                                        exact
                                        path={ROUTES.SignUp}
                                        component={SignUp}
                                    />
                                    {/*  */}
                                    
                                    <Route
                                        exact
                                        path={ROUTES.Profile}
                                         component={ProfilePage}
                                    />
                                    {/*  */}

                                    {/* <Route exact path="/forgot-password" component={ForgotPassword} /> */}
                                    {/*exact هون مافي شي محدد يروح عليه  لذالك بلا ال*/}
                                    <Route
                                        path="*"
                                        exact={true}
                                        component={NotFound}
                                    />
                                    {/* <Route path={ROUTES.NOT__FOUND} component={NotFound} /> */}
                                </Switch>
                            </Suspense>
                        </AuthProvider>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
