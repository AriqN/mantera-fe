/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

function UserPrivateRoute({ children, ...rest }) {
  const accessToken = Cookies.get("jwt");

  return (
    <Route {...rest}>
      {!accessToken ? children : <Redirect to={"/home"} />}
    </Route>
  );
}
export default UserPrivateRoute;
