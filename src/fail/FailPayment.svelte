<script>
  import { baseFrontUrl } from "../Signup/formStore";
</script>

<div class="pop-bg ">
  <div class="image-wrapper mx-auto">
    <img width="120" src="/images/close.png" alt="box" />
  </div>
  <p class="pop-title mx-auto">متاسفانه پرداخت ناموفق بود.</p>

  <div class="buttons-wrapper ">
    <a
      href={baseFrontUrl + "/amount"}
      class="button secondary margin-top mx-auto d-flex align-items-center justify-content-center"
      >تلاش مجدد</a
    >
  </div>
</div>

<!-- href="sg://sheroganj" -->
<style>
  .pop-bg {
    background: linear-gradient(#fdd081, #f9a44a);
    /* padding-top: 12%; */
    height: 100vh;
    position: relative;
    /* min-height: 100% !important; */
  }
  .image-wrapper {
    /* width: 90px; */
    /* height: 90px; */
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 25%;
    right: 50%;
    transform: translate(50%);
    /* top:10%; */
    background-color: transparent;
    border-radius: 100%;
    overflow: hidden;
  }
  .pop-title {
    font-size: 36px;
    width: 300px;
    color: white;
    /* margin-top: 30px; */
    text-align: center;
    font-weight: 700;
    padding: 0;
    position: absolute;
    top: 49%;
    right: 50%;
    transform: translate(50%);
  }
  .pop-content {
    font-size: 16px;
    text-align: center;
    width: 316px;
    /* margin-top: 10px; */
    color: white;
    position: absolute;
    top: 57%;
    right: 50%;
    transform: translate(50%);
  }
  .button {
    display: block;
    width: 315px;
    height: 60px;
    border-radius: 30px;
    font-size: 16px !important;
    font-weight: 500;
  }
  .secondary {
    background: white;
    color: #f9a44a !important;
  }
  .primary {
    background: transparent;
    border: 1.5px solid white;
    color: white !important;
  }
  .buttons-wrapper {
    /* margin-top: 20%; */
    top: 70%;
    right: 50%;
    transform: translate(50%);
    position: absolute;
  }
  .margin-top {
    margin-top: 20px;
  }
</style>
