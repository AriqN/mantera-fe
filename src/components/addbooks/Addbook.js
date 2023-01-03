/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Cookies from "js-cookie";
import CustomizedMenus from "./menuItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: "20px",
};
const hostServer = "18.136.118.175";
export default function AddLibraryBook() {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newLibraryBook, setlibraryBooks] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [newLibraryPage, setNewLibraryPage] = useState(0);
  const [message, setMessage] = useState("");
  const storeData = async () => {
    const accessToken = Cookies.get("jwt");
    await axios
      .post(
        `http://${hostServer}:3000/api/v1/books`,
        {
          name: `${newLibraryBook}`,
          page: `${newLibraryPage}`,
          genre: `${genre}`,
          description: `${description}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    if (message) {
      return handleClickOpenDialog();
    }
    setlibraryBooks("");
    setNewLibraryPage();
    setGenre("");
    setDescription("");
    handleClose();
  };
  const handleClickOpenDialog = async () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = async () => {
    setMessage("");
    setOpenDialog(false);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <Stack direction="row" spacing={2} className="addbutton">
        <Button
          className="addbutton"
          variant="contained"
          sx={{ maxWidth: 400, borderRadius: "16px" }}
        >
          <CardActions>
            <AddCircleOutlineIcon
              sx={{ fontSize: 150 }}
              onClick={handleOpen}
            ></AddCircleOutlineIcon>
            <Typography variant="h6" component="h2" fontFamily={"nuito"}>
              <b>Add Book</b> <br />
            </Typography>
          </CardActions>
        </Button>
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Inform your Book</b> <br />
            <p style={{ fontSize: 14, margin: 0 }}>fill in the book details</p>
            <hr />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 0, width: "100%", mb: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="filled-basic"
                label="Book Name"
                variant="filled"
                onChange={(e) => setlibraryBooks(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Book Description"
                variant="filled"
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Number of book pages"
                type="number"
                variant="filled"
                onChange={(e) => setNewLibraryPage(parseInt(e.target.value))}
              />
              {/* <CustomizedMenus setGenre={setGenre} /> */}
            </Box>
          </Typography>
          <Stack
            spacing={2}
            direction="row"
            style={{ float: "right", marginTop: 20 }}
          >
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={storeData}>
              Save
            </Button>
          </Stack>
        </Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Alert severity="error" onClose={handleCloseDialog}>
            <AlertTitle>Error</AlertTitle>
            This is an error alert —
            <br />
            <strong>{message}</strong>
          </Alert>
        </Dialog>
      </Modal>
    </React.Fragment>
  );
}
