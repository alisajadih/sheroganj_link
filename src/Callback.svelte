<script>
  import Axios from "axios";
  import { baseurl } from "./Signup/formStore";

  //request
  // export let status;
  const statusURL = window.location.search;
  Axios.get(baseurl + "/api/confirm_buy/" + statusURL.split("?")[1])
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
</script>

<style>
</style>
