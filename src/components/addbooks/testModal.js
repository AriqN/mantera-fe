/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CardActions from "@mui/material/CardActions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CustomizedMenus from "./menuItem";
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

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

const hostServer = "18.136.118.175";
const accessToken = Cookies.get("jwt");
export default function BasicModal({ setBookData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newLibraryBook, setlibraryBooks] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [newLibraryPage, setNewLibraryPage] = useState(0);

  const [loading, setLoading] = useState(true);
  const storeData = async () => {
    console.log(newLibraryBook, newLibraryPage, description, genre);
    const accessToken = Cookies.get("jwt");
    await axios
      .post(
        `http://${hostServer}:3000/api/v1/books`,
        {
          name: `${newLibraryBook}`,
          pages: `${newLibraryPage}`,
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
        setBookData(response.data);
        handleClose();
      });
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <CardActions>
          <AddCircleOutlineIcon
            sx={{ fontSize: 64 }}
            onClick={handleOpen}
          ></AddCircleOutlineIcon>
          <Typography variant="h6" component="h5">
            Add New Reading Material
          </Typography>
        </CardActions>
      </Button>
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
              <CustomizedMenus setGenre={setGenre} />
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
      </Modal>
    </>
  );
}
