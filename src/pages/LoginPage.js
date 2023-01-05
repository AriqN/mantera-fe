/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { Route, Redirect } from "react-router-dom";
import "./index.css";
import logo from "../assets/mantera-logo(black).png";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const hostServer = "18.136.118.175";
function Copyright(props) {
  return (
    <>
      <ImageList sx={{ width: 200, height: 150 }}>
        <ImageListItem>
          <img src={logo} alt="logo" loading="lazy" />
        </ImageListItem>
      </ImageList>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

function InputErrorMessage({ touched, errors, inputName }) {
  return (
    <Typography variant="caption" color="red">
      {touched[inputName] && errors[inputName]}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const { touched, errors, getFieldProps, isValid, dirty, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string()
          .email("Please enter a valid email")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters long"),
      }),
      async onSubmit(values) {
        alert(JSON.stringify(values));
        console.log(values);
      },
    });

  const defaultErrorMessageProps = {
    touched,
    errors,
  };
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // async function eraseMessage() {
    //   await Promise.all(setMessage(""));
    // }
    // eraseMessage();
    setMessage("");
    setOpen(false);
    // if (message) {
    //   setOpen(false);
    // }
  };
  const API = async (e) => {
    await axios
      .post(
        `http://${hostServer}:3000/api/v1/users/login`,
        {
          email: `${email}`,
          password: `${password}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        Cookies.set("jwt", res.data.token, { expires: 7 });
        setLogin(true);
        setLoading(false);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        // handleClickOpen();
      })
      .then(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLogin(false);
    const data = await Promise.all(new FormData(event.currentTarget));
    // setPassword(data.get("password"));
    // setEmail(data.get("email"));
    const dataEmail = data[0];
    const dataPassword = data[1];
    setEmail(dataEmail[1]);
    setPassword(dataPassword[1]);
    console.log(dataEmail, dataPassword);
    setLoading(true);
    // console.log(message);
    // console.log(login);

    // if (message) {
    //   return handleClickOpen();
    // }
  };
  useEffect(() => {
    if (login) {
      window.location.reload();
    }
  }, [login]);
  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
    }
  }, [handleClose]);
  useEffect(() => {
    if (email && password) {
      console.log(email, password);
      API();
    }
  }, [handleSubmit]);
  useEffect(() => {
    if (message) {
      return handleClickOpen();
    }
  }, [message]);
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className="landing-page"
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {/* {list} */}
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...getFieldProps("email")}
                // {...setEmail("email")}
              />
              <InputErrorMessage
                {...defaultErrorMessageProps}
                inputName="email"
              />
              <br />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...getFieldProps("password")}
                // {...setPassword("password")}
              />
              <InputErrorMessage
                {...defaultErrorMessageProps}
                inputName="password"
              />
              <br />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              {loading ? (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Loading
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!(isValid && dirty) || isSubmitting}
                  // href="/home"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              )}
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

              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
