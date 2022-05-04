import { getUsers } from "../redux/dialogs/actions";
import { getUsersData } from "../redux/dialogs/selectors";
import { useEffect, useState, useRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Select, MenuItem, TextField, Button } from "@material-ui/core";
import { fetchCreateDialog } from "../api/dialogs";

const mapStateToProps = (state) => ({
  users: getUsersData(state),
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: bindActionCreators(getUsers, dispatch),
});

const CreateDialogModal = ({ users, getUsers }) => {
  const [usersId, setUsersId] = useState([]);
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleChange = ({ target }) => {
    const id = target.value;
    setUsersId(id);
  };
  const handleChangeInput = ({ target }) => {
    setTitle(target.value);
  };

  const handleSubmit = () => {
    const params = {
      title,
      members: usersId.map((userId) => ({ _id: userId })),
    };
    fetchCreateDialog(params);
  };
  return (
    <div>
      <TextField
        size="small"
        inputProps={{ ref: inputRef }}
        type="text"
        value={title}
        onChange={handleChangeInput}
        id="outlined-basic"
        label="Enter your message"
        variant="outlined"
      />

      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={usersId}
        onChange={handleChange}
      >
        {users.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            {user.nick}
          </MenuItem>
        ))}
      </Select>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Create Dialog
      </Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDialogModal);
