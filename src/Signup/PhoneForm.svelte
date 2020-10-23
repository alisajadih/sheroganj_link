<script>
  import { createEventDispatcher } from "svelte";
  import CallSvg from "./CallSVG.svelte";
  const dispatch = createEventDispatcher();
  export let form;
  export let errors;
  export let loading;

  const handleInput = (e) => {
    form.phoneNumber = e.target.value;
  };
  const handleFocus = (e) => {
    hasFocus = true;
  };
  const handleBlue = () => {
    hasFocus = false;
  };
  let hasFocus = false;
  $: hasError = errors && errors["phoneNumber"];
  $: inputClasses = hasError ? "input-error" : "";
</script>

<style>
  .form-container {
    width: 315px;
    height: 245px;
    border-radius: 20px;
    background-color: white;
    position: absolute;
    bottom: -170px;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    box-shadow: 0 50px 150px #00416d1a;
  }
  @media (min-width: 992px) {
    /* .form-container {
      left: 35%;
      top: 25%;
      bottom: 0;
      transform: translate(-50% , 50%);
      position: static;
    } */
  }

  .icon-input {
    width: 100%;
    height: 60px;
    border: none;
    margin: 8px 0;
    outline: none;
    padding: 8px 70px 8px 0;
    transition: 0.3s;
    border-radius: 30px;
    text-align: right;
    background: #f8fafb;
  }
  .icon-input:focus {
    background-color: #fef8f0;
    color: #00416d;
  }
  .icon-error {
    color: #ff0000 !important;
  }
  .input-error {
    border: 1px solid #ff0000;
  }
  .icon-input-container {
    margin-top: 29px;
    position: relative;
    width: 265px;
  }
  .form-header {
    color: #00416d;
    margin-top: 25px;
    font-size: 14px;
    margin-bottom: 0;
  }
  .icon-container {
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    position: absolute;
    color: #00416d;
    background: white;
    /* border: 1px solid red; */
    right: 5px;
    top: 50%;
    transform: translate(0%, -50%);
  }

  .button-submit {
    width: 265px;
    height: 60px;
    border: none;
    background-color: #f9a44a;
    color: white;
    border-radius: 30px;
    margin-top: 25px;
  }
  .button-submit:focus {
    outline: none;
  }
  .button-submit:disabled {
    opacity: 0.8;
  }
</style>

<form
  class="form-container mx-auto"
  on:submit|preventDefault={() => dispatch('submit')}>
  <p class="form-header">برای دانلود اپلیکیشن شماره موبایلتان را وارد کنید</p>
  <div class="icon-input-container mx-auto">
    <div class={`icon-container`}>
      <!-- <img src="/images/call.svg" alt="mobile icon" /> -->
      <CallSvg
        color={hasError ? '#ff0000' : hasFocus ? '#f7b46e' : '#00416d'} />
    </div>
    <input
      name="phoneNumber"
      bind:value={form.phoneNumber}
      on:input={handleInput}
      class={`icon-input m-0 ${inputClasses}`}
      type="text"
      on:focus={handleFocus}
      on:blur={handleBlue}
      placeholder="شماره موبایل" />
  </div>
  <button
    type="submit"
    class="button-submit"
    disabled={loading}>{loading ? 'در حال ارسال ...' : 'ثبت شماره'}</button>
</form>
