<script>
    import Page from "./success/Page.svelte";
    import Signup from "./Signup/index.svelte";
    import {Route, Router} from "svelte-routing";

    export let url = "";
</script>

<style>
  .app {
    width: 100%;
    height: 100%;
  }
</style>

<Router {url}>
  <div class="app">
    <Route path="success" component={Page} />
    <Route path="activate" component={Signup} />
  </div>
</Router>

<!-- <Form /> -->
