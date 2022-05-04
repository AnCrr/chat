import { useState, useRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { sendMessage } from "../redux/messages/actions";

const useStyles = makeStyles(() => ({
  input: {
    paddingBottom: "10px",
    width: "80%",
  },
  button: {
    marginRight: "50px",
  },
}));

const mapDispatchToProps = (dispatch) => ({
  sendMessage: bindActionCreators(sendMessage, dispatch),
});

const MessagesBottomBar = ({ chatId, sendMessage }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const classes = useStyles({});

  const handleChangeInput = ({ target }) => {
    setMessage(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      return;
    }
    const res = await sendMessage({ chatId, text: message });
    if (res) {
      setMessage("");
    }
    inputRef.current.focus();
    console.log("handleSubmit", message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="messageBottomBarContainer">
        <div>
          <TextField
            size="small"
            className={classes.input}
            inputProps={{ ref: inputRef }}
            type="text"
            value={message}
            onChange={handleChangeInput}
            id="outlined-basic"
            label="Enter your message"
            variant="outlined"
          />
        </div>
        <div>
          <Button
            size="small"
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </div>
    </form>
  );
};

export default connect(null, mapDispatchToProps)(MessagesBottomBar);
