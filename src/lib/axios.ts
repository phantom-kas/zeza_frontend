import axios from "axios";
import { useAuthStore } from "../store/auth";
import { useToastStore } from "../store/toast";
import { useLoaderStore } from "../store/loader";
import { isDev } from "../composabels/utils";

//;

if (isDev()) {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
  // axios.defaults.baseURL = "http://localhost:8000/api/";

  // axios.defaults.baseURL = "https://apishop.savanagh.com/api/";
  // axios.defaults.baseURL = "https://gc-rest-api.onrender.com/api/";

  // axios.defaults.baseURL = "https://gc-rest-api.onrender.com/api/";
} else {
  axios.defaults.baseURL = "https://apishop.savanagh.com/api/";
}
const axiosApiInstance = axios.create();

declare module "axios" {
  export interface AxiosRequestConfig {
    _load?: boolean;
    _load2?: boolean;
    _noRefresh?: boolean;
    _showAllMessages?: boolean;
    _showSuccessOnly?: boolean;
    _showErrorOnly?: boolean;
    _onSuccessMessages?: { status: string; message: string }[];
    _onErrorMessages?: { status: string; message: string }[];
    _onMessages?: { status: string; message: string }[];
  }
}

axios.interceptors.request.use((req) => {
  req.withCredentials = true;

  // const user = useAuthStore.getState();
  const token = useAuthStore.getState().token;
  if (token != undefined && token != "") {
    req.headers.Authorization = "Bearer " + token;
  } else {
    req.headers.Authorization = "";
  }

  if (req._load !== undefined) {
    if (req._load) {
      console.log("begin loading");
      const loader = useLoaderStore.getState();
      loader.start();
    }
  }
  if (req._load2 !== undefined) {
    if (req._load2) {
      console.log("begin loading");
      const loader = useLoaderStore.getState();
      loader.start2();
    }
  }

  return req;
});

let refresh = false;
let c = 0;
axios.interceptors.response.use(
  (response: any) => {
    if (response.data) {
      if (response.config._showAllMessages != undefined) {
        const alerts = useToastStore.getState();
        alerts.addToast(response.data.message, response.data.status, "s");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      response.data.status == "success" &&
        response.config._onSuccessMessages != undefined &&
        response.config._onSuccessMessages.forEach(
          (a: { message: string; status: string }) => {
            const alerts = useToastStore.getState();
            alerts.addToast(a.message, a.status, "s");
          }
        );
    }

    if (response.config._load != undefined) {
      if (response.config._load) {
        console.log("loadend on success");
        const loader = useLoaderStore.getState();
        loader.stop();
      }
    }
    if (response.config._load2 != undefined) {
      if (response.config._load2) {
        console.log("loadend on success");
        const loader = useLoaderStore.getState();
        loader.stop2();
      }
    }
    return response;
  },

  async function (error: any) {
    const loader = useLoaderStore.getState();
    loader.stop2();
    loader.stop();

    const originalRequest = error.config;
    const user = useAuthStore.getState();
    // const router1 = router;
    const alerts = useToastStore.getState();
    console.log("------------------------");
    console.log(originalRequest);
    console.log("------------------------++++");
    if (error.response) {
      if (originalRequest._showAllMessages) {
        const alerts = useToastStore.getState();
        console.log(
          "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
        );
        console.log(error.response.data.message);
        console.log(
          "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
        );
        alerts.addToast(
          error.response.data.message,
          error.response.data.status,
          "s"
        );

        if (error.response.data.errors) {
          // window.alert('op')
          for (let key in error.response.data.errors) {
            error.response.data.errors[key].forEach((el) => {
              alerts.addToast(el, "error");
            });
          }
        }
      }
    }
    if (originalRequest) {

      if (originalRequest._noRefresh) {
        return error.response;
      }
    }
    if (error.response) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ((refresh && error.response.status == 401) ||
        error.response.status != 401) &&
        alerts.addToast(
          error.response.data.message,
          error.response.data.status,
          "s"
        );
      // window.alert(error.response.status)
      // throw error;
    }
    if (error.response && error.response.status === 401 && !refresh) {
      originalRequest._retry = true;
      c = c + 1;
      refresh = true;
      let url = "";
      const data = {
        refreshToken: null,
      };
      url = "refresh";
      return axios({
        url,
        method: "POST",
        data,
      })
        .finally(() => { })
        .then(function (res) {
          return res;
        })
        .then((res) => {
          // localStorage.setItem("token", res.data.data.accessToken);
          if (res.data.status != "success") {
            user.setToken(null);
            return
          }
          user.setToken(res.data.data.access_token);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.data.access_token;
          originalRequest.headers.Authorization =
            axios.defaults.headers.common["Authorization"];
          refresh = false;
          return res;
        })

        .then(() => {
          return axiosApiInstance(originalRequest);
        })
        .catch((error) => {
          // router1.push({ name: "login" });
          alerts.addToast(
            error.response.data.message + c,
            error.response.data.status,
            "s"
          );
          return;
        });
    } else if (error.response && error.response.status === 401 && refresh) {
      refresh = false;
      // const alerts = useToastStore.getState();
      // const router1 = router;
      // router1.push({ name: "login" });
      return;
    } else if (!error.response) {
      console.log(error.response);
      alerts.addToast("Network Error", "error", "s");
      return;
    }
    //  else if (error.response.status == 403) {
    //   const router1 = router;
    //   router1.push({ name: "dashboard" });
    //   return;
    // }
    c = 0;
    return Promise.reject(error);
  }
);

export default axios;
