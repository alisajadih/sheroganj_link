<script>
  import Axios from "axios";
  import { baseurl,baseFrontUrl } from "./Signup/formStore";

  //request
  // export let status;
  const statusURL = window.location.search;
  console.log(statusURL);
  console.log(baseurl +
      "/api/confirm_buy/?" +
      "billNumber=" +
      statusURL.split("billNumber=")[1])
  Axios.get(
    baseurl +
      "/api/confirm_buy/?" +
      "billNumber=" +
      statusURL.split("billNumber=")[1]
  )
    .then((res) => {
      console.log(res);
      window.location.href = baseFrontUrl + "/successpayment";
    })
    .catch((err) => {
      console.log(err);
      window.location.href = baseFrontUrl + "/failpayment";
    });
</script>

<style>
</style>
