<script>
  import Page from "./success/Page.svelte";
  import Signup from "./Signup/index.svelte";
  import PopUp from "./popup/index.svelte";
  import { Route, Router } from "svelte-routing";
  import Callback from "./Callback.svelte";
import FailPayment from "./fail/FailPayment.svelte";

  export let url = "";
</script>

<style>
  .app {
    width: 100%;
    /* height: 100vh; */
    min-height: 100% !important;
    /* height: 100%; */
  }
</style>

<div class="app">
  <Router basepath="/app" {url}>
    <Route path="/activate/:uid" component={Signup} />
    <Route path="/success" component={Page} />
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
