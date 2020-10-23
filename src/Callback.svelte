<script>
  import Axios from "axios";
  import { baseurl } from "./Signup/formStore";

  //request
  // export let status;
  const statusURL = window.location.search;
  console.log(statusURL);
  Axios.get(
    baseurl +
      "/api/confirm_buy/?" +
      "billNumber=" +
      statusURL.split("billNumber=")[1]
  )
    .then((res) => {
      console.log(res);
      window.location.href = "https://sheroganj.ir/app/successpayment";
    })
    .catch((err) => {
      console.log(err);
      window.location.href = "https://sheroganj.ir/app/failpayment";
    });
</script>

<style>
</style>
