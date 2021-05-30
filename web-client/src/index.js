import React from "react";
import ReactDOM from "react-dom";
import WebAppNavigator from "./modules/qrcode/WebAppNavigator";
import {initSocket} from "./api/socketApi";
initSocket().then(()=>{
    ReactDOM.render(
        <React.StrictMode>
            <WebAppNavigator />
        </React.StrictMode>,
        document.getElementById("root")
    );
});

