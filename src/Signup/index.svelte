<script>
  import Header from "./Header.svelte";
  import PhoneForm from "./PhoneForm.svelte";
  import OTPForm from "./OTPForm.svelte";
  import { baseurl, errors, save, saving, wait } from "./formStore";
  import ErrorAlert from "./ErrorAlert.svelte";
  import axios from "axios";
  import AmountForm from "../Amount/AmountForm.svelte";
  // import Test from "./Test.svelte";

  export let uid;

  let phoneSubmitted = false;

  let form = {
    phoneNumber: "",
    otp: "",
  };
  const onSubmitPhoneNumber = async () => {
    const tosenduid = uid === "new" ? null : uid;
    try {
      await save(form, tosenduid);
      if (!$errors) {
        phoneSubmitted = true;
      }
    } catch (err) {
      console.log(err.response);
      phoneSubmitted = true;
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
