import { useState } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { makeStyles, FormControl, Input, Button } from "@material-ui/core";

import { setUser } from "../redux/auth/actions";
import { fetchLogin } from "../api/auth";
import { isIncorrectFormData } from "../helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
    margin: `${theme.spacing(3)}px auto`,
  },
  formControl: {
    padding: "20px 0",
  },
  link: {
    marginLeft: "auto",
  },
}));

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch),
});

const Login = ({ history, setUser }) => {
  const classes = useStyles({});
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isIncorrectFormData(formData)) {
      return;
    }

    const res = await fetchLogin(formData);

    if (res) {
      setUser(res);
      history.push("/");
    }
  };

  const handleInput = ({ target }) => {
    setFormData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl className={classes.formControl}>
        <Input placeholder="Login" name="login" onChange={handleInput} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Input placeholder="Password" name="password" onChange={handleInput} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button variant="contained" color="primary" type="submit">
          Sing in
        </Button>
      </FormControl>
      <Link to="/sign_up" className={classes.link}>
        Register now
      </Link>
    </form>
  );
};

export default connect(null, mapDispatchToProps)(Login);
