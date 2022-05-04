import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import primary from "@material-ui/core/colors/blue";
import secondary from "@material-ui/core/colors/amber";

import { store } from "../redux/store";
import { getLoginUrl } from "../helpers";

import withAuth from "../components/withAuth";
import Login from "./Login";
import SignUp from "./SignUp";
import Chat from "./Chat";

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
  },
  overrides: {
    MuiPaper: {
      root: {
        marginBottom: defaultTheme.spacing(2),
      },
    },
  },
});

const Router = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path={getLoginUrl()} exact component={Login} />
          <Route path="/sign_up" exact component={SignUp} />
          <Route path="/" exact component={withAuth()(Chat)} />
          <Route path="/:chatId" exact component={withAuth()(Chat)} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

export default Router;
