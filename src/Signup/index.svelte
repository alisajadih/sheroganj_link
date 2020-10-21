<script>
  import Header from "./Header.svelte";
  import PhoneForm from "./PhoneForm.svelte";
  import OTPForm from "./OTPForm.svelte";
  import { errors, save, saving } from "./formStore";
  import ErrorAlert from "./ErrorAlert.svelte";

  let phoneSubmitted = false;

  let form = {
    phoneNumber: "",
    otp: "",
  };
  const onSubmitPhoneNumber = async () => {
    await save(form);
    phoneSubmitted= true;
  };
  const onSubmitOtp = async () => {};
</script>

<style>
  .signup-container {
    position: relative;
  }
</style>

<div class="signup-container">
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
