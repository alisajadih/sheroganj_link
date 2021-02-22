<script>
  import { slide } from "svelte/transition";
  export let errorMessage;
  $: errorMessage =
    typeof errorMessage === "string"
      ? errorMessage
      : (errorMessage &&
          (errorMessage["otp"] || errorMessage["phoneNumber"])) ||
        "ارور";
</script>

<div
  transition:slide
  id="ErrorWrapper"
  class="flex align-items-center justify-content-center
mx-auto"
>
  <div id="ErrorContent" class="flex  align-items-center">
    <img id="ErrorImage" src="/images/group.svg" alt="error" />
    <p id="ErrorMessage">{errorMessage}</p>
  </div>
</div>

<!-- flex-col items-center flex-no-wrap  -->

<style>
  #ErrorWrapper {
    width: 100vw;
    height: 110px;
    border-bottom: 2px solid red;
    padding: 50px 30px 30px 80px;
    position: fixed;
    top: 0;
    background: white;
    text-align: right;
  }
  @media (min-width: 992px) {
    #ErrorWrapper {
      width: 400px;
      left: 50%;
      transform: translate(-50%);
    }
  }
  #ErrorImage {
    width: 33px;
    height: 30px;
  }
  #ErrorMessage {
    font-weight: 500;
    font-size: 15px;
    color: red;
    margin: 0;
    margin-right: 21px;
  }
  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .flex-no-wrap {
    flex-wrap: nowrap;
  }

  .flex-row {
    flex-direction: row;
  }

  .justify-center {
    justify-content: center;
  }

  .items-center {
    align-items: center;
  }

  .justify-around {
    justify-content: space-around;
  }
</style>
