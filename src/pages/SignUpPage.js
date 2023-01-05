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
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        mantera.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function InputErrorMessage({ touched, errors, inputName }) {
  return (
    <Typography variant="caption" color="red" fontFamily={"roboto"}>
      {touched[inputName] && errors[inputName]}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpSide() {
  const { touched, errors, getFieldProps, isValid, dirty, isSubmitting } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      validationSchema: Yup.object().shape({
        name: Yup.string()
          .required("name is required")
          .min(3, "name must be at least 3 characters long")
          .max(20, "name must have less or equal then 20 characters"),
        email: Yup.string()
          .email("Please enter a valid email")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters long"),
        passwordConfirm: Yup.string()
          //   .required("Password Confirm is required")
          .test("passwords-match", "Passwords must match", function (value) {
            return this.parent.password === value;
          }),
        //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
        `http://${hostServer}:3000/api/v1/users/signup`,
        {
          name: `${name}`,
          email: `${email}`,
          password: `${password}`,
          passwordConfirm: `${passwordConfirm}`,
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
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        console.log(err.response.data.message);

        // handleClickOpen();
      })
      .then(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLogin(false);
    const data = await Promise.all(new FormData(event.currentTarget));
    // setPassword(data.get("password"));
    // setEmail(data.get("email"));
    const dataName = data[0];
    const dataEmail = data[1];
    const dataPassword = data[2];
    const dataPasswordConfirm = data[3];
    setName(dataName[1]);
    setEmail(dataEmail[1]);
    setPassword(dataPassword[1]);
    setPasswordConfirm(dataPasswordConfirm[1]);
    console.log(dataEmail, dataPassword);

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
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    }
  }, [handleClose]);
  useEffect(() => {
    if (name && email && password) {
      console.log(email, password, name, passwordConfirm);
      API();
    }
  }, [handleSubmit]);
  useEffect(() => {
    //   setLoading(false);
    if (message) {
      return handleClickOpen();
    }
    // handleClickOpen();
    console.log(message);
    // }
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
              Sign Up
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
                label="User Name"
                name="name"
                autoComplete="name"
                autoFocus
                {...getFieldProps("name")}
                // {...setEmail("email")}
              />
              <InputErrorMessage
                {...defaultErrorMessageProps}
                inputName="name"
              />
              <br />
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="PasswordConfirm"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                {...getFieldProps("passwordConfirm")}
                // {...setPassword("password")}
              />
              <InputErrorMessage
                {...defaultErrorMessageProps}
                inputName="passwordConfirm"
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
                  <Link href="/" variant="body2">
                    {"have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <ImageListItem
                sx={{
                  width: 300,
                  mt: 20,
                  display: { xs: "block", md: "none", lg: "none" },
                }}
              >
                <img src={logo} alt="logo" loading="lazy" />
              </ImageListItem>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
