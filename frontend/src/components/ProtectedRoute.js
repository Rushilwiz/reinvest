import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/profile`,
        requestOptions
      );

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated()) {
          return <Component {...props} {...rest} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
