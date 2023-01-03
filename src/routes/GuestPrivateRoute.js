/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import Cookies from "js-cookie";

function GuestPrivateRoute({ children, ...rest }) {
  const accessToken = Cookies.get("jwt");
  console.log(accessToken);
  return (
    <Route {...rest}>{accessToken ? children : <Redirect to={"/"} />}</Route>
  );
}
export default GuestPrivateRoute;
