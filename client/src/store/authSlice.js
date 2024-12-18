import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie";

const token = Cookies.get("token");

const initialState = {
  userInfo: token
    ? jwtDecode(token)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const token = Cookies.get("token");
      state.userInfo = token
      ? JSON.stringify(jwtDecode(token))
      : null;
      localStorage.setItem("userInfo", state.userInfo);
    },
    clearCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      Cookies.remove("token")
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;