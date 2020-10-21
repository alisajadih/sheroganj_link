import axios from "axios";
import { writable } from "svelte/store";

export let errors = writable(null);
export let saving = writable(false);
export let success = writable(null);

//requesting
// "/invite" status = 404 , invalid uid | status = 400 , error haye farsi
const wait = (ms) => new Promise((res) => setTimeout(res, ms));
export const save = async (form) => {
  if (
    form.phoneNumber === "" ||
    isNaN(Number(form.phoneNumber)) ||
    form.phoneNumber.length !== 10 ||
    !form.phoneNumber.startsWith("9")
  ) {
    errors.set({ phoneNumber: "شماره موبایل وارد شده صحیح نمیباشد." });
    return;
  }

  saving.set(true);
  //   errors.set(null);
  console.log("requesting ...", form);
  await wait(2000);
  console.log("recived ...");

  saving.set(false);
  //   const response = await api.post('product', form);

  //   if (response.status >= 400) {
  //     saving.set(false);
  //     errors.set(response.data.errors);
  //     return;
  //   }

  //   success.set(response.data.message);
  //   order.set(response.data.data);

  //   saving.set(false);
};
export const sendOTP = async (form) => {
  console.log(form, " in send otp");
  saving.set(true);
  try {
    const res = await axios.post(
      "http://171.22.24.129/api/verify_invite/" + form.phoneNumber,
      { Otp: form.otp }
    );
  } catch (err) {
    console.log(err);
    errors.set({ otp: err.non_field_errors[0] });
  }
  saving.set(false);
};
export const sendRefreshOtp = async (form) => {
  console.log(form, "  send refresh opt");
  saving.set(true);
  try {
    await axios.post(
      "http://171.22.24.129/api/refresh_invite/" + form.phoneNumber
    );
  } catch (err) {
    console.log(err);
    errors.set({ otp: err });
  }
  saving.set(false);
};
