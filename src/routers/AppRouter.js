import React from "react";
import { Router, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import History from "./purplehistory";
import AOS from "aos";
import "aos/dist/aos.css";

class AppRouter extends React.Component {
    componentDidMount() {
        AOS.init();
    }
    render() {
        return (
            <Router history={History}>
                <Switch>
                    <PublicRoute path="/" component={HomePage} exact={true} />
                    <PublicRoute path="/about" component={AboutPage} />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
