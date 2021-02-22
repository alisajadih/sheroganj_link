<script>
  import { onMount } from "svelte";
  import { axiosInstance } from "../axiosInstance";

  let downloads = [];
  onMount(async () => {
    const res = await axiosInstance("/download_links/");
    console.log(res.data);
    downloads = res.data;
  });
  console.log(downloads);
</script>

<div class="pop-bg">
  <div class="image-wrapper mx-auto">
    <img width="180" src="/images/animation_500_kgkwosyz.gif" alt="box" />
  </div>
  <p class="pop-title mx-auto">ممنون از خرید شما</p>
  <p class="pop-content mx-auto">
    برای اطلاع از قرعه کشی ها لطفا پیج اینستاگرام شاعر را فالو کنید.
  </p>

  <div class="buttons-wrapper ">
    <a
      href={!!downloads.length && downloads[0].is_active && downloads[0].link}
      class="button secondary mx-auto d-flex align-items-center justify-content-center"
      >دانلود برنامه</a
    >
    <a
      href="https://www.instagram.com/mrnazari_org/"
      class="button primary margin-top mx-auto d-flex align-items-center justify-content-center"
      >فالو</a
    >
  </div>
</div>

<!-- href="sg://sheroganj" -->

<!-- href="https://www.instagram.com/mrnazari_org/" -->
<style>
  .pop-bg {
    background: linear-gradient(#fdd081, #f9a44a);
    /* padding-top: 12%; */
    height: 100vh;
    position: relative;
    /* min-height: 100% !important; */
  }
  .image-wrapper {
    width: 180px;
    height: 180px;
    position: absolute;
    top: 15%;
    right: 50%;
    transform: translate(50%);
    /* top:10%; */
    background-color: #fcd298;
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
