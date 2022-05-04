import { useEffect, useRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import { setUser } from "../redux/auth/actions";
import { socketAddMessage, socketDialog } from "../redux/socket/actions";
import { BACKEND_API } from "../api/constants";

import Aside from "../components/Aside";
import Main from "../components/Main";

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch),
  socketAddMessage: bindActionCreators(socketAddMessage, dispatch),
  socketDialog: bindActionCreators(socketDialog, dispatch),
});

const Chat = ({ setUser, socketAddMessage, socketDialog }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    setUser(localStorage.authToken);
  }, [setUser]);

  useEffect(() => {
    socketRef.current = window.io(`ws://${BACKEND_API}`);

    if (localStorage.authToken) {
      socketRef.current.emit("jwt", localStorage.authToken);
      socketRef.current.on("msg", (msg) => {
        console.log("socket msg", msg);
        socketAddMessage(msg);
      });
      socketRef.current.on("chat", (chat) => {
        console.log("socket chat", chat);
        socketDialog(chat);
      });
    }

    return () => {
      socketRef.current.disconnect();
    };
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Aside />
      </Grid>
      <Grid item xs={9}>
        <Main name="name" />
      </Grid>
    </Grid>
  );
};

export default connect(null, mapDispatchToProps)(Chat);
