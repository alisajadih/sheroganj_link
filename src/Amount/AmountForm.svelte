<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import {
    convertNumbers2English,
    sendOTP,
    sendRefreshOtp,
    wait,
  } from "../Signup/formStore";
  import { toFaNumber } from "../intl";
  import { axiosInstance } from "../axiosInstance";
  import Header from "../Signup/Header.svelte";
  import ErrorAlert from "../Signup/ErrorAlert.svelte";
  const dispatch = createEventDispatcher();
  // export let form;
  // export let errors;
  // export let loading;

  let activeAmount = "50000";
  let radioValue = "offer";
  let inputAmountValue = "";
  let loading = "";
  let error = "";
  let inputRef;
  const handleRadio = (e) => {
    radioValue = e.target.value;
    if (radioValue === "favorite") {
      inputRef.disabled = false;
      inputRef.focus();
    }
    activeAmount = "";
    inputAmountValue = "";
  };
  const handleOfferClick = (offer) => {
    activeAmount = offer;
  };
  const handleOfferDisableClick = (offer) => {
    radioValue = "offer";
    activeAmount = offer;
    inputAmountValue = "";
  };
  const handleClickInput = () => {
    if (radioValue !== "favorite") {
      radioValue = "favorite";
      activeAmount = "";
      inputAmountValue = "";
    }
    inputRef.disabled = false;
    inputRef.focus();
  };

  const handleChangeInput = (e) => {
    // e.preventDefault()
    inputAmountValue = e.target.value;
    activeAmount = convertNumbers2English(inputAmountValue).toString();
  };
  const handleKeyPress = (e) => {
    const BIRTHNUMBER_ALLOWED_CHARS_REGEXP = /[0-9۱۲۳۴۵۶۷۸۹۰\/]+/;
    console.log();
    if (
      !BIRTHNUMBER_ALLOWED_CHARS_REGEXP.test(e.key) ||
      e.target.value.length >= 8
    ) {
      e.preventDefault();
    }
  };

  const handleSendAmount = async () => {
    console.log(activeAmount);
    if (Number(activeAmount) < 50000) {
      error = "حداقل مبلغ پرداختی 50,000 تومان است";
      wait(2000).then(() => {
        error = "";
      });
    } else {
      loading = "درحال انتقال به درگاه بانک...";
      try {
        const res = await axiosInstance.post("/buy/", {
          amount: convertNumbers2English(activeAmount.toString()),
        });
        const link = res?.data?.link;
        if (link) {
          window.location.href = link;
        }
      } catch (err) {
        error = "مشکلی پیش آمده است";
        wait(2000).then(() => {
          error = "";
        });
      }
    }
  };

  // $: hasError = errors && errors["otp"];
  // $: inputClasses = hasError ? "input-error" : "";
</script>

<div class="signup-container">
  {#if error}
    <ErrorAlert errorMessage={error} />
  {/if}
  <Header />
  <form class={`form-container `} on:submit|preventDefault={handleSendAmount}>
    <!-- <p class="form-header">کد پیامک شده را وارد نمایید</p> -->
    <div class="text-right mx-auto mt-4 radio-container">
      <div class="container">
        <div class="row">
          <div class="col d-flex align-items-center">
            <!-- <input
              type="radio"
              class="radio-select ml-1"
              id="offer"
              value="offer"
              on:input={handleRadio}
              checked={radioValue === "offer"}
            /> -->
            <label for="offer">حمایت شما، موجب دلگرمی ماست</label>
          </div>
        </div>
        <div class="row mt-2">
          {#each [50000, 100000, 150000, 200000] as am, i}
            <div class="col-6 mt-3">
              <div
                on:click={radioValue === "offer"
                  ? () => handleOfferClick(am)
                  : () => handleOfferDisableClick(am)}
                class={`offer-select py-4 d-flex  justify-content-center align-items-center   ${
                  radioValue === "offer" &&
                  Number(activeAmount) === am &&
                  "offer-active"
                }`}
              >
                <span>{toFaNumber(am)} تومان</span>
              </div>
            </div>
          {/each}
        </div>
        <!-- <div class="row mt-4">
          <div class="col d-flex align-items-center">
            <input
              type="radio"
              id="favorite"
              class="radio-select ml-1"
              value="favorite"
              on:input={handleRadio}
              checked={radioValue === "favorite"}
            />
            <label for="favorite">مبلغ دلخواه</label>
          </div>
        </div> -->
        <div class="row mt-4">
          <div class="col">
            <div class="icon-input-container mx-auto">
              <div style=" position:relative;">
                <input
                  name="amount"
                  bind:value={inputAmountValue}
                  on:keypress={handleKeyPress}
                  on:input={handleChangeInput}
                  class={`icon-input m-0 `}
                  type="text"
                  disabled={radioValue !== "favorite"}
                  placeholder="مبالغ دیگر  (حداقل 50,000 تومان)"
                  bind:this={inputRef}
                />
                <div
                  on:click={handleClickInput}
                  style="position:absolute; left:0; right:0; top:0; bottom:0;"
                />
              </div>
            </div>
            <button
              type="submit"
              class="button-submit"
              disabled={activeAmount === "" || loading}
            >
              {loading
                ? loading
                : `پرداخت ${
                    !!activeAmount ? toFaNumber(activeAmount) + " تومان " : ""
                  }`}
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>

<style>
  .signup-container {
    position: relative;
  }
  label {
    margin: 0 auto;
    color: #00416d;
    font-size: 18px;
    font-weight: 500;
  }
  .radio-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 2px solid #999;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    transition: 0.1s all linear;
    outline: none;
  }
  .radio-select:checked {
    border: 6px solid #f9a44a;
  }
  .offer-select.offer-disable {
    color: rgb(218, 218, 218);
    /* background-color: rgba(43, 94, 170, 0.4); */
  }
  .offer-select.offer-active {
    background: #f9a44a;
    color: white;
    /* border: 2px solid #f9a44a; */
  }
  .radio-container {
    width: 285px;
  }
  .offer-select {
    height: 30px;
    /* border: 2px solid rgb(218, 218, 218); */
    border-radius: 7px;
    cursor: pointer;
    background: #f7f7f7f5;
    /* color: white; */
    /* background: #fef3e6; */
    /* background: #2b5eaa; */
  }

  .form-container {
    width: 315px;
    height: 380px;
    border-radius: 20px;
    background-color: white;
    position: absolute;
    bottom: -270px;
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
  }
  .icon-input::placeholder {
    letter-spacing: normal;
  }
  .icon-input:disabled {
    opacity: 0.6;
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
    position: relative;
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
    height: 60px;
    display: block;
    width: 100%;
    border: none;
    background-color: #f9a44a;
    color: white;
    font-weight: bold;
    border-radius: 30px;
    margin-top: 18px;
    font-size: 20px;
  }
  .button-submit:focus {
    outline: none;
  }
  .button-submit:disabled {
    opacity: 0.5;
  }
  .slide-up {
    height: 240px !important;
  }
</style>
