import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import Dialogs from "./Dialogs";
import AsideTopBar from "./AsideTopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
    overflow: "hidden",
  },
}));

const Aside = () => {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <AsideTopBar />
      <Dialogs />
      <div>
        <Button variant="contained" color="primary">
          Chats
        </Button>
        <Button variant="contained" color="primary">
          Settings
        </Button>
      </div>
    </div>
  );
};

export default Aside;
