import axios from "axios";
import { writable } from "svelte/store";
import { navigate } from "svelte-routing";

export let errors = writable(null);
export let saving = writable(false);
export let success = writable(null);

const baseurl = "http://171.22.24.129";

//requesting
// "/invite" status = 404 , invalid uid | status = 400 , error haye farsi
const wait = (ms) => new Promise((res) => setTimeout(res, ms));
export const save = async (form, uid) => {
  console.log(form, uid);
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
  errors.set(null);
  try {
    const res = await axios.post(baseurl + "/api/invite/" + uid, {
      invited_mobile_number: form.phoneNumber,
    });
    errors.set(null);
    saving.set(false);
  } catch (err) {
    errors.set({ phoneNumber: "شماره موبایل وارد شده صحیح نمیباشد" });
    saving.set(false);
    throw new Error();
  }

  // axios
  //   .post("http://171.22.24.129/api/invite/" + uid, {
  //     invited_mobile_number: form.phoneNumber,
  //   })
  //   .then((res) => {
  //     if (res.status >= 400) {
  //       saving.set(false);
  //       console.log(res);
  //       errors.set(res.data.errors);
  //       throw new Error();
  //     }
  //   })
  //   .catch((err) => {
  //     saving.set(false);
  //     console.log('here');
  //     errors.set({ phoneNumber: "شماره موبایل وارد شده معتبر نمیباشد" });
  //     throw new Error();
  //   });
  // errors.set(null);
  // saving.set(false);
  // //   errors.set(null);
  // console.log("requesting ...", form);
  // await wait(2000);
  // console.log("recived ...");

  // errors.set(null);
  // saving.set(false);
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
  saving.set(true);
  axios
    .post(baseurl + "/api/verify_invite/" + form.phoneNumber, {
      otp: form.otp,
    })
    .then((res) => {
      window.location.href = "http://171.22.24.129/app/success";
      saving.set(false);
      errors.set(null);
    })
    .catch((err) => {
      console.log(JSON.parse(JSON.stringify(err)));
      console.log(err.message);
      // console.log(err.data.non_field_errors, "here");
      saving.set(false);
      errors.set({ otp: "کد نامعتبر است" });
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
    saving.set(false);
    throw new Erro();
  }
};
