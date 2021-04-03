<script>
  import Header from "./Header.svelte";
  import PhoneForm from "./PhoneForm.svelte";
  import OTPForm from "./OTPForm.svelte";
  import {
    baseurl,
    convertNumbers2English,
    errors,
    save,
    saving,
    wait,
  } from "./formStore";
  import ErrorAlert from "./ErrorAlert.svelte";
  import axios from "axios";
  import AmountForm from "../Amount/AmountForm.svelte";
  import { LSService } from "../localStorage";
  import { onMount } from "svelte";
  import { axiosInstance } from "../axiosInstance";
  // import Test from "./Test.svelte";

  export let uid;

  let phoneSubmitted = false;

  let timer = 120;
  onMount(async () => {
    let phoneNumber = localStorage.getItem("phone");
    const res =
      phoneNumber && (await axiosInstance.get(`/otp/info/${phoneNumber}/`));
    console.log(res);
    let remaining_time_of_otp = res && res.data.remaining_time_of_otp;
    timer = remaining_time_of_otp || timer;
    if (!res.data.expired_otp) {
      phoneSubmitted = true;
    }
    // console.log(timer);
    // interval = setInterval(() => {
    //   if (!timer) clearInterval(interval);
    //   else timer = timer - 1;
    // }, 1000);
  });

  let form = {
    phoneNumber: "",
    otp: "",
  };
  const onSubmitPhoneNumber = async () => {
    const tosenduid = uid === "new" ? null : uid;
    try {
      await save(form, tosenduid);
      // console.log(form.phoneNumber.toString().length);
      localStorage.setItem(
        "phone",
        form.phoneNumber.length === 11
          ? convertNumbers2English(form.phoneNumber).toString().slice(1)
          : convertNumbers2English(form.phoneNumber).toString()

        // `${convertNumbers2English(form.phoneNumber)}`.slice(1)
      );
      if (!$errors) {
        phoneSubmitted = true;
      }
    } catch (err) {
      // phoneSubmitted = true;
    }
  };
  const onSubmitOtp = async () => {};
</script>

<!-- <div id="main-wrapper" class='d-lg-flex justify-content-center align-items-center'> -->
<div class="signup-container ">
  {#if $errors}
    <ErrorAlert errorMessage={$errors} />
  {/if}
  <Header />
  {#if phoneSubmitted}
    <OTPForm
      bind:form
      {timer}
      on:submit={onSubmitOtp}
      errors={$errors}
      loading={$saving}
    />
  {:else}
    <PhoneForm
      bind:form
      on:submit={onSubmitPhoneNumber}
      errors={$errors}
      loading={$saving}
    />
  {/if}
  <!-- <AmountForm
    bind:form
    on:submit={onSubmitOtp}
    errors={$errors}
    loading={$saving}
  /> -->
  <!-- <Test
    bind:form
    on:submit={onSubmitOtp}
    errors={$errors}
    loading={$saving}
  /> -->
</div>

<!-- </div> -->
<style>
  .signup-container {
    position: relative;
  }
</style>
