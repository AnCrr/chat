import { Redirect, useLocation } from "react-router-dom";

import { getLoginUrl } from "../helpers";

const withAuth = () => (Cpm) => (props) => {
  if (!localStorage.authToken) {
    return (
      <Redirect
        to={{
          pathname: getLoginUrl(),
        }}
      />
    );
  }

  return <Cpm {...props} />;
};

export default withAuth;
