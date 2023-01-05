/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInSide from "./pages/LoginPage";
import GuestPrivateRoute from "./routes/GuestPrivateRoute";
import HomePage from "./pages/HomePage";
import UserPrivateRoute from "./routes/userPrivateRoute";
import SignUpRoute from "./routes/SignUpRoute";
import SignUpSide from "./pages/SignUpPage";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/create-playlist" exact component={CreatePlaylist}></Route> */}
        {/* <Route path="/" exact component={Home}></Route> */}
        {/* <UserPrivateRoute path="/create-playlist">
              <CreatePlaylist/>
            </UserPrivateRoute> */}
        {/* <GuestPrivateRoute exact path="/home">
          <HomePage />
        </GuestPrivateRoute>
        <UserPrivateRoute exact path="/">
          <SignInSide />
        </UserPrivateRoute> */}
        <GuestPrivateRoute exact path="/home" component={HomePage} />
        <UserPrivateRoute exact path="/" component={SignInSide} />
        <SignUpRoute exact path="/signup" component={SignUpSide} />
      </Switch>
    </Router>
    // <div className="App">
    //   <SignInSide />
    // </div>
  );
}

export default App;
