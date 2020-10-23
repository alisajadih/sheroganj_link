<script>
  import Header from "./Header.svelte";
  import PhoneForm from "./PhoneForm.svelte";
  import OTPForm from "./OTPForm.svelte";
  import { baseurl, errors, save, saving, wait } from "./formStore";
  import ErrorAlert from "./ErrorAlert.svelte";
  import axios from "axios";

  export let uid;

  let phoneSubmitted = false;

  let form = {
    phoneNumber: "",
    otp: "",
  };
  const onSubmitPhoneNumber = async () => {
    // const res = await axios.post(baseurl + "/api/invite/" + uid, {
    //   invited_mobile_number: form.phoneNumber,
    // });
    // console.log(res , 'here');
    try {
      await save(form, uid);
      if (!$errors) {
        phoneSubmitted = true;
      }
    } catch (err) {}
  };
  const onSubmitOtp = async () => {};
</script>

<style>
  .signup-container {
    position: relative;
  }
  /* @media (min-width: 992px) {
    .signup-container {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: static;
    }
  } */
</style>

<!-- <div id="main-wrapper" class='d-lg-flex justify-content-center align-items-center'> -->
<div class="signup-container ">
  {#if $errors}
    <ErrorAlert errorMessage={$errors} />
  {/if}
  <Header />
  {#if phoneSubmitted}
    <OTPForm
      bind:form
      on:submit={onSubmitOtp}
      errors={$errors}
      loading={$saving} />
  {:else}
    <PhoneForm
      bind:form
      on:submit={onSubmitPhoneNumber}
      errors={$errors}
      loading={$saving} />
  {/if}
</div>
<!-- </div> -->
