import { ThemeProvider } from "@material-ui/core/styles";
import { themeConfig } from "../../utils/ThemeUtils";
import EventConstant from "../../constants/EventConstant"
import {Switch, Route, BrowserRouter,useHistory} from "react-router-dom";
import WebHomeScreen from "../home/WebHomeScreen";
import ScanCodeView from "./ScanCodeView";
import React  from "react";

const WebAppNavigator = ({ params }) => {

  return (
    <ThemeProvider theme={themeConfig}>
      <BrowserRouter>
        <Switch>
          <Route path="/chat" exact component={WebHomeScreen} />
          <Route path="/" component={ScanCodeView} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default WebAppNavigator;
