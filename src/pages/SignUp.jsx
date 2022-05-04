import { useState } from "react";
import { makeStyles, FormControl, Input, Button } from "@material-ui/core";

import { fetchRegister } from "../api/auth";
import { isIncorrectFormData, getLoginUrl } from "../helpers";

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

const SignUp = ({ history }) => {
  const classes = useStyles({});
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isIncorrectFormData(formData)) {
      return;
    }

    const res = await fetchRegister(formData);

    if (res) {
      history.push(getLoginUrl());
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
        <Input placeholder="Nick" name="nick" onChange={handleInput} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Input placeholder="pass" name="password" onChange={handleInput} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button variant="contained" color="primary" type="submit">
          Sign up
        </Button>
      </FormControl>
    </form>
  );
};

export default SignUp;
