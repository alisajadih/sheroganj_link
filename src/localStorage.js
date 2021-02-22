// import { ICartForm } from "./../context/types";
// import { IInitialProduct } from "../context/types";

export const createTokenObj = (access, refresh) => ({
  access,
  refresh,
});
const accessTokenKey = "access";
const refreshTokenKey = "refresh";

export const LSService = {
  setToken: (tokenObj) => {
    localStorage.setItem(accessTokenKey, tokenObj.access);
    localStorage.setItem(refreshTokenKey, tokenObj.refresh);
    localStorage.setItem("user", "کاربر محترم");
  },
  getAccessToken: () => localStorage.getItem(accessTokenKey),
  getRefreshToken: () => localStorage.getItem(refreshTokenKey),
  clearToken: () => {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
    localStorage.removeItem("user");
  },
};
