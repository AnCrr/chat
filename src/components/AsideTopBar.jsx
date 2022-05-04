import { TextField, Button, makeStyles, Modal, Box } from "@material-ui/core";
import { useState } from "react";
import CreateDialogModal from "./CreateDialogModal";

const useStyles = makeStyles(() => ({
  button: {
    minWidth: "0px",
    borderRadius: "50%",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AsideTopBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleCreateDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TextField
        // {...params}
        label="Find dialogs"
        InputProps={{
          // ...params.InputProps,
          type: "search",
        }}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        size="small"
        onClick={handleCreateDialog}
      >
        +
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateDialogModal />
        </Box>
      </Modal>
    </div>
  );
};

export default AsideTopBar;
