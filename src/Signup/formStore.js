import { writable } from "svelte/store";
import { navigate } from "svelte-routing";
import { axiosInstance } from "../axiosInstance";
import { createTokenObj, LSService } from "../localStorage";

export let errors = writable(null);
export let saving = writable(false);
export let success = writable(null);

export const baseFrontUrl = process.env.isProd
  ? "https://app.sheroganj.ir"
  : "http://localhost:5000";
export const baseurl = "https://api.sheroganj.ir";

export function convertNumbers2English(string) {
  return string
    .replace(/[\u0660-\u0669]/g, function (c) {
      return c.charCodeAt(0) - 0x0660;
    })
    .replace(/[\u06f0-\u06f9]/g, function (c) {
      return c.charCodeAt(0) - 0x06f0;
    });
}
//requesting
// "/invite" status = 404 , invalid uid | status = 400 , error haye farsi
export const wait = (ms) => new Promise((res) => setTimeout(res, ms));
export const save = async (form, uid) => {
  let phoneNumber = convertNumbers2English(form.phoneNumber);
  if (
    convertNumbers2English(form.phoneNumber).length === 11 &&
    convertNumbers2English(form.phoneNumber).startsWith("0")
  ) {
    phoneNumber = phoneNumber.slice(1);
  } else if (
    form.phoneNumber === "" ||
    isNaN(Number(convertNumbers2English(form.phoneNumber))) ||
    convertNumbers2English(form.phoneNumber).length !== 10 ||
    !convertNumbers2English(form.phoneNumber).startsWith("9")
  ) {
    errors.set({ phoneNumber: "شماره موبایل وارد شده صحیح نمیباشد." });
    saving.set(false);
    wait(2000).then(() => {
      errors.set(null);
    });
    return;
  }

  errors.set(null);
  try {
    saving.set(true);
    const res = await axiosInstance.post(
      "/invite/",
      {
        mobile_number: convertNumbers2English(phoneNumber),
      },
      { params: { invite_code: uid } }
    );
    errors.set(null);
  } catch (err) {
    console.log(err.response);
    const errorDate = err.response.data.invited_mobile_number;
    if (errorDate[1] === "406") {
      // redirect to success
      window.location.href = baseFrontUrl + "/success";
    } else {
      errors.set({ phoneNumber: err.response.data.invited_mobile_number[0] });
      wait(2000).then(() => {
        errors.set(null);
      });
    }
  } finally {
    saving.set(false);
  }
};
export const sendOTP = async (form) => {
  let phoneNumber = form.phoneNumber;
  if (
    convertNumbers2English(form.phoneNumber).length === 11 &&
    convertNumbers2English(form.phoneNumber).startsWith("0")
  ) {
    phoneNumber = phoneNumber.slice(1);
  }
  saving.set(true);
  axiosInstance
    .post("/invite/confirm/", {
      mobile_number: convertNumbers2English(phoneNumber),
      password: convertNumbers2English(form.otp),
    })
    .then((res) => {
      // window.location.href = baseFrontUrl + "/success";
      window.location.href = baseFrontUrl + "/amount";
      const tokenObj = createTokenObj(res?.data?.access, res?.data?.refresh);
      LSService.setToken(tokenObj);
      if (res?.data?.user?.is_bought) {
        window.location.href = baseFrontUrl + "/success";
      } else {
        console.log("here");
        window.location.href = baseFrontUrl + "/amount";
      }
      saving.set(false);
      errors.set(null);
    })
    .catch((err) => {
      console.log(JSON.parse(JSON.stringify(err)));
      console.log(err.message);
      // console.log(err.data.non_field_errors, "here");
      saving.set(false);
      errors.set({ otp: "کد نامعتبر است" });
      wait(2000).then(() => {
        errors.set(null);
      });
    });
};
export const sendRefreshOtp = async (form) => {
  console.log(form, "send refresh opt");
  saving.set(true);
  try {
    await axiosInstance.post(
      baseurl +
        "/api/refresh_invite/" +
        convertNumbers2English(form.phoneNumber)
    );
    errors.set(null);
    saving.set(false);
  } catch (err) {
    errors.set({
      otp:
        "کد تایید شما هنوز معتبر است و قبل از منقضی شدن آن انجام چنین عملیاتی وجود ندارد",
    });
    wait(2000).then(() => {
      errors.set(null);
    });
    saving.set(false);
    throw new Error();
  }
};
