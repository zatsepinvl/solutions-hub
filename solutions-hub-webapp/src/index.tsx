import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import ga from "./app/analytics/ga";

ga.event({action: "test-action"});

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root")
);