/* eslint-disable no-unused-vars */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardList from "../components/bookCards";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DashboardUser from "../components/userDashboard";
import CircularProgress from "@mui/material/CircularProgress";
import BasicModal from "../components/addbooks/testModal";
import ProgressCardList from "../components/addProgress/myBookCards";
import Pagination from "@mui/material/Pagination";
import BookIcon from "@mui/icons-material/Book";
import logo from "../assets/mantera-logo(black).png";
import ImageListItem from "@mui/material/ImageListItem";

function Copyright() {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          mantera.
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

const theme = createTheme();
const hostServer = "54.255.14.152";
export default function HomePage() {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [myLibrary, setMyLibrary] = useState(false);
  const [bookData, setBookData] = useState();
  const accessToken = Cookies.get("jwt");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const apiBooksCount = async (e) => {
    await axios
      .get(
        `http://${hostServer}:3000/api/v1/books?limit=60000`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
        { withCredentials: true }
      )
      .then(function (response) {
        setDataCount(Math.ceil(response.data.resultsNumber / 6));
        console.log(dataCount);
      });
  };
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
  const apiBooks = async (e) => {
    await axios
      .get(
        `http://${hostServer}:3000/api/v1/books?limit=6&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
        { withCredentials: true }
      )
      .then(function (response) {
        setData(response.data.data.books);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    // .then(() => {
    //   setLoading(false);
    // });
  };
  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = async () => {
    Cookies.remove("jwt");
    setMessage("");
    window.location.reload();
    setOpen(false);
  };
  const handleLogOut = async () => {
    Cookies.remove("jwt");
    window.location.reload();
  };

  const handleMyLibraryButton = async () => {
    apiUser();
    setMyLibrary(true);
    console.log(myLibrary);
  };
  const handleMainLibraryButton = async () => {
    setMyLibrary(false);
    console.log(myLibrary);
  };
  // useEffect(() => {

  // }, [handleMyLibraryButton]);
  useEffect(() => {
    apiBooks();
    // setCount(Math.ceil(dataCount / 6));
  }, [page]);
  useEffect(() => {
    apiBooksCount();
  }, [loading]);

  useEffect(() => {
    async function fetchData() {
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
        .then((response) => {
          setUserData(response.data.data);
          console.log(response.data.data);
        })
        .catch((err) => {
          setMessage(err.response.data.message);
        })
        .then(() => {
          setLoading(false);
        });
    }
    fetchData();
    apiBooks();
    // apiBooksCount();
    console.log(dataCount);
    if (message) {
      return handleClickOpen();
    }
  }, [loading, bookData]);

  // <Box sx={{ display: 'flex' }}>
  // <CircularProgress />
  // </Box>
  return (
    <>
      {loading || message ? (
        <Box
          sx={{ position: "fixed", left: 0, top: 0, width: 100, height: 100 }}
        >
          <CircularProgress />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Alert severity="error" onClose={handleClose}>
              <AlertTitle>Error</AlertTitle>
              This is an error alert —
              <br />
              <strong>{message}</strong>
            </Alert>
          </Dialog>
        </Box>
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              <div className="bar">
                <div className="bar">
                  <BookIcon sx={{ mr: 2 }} />
                  <Typography variant="h6" color="inherit" noWrap>
                    Dashboard
                  </Typography>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ width: 100 }}
                    onClick={handleLogOut}
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="sm">
                <DashboardUser
                  userData={userData}
                  setLoadProgress={setLoadProgress}
                  loadProgress={loadProgress}
                />
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  {/* <AddLibraryBook /> */}

                  {!myLibrary ? (
                    <>
                      <BasicModal setBookData={setBookData} />
                      <Button
                        variant="outlined"
                        onClick={handleMyLibraryButton}
                      >
                        My Library
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={handleMainLibraryButton}
                    >
                      Main Library
                    </Button>
                  )}
                </Stack>
              </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* End hero unit */}
              {myLibrary ? (
                <Grid container spacing={4}>
                  {/* <div
                    style={{
                      width: "500px",
                      overflow: "auto",
                      display: "flex",
                    }}
                  > */}
                  {userData.currentRead.map((data) => (
                    <ProgressCardList
                      data={data}
                      key={data._id}
                      setUserData={setUserData}
                      setLoadProgress={setLoadProgress}
                      loadProgress={loadProgress}
                    />
                  ))}
                  {/* </div> */}
                </Grid>
              ) : (
                <>
                  <Grid container spacing={4}>
                    {data.map((data) => (
                      <CardList data={data} key={data._id} />
                    ))}
                  </Grid>
                  <br />
                  <Stack spacing={2}>
                    <Typography>Page: {page}</Typography>
                    <Pagination
                      count={dataCount}
                      page={page}
                      onChange={handleChangePage}
                    />
                  </Stack>
                </>
              )}
            </Container>
          </main>
          {/* Footer */}
          <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
            {/* <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Something here to give the footer a purpose!
            </Typography> */}
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              // style={{ minHeight: "10vh" }}
            >
              <ImageListItem
                sx={{
                  width: 300,
                  mt: 5,
                  mb: 1,
                  // display: { xs: "block", md: "none", lg: "none" },
                }}
              >
                <img src={logo} alt="logo" loading="lazy" />
              </ImageListItem>
              <Copyright sx={{ mt: 5 }} />
            </Grid>
          </Box>
          {/* End footer */}
        </ThemeProvider>
      )}
    </>
  );
}
