import axios from "axios";
import { writable } from "svelte/store";
import { navigate } from "svelte-routing";

export let errors = writable(null);
export let saving = writable(false);
export let success = writable(null);

export const baseurl = "https://sheroganj.ir";

//requesting
// "/invite" status = 404 , invalid uid | status = 400 , error haye farsi
export const wait = (ms) => new Promise((res) => setTimeout(res, ms));
export const save = async (form, uid) => {
  let phoneNumber = form.phoneNumber;
  if (form.phoneNumber.length === 11 && form.phoneNumber.startsWith("0")) {
    phoneNumber = phoneNumber.slice(1);
  } else if (
    form.phoneNumber === "" ||
    isNaN(Number(form.phoneNumber)) ||
    form.phoneNumber.length !== 10 ||
    !form.phoneNumber.startsWith("9")
  ) {
    errors.set({ phoneNumber: "شماره موبایل وارد شده صحیح نمیباشد." });
    wait(2000).then(() => {
      errors.set(null);
    });
    return;
  }
  saving.set(true);
  errors.set(null);
  try {
    const res = await axios.post(baseurl + "/api/invite/" + uid, {
      invited_mobile_number: phoneNumber,
    });
    errors.set(null);
    saving.set(false);
  } catch (err) {
    console.log(err.response);
    errors.set({ phoneNumber: err.response.data.invited_mobile_number[0] });
    wait(2000).then(() => {
      errors.set(null);
    });
    saving.set(false);
    throw new Error();
  }
};
export const sendOTP = async (form) => {
  let phoneNumber = form.phoneNumber
  if (form.phoneNumber.length === 11 && form.phoneNumber.startsWith("0")) {
    phoneNumber = phoneNumber.slice(1);
  }
  saving.set(true);
  axios
    .post(baseurl + "/api/verify_invite/" + phoneNumber, {
      otp: form.otp,
    })
    .then((res) => {
      window.location.href = "http://sheroganj.ir/app/success";
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
  console.log(form, "  send refresh opt");
  saving.set(true);
  try {
    await axios.post(baseurl + "/api/refresh_invite/" + form.phoneNumber);
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
    throw new Erro();
  }
};
