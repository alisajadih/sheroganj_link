<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { sendOTP, sendRefreshOtp } from "./formStore";
  import { slide } from "svelte/transition";
  const dispatch = createEventDispatcher();
  export let form;
  export let errors;
  export let loading;

  let timer = 120;
  const handleInput = (e) => {
    form.otp = e.target.value;
  };
  let interval;
  onMount(() => {
    interval = setInterval(() => {
      if (!timer) clearInterval(interval);
      else timer = timer - 1;
    }, 1000);
  });
  onDestroy(() => {
    clearInterval(interval);
  });

  const handleRefreshOtp = async () => {
    try {
      await sendRefreshOtp(form);
      timer = 120;
      interval = setInterval(() => {
        if (!timer) clearInterval(interval);
        else timer = timer - 1;
      }, 1000);
    } catch (err) {}
  };
  const handleSendOtp =  () => {
    sendOTP(form);
    // navigate("/success", { replace: true });
  };
  $: hasError = errors && errors["otp"];
  $: inputClasses = hasError ? "input-error" : "";
</script>

<style>
  .form-container {
    width: 315px;
    height: 280px;
    border-radius: 20px;
    background-color: white;
    position: absolute;
    bottom: -205px;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    box-shadow: 0 50px 150px #00416d1a;
    transition: all 0.3s;
  }
  .icon-input {
    width: 100%;
    height: 60px;
    border: none;
    margin: 8px 0;
    outline: none;
    padding: 8px 0 8px 0;
    transition: 0.3s;
    border-radius: 30px;
    text-align: center;
    background: #f8fafb;
    letter-spacing: 5px;
  }
  .icon-input::placeholder {
    letter-spacing: normal;
  }
  .icon-input:disabled {
    opacity: 0.8;
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
  .slide-up {
    height: 240px !important;
  }
</style>

<form
  class={`form-container mx-auto ${timer === 0 && 'slide-up'}`}
  on:submit|preventDefault={() => dispatch('submit')}>
  <p class="form-header">کد پیامک شده را وارد نمایید</p>
  <div class="icon-input-container mx-auto">
    <input
      name="otp"
      bind:value={form.otp}
      on:input={handleInput}
      class={`icon-input m-0 ${inputClasses}`}
      type="text"
      disabled={timer === 0}
      placeholder="کد تأ‌یید" />
  </div>
  {#if timer !== 0}
    <p transition:slide class="form-header">
      {Math.floor(timer / 60)}:{timer % 60}
    </p>
  {/if}
  {#if timer === 0}
    <button
      type="button"
      class="button-submit"
      on:click={handleRefreshOtp}
      disabled={loading}>{loading ? 'در حال ارسال پیامک ...' : 'ارسال مجدد پیامک'}</button>
  {:else}
    <button
      type="button"
      class="button-submit"
      on:click={handleSendOtp}
      disabled={loading}>{loading ? 'در حال تاٰیید کد ...' : 'ارسال'}</button>
  {/if}
</form>
