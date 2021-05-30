import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import ga from "./app/analytics/ga";
import {RootStoreContext} from "./app/store/useStore";
import RootStore from "./app/store/RootStore";
import {BrowserRouter as Router} from "react-router-dom";

ga.event({action: "test-action"});

ReactDOM.render(
    <React.StrictMode>
        <RootStoreContext.Provider value={new RootStore()}>
            <Router>
                <App/>
            </Router>
        </RootStoreContext.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);