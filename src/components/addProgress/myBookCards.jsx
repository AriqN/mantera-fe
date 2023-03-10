/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import BookIcon from "@mui/icons-material/Book";
import DoneAllIcon from "@mui/icons-material/DoneAll";

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

const ProgressCardList = ({
  data,
  setUserData,
  setLoadProgress,
  loadProgress,
}) => {
  const accessToken = Cookies.get("jwt");
  const hostServer = "54.255.14.152";
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!loadProgress) setOpen(false);
  };
  //   const [dataBook, setDataBook] = useState([]);
  const [newReadingProgress, setNewReadingProgress] = useState(0);
  const [message, setMessage] = useState("");
  const apiUser = async (e) => {
    await axios
      .get(
        `http://${hostServer}:3000/api/v1/users/myData`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
        { withCredentials: true }
      )
      .then(function (response) {
        setUserData(response.data.data);
      });
  };
  const apiAddReadingProgress = async (e) => {
    setMessage("");
    await axios
      .patch(
        `http://${hostServer}:3000/api/v1/users/updateProgress/${data._id}`,
        {
          pageRead: newReadingProgress,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
        { withCredentials: true }
      )
      .then(function () {
        setLoadProgress(true);
        apiUser();
        handleClose();
        // apiUser();
        // window.location.reload();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  const handleAddReadingProgress = () => {
    apiAddReadingProgress();
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    if (!openDialog) {
      setMessage("");
      console.log(message);
    }
    setOpenDialog(false);
  };
  useEffect(() => {
    // setLoading(false);
    if (message) {
      console.log(message);
      handleClickOpen();
    }
  }, [message]);

  return (
    <>
      <Grid item key={data} xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent sx={{ height: 160 }}>
            {data.pageRead / data.pages === 1 ? <DoneAllIcon /> : <BookIcon />}

            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ height: 35, alignItems: "center", overflow: "hidden" }}
            >
              {data.name}
            </Typography>
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 4,
              }}
              variant="body2"
              color="text.secondary"
            >
              {`Total Page : ${data.pages}`}
            </Typography>
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 4,
              }}
              variant="body2"
              color="text.secondary"
            >
              {`Page Read : ${Math.round(
                (data.pageRead / data.pages) * 100
              )} %`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>
              Add Reading Progress
            </Button>
            {/* <Button size="small">Details</Button> */}
          </CardActions>
        </Card>
      </Grid>
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <b>Progress</b> <br />
              <p style={{ fontSize: 14, margin: 0 }}>
                Add Number of Page You Have read !
              </p>
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
                  label="Pages Read"
                  type="number"
                  variant="filled"
                  onChange={(e) =>
                    setNewReadingProgress(parseInt(e.target.value))
                  }
                />
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
              <Button variant="contained" onClick={handleAddReadingProgress}>
                Add Progress
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Alert severity="error" onClose={handleCloseDialog}>
            <AlertTitle>Error</AlertTitle>
            This is an error alert ???
            <br />
            <strong>{`${message}`}</strong>
          </Alert>
        </Dialog>
      </>
    </>
  );
};
export default ProgressCardList;
