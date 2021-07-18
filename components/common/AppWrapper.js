import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  selectIsAuthnticated,
  setAuthntication,
} from "../../redux/store/auth-slice";
import { fetchClientsThunk } from "../../redux/store/clients-slice";
import jwt from "jsonwebtoken";

function AppWrapper({ children }) {
  const dispatch = useDispatch();

  const isAuthnticated = useSelector(selectIsAuthnticated);
  const token = useSelector(selectToken);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedData = jwt.decode(token);
      console.log("TOKEN", decodedData);
      dispatch(
        setAuthntication({
          authority: decodedData.authority,
          email: decodedData.email,
          exp: decodedData.exp,
          iat: decodedData.iat,
          name: decodedData.name,
          userId: decodedData.userId,
          token: token,
        })
      );
    }
  });
  useEffect(() => {
    if (isAuthnticated) {
      dispatch(
        fetchClientsThunk({
          token: token,
        })
      );
    }
  }, [isAuthnticated, token]);
  return <>{children}</>;
}

export default AppWrapper;
