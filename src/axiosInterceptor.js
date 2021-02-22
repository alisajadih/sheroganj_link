import {AxiosInstance} from "axios";
import { createTokenObj, LSService } from "./localStorage";
import { baseFrontUrl } from "./Signup/formStore";
// import { redirect } from "../navigation/navigation";

// let isProfileReq = false;

export const axiosInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = LSService.getAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // noinspection JSIgnoredPromiseFromCall
      Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && originalRequest.url === "/refresh/") {
        LSService.clearToken();
        // noinspection JSIgnoredPromiseFromCall
        // Router.replace("/panel/login");
        window.location.href=`${baseFrontUrl}/activate/new`
        return Promise.reject(error);
      }
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !(originalRequest.url).startsWith("/management/account/login") &&
        LSService.getRefreshToken()
      ) {
        originalRequest._retry = true;
        return axiosInstance
          .post("/refresh/", {
            refresh: LSService.getRefreshToken(),
          })
          .then((res) => {
            if (res.status === 200) {
              //1)save token in ls
              LSService.setToken(createTokenObj(res.data.access, LSService.getRefreshToken())); //res.data is an object {access , refresh}
              //2)Change Authorization Header
              axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${LSService.getAccessToken()}`;
              return axiosInstance(originalRequest);
            }
            return null;
          });
      }
      return Promise.reject(error);
    }
  );
};
