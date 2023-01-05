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
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
const CardList = ({ data }) => {
  const accessToken = Cookies.get("jwt");
  const hostServer = "18.136.118.175";
  const [open, setOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [dataBook, setDataBook] = useState([]);

  const [message, setMessage] = useState("");
  const apiAddReadingMaterial = async (e) => {
    setMessage("");
    await axios
      .patch(
        `http://${hostServer}:3000/api/v1/users/readBook`,
        {
          currentRead: [`${data._id}`],
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
        handleClose();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  const handleAddReadingMaterial = () => {
    apiAddReadingMaterial();
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleOpenBookDetails = () => {
    setBookDetails(true);
  };
  const handleCloseBookDetails = () => {
    setBookDetails(false);
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
          <CardMedia
            sx={{ height: 140 }}
            image={data.imageCover}
            title="green iguana"
          />
          <CardContent sx={{ height: 160 }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ height: 50, alignItems: "center" }}
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
              {data.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>
              Add to My Library
            </Button>
            <Button size="small" onClick={handleOpenBookDetails}>
              Details
            </Button>
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
              <b>Confirmation</b> <br />
              <p style={{ fontSize: 14, margin: 0 }}>
                Add This Material To Your Reading Collection ?
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
              ></Box>
            </Typography>
            <Stack
              spacing={2}
              direction="row"
              style={{ float: "right", marginTop: 20 }}
            >
              <Button variant="text" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleAddReadingMaterial}>
                Yes
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
            This is an error alert —
            <br />
            <strong>{`${message}`}</strong>
          </Alert>
        </Dialog>
        <Dialog
          fullScreen
          open={bookDetails}
          onClose={handleCloseBookDetails}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseBookDetails}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {data.name}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText
                primary="Description"
                secondary={data.description}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Page" secondary={data.pages} />
            </ListItem>
          </List>
        </Dialog>
      </>
    </>
  );
};

export default CardList;
