<script>
  import Page from "./success/Page.svelte";
  import Signup from "./Signup/index.svelte";
  import PopUp from "./popup/index.svelte";
  import { Route, Router } from "svelte-routing";
  import Callback from "./Callback.svelte";
  import FailPayment from "./fail/FailPayment.svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { axiosInstance } from "./axiosInstance";
  import { baseFrontUrl } from "./Signup/formStore";
  import AmountForm from "./Amount/AmountForm.svelte";

  onMount(async () => {
    try {
      const res = await axiosInstance.get("/buy/");
      const href = window.location.href;
      // console.log(window.location.pathname);
      if (
        href === baseFrontUrl + "/successpayment" ||
        href === baseFrontUrl + "/failpayment" ||
        href.startsWith(baseFrontUrl + "/callback")
      )
        return;
      if (res?.data?.is_bought) {
        navigate("/success");
      } else {
        navigate("/amount");
      }
    } catch (err) {
      if (
        err?.response?.status === 401 &&
        href !== baseFrontUrl + "/activate/new"
      ) {
        navigate("/activate/new");
      }
    }
  });

  export let url = "";
</script>

<div class="app">
  <Router {url}>
    <Route path="/activate/:uid" component={Signup} />
    <Route path="/success" component={Page} />
    <Route path="/amount" component={AmountForm} />
    <Route path="/successpayment" component={PopUp} />
    <Route path="/failpayment" component={FailPayment} />
    <Route path="/callback" component={Callback} />
  </Router>
</div>
<!-- <Form /> -->

<!-- orange container on the center
    form should be on the left title and content should be on the right
    error box in large mode should be smaller 
    
    first form : dar hale ersal 
    second form : timer should be disapear and button content should be "ارسال مجدد کد تایید"
    page bad az kharid; 
     -->
<style>
  .app {
    width: 100%;
    /* height: 100vh; */
    min-height: 100% !important;
    /* height: 100%; */
  }
</style>
