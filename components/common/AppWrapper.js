import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  selectIsAuthnticated,
  setAuthntication,
} from "../../redux/store/auth-slice";
import { fetchClientsThunk } from "../../redux/store/clients-slice";
import jwt from "jsonwebtoken";
import { checkToken } from "../../utils/auth-helper";

function AppWrapper({ children }) {
  const dispatch = useDispatch();

  const isAuthnticated = useSelector(selectIsAuthnticated);
  const token = useSelector(selectToken);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedData = checkToken(token);
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
      } catch (e) {
        console.log("Invalid Token", e);
        localStorage.clear();
        dispatch(
          setAuthntication({
            authority: "",
            email: "",
            exp: "",
            iat: "",
            name: "",
            userId: "",
            token: "",
          })
        );
      }
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
