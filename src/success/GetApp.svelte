<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { baseurl } from "../Signup/formStore";

  let downloads = [];

  onMount(async () => {
    const res = await axios(baseurl + "/api/download_links/");
    downloads = res.data;
  });
</script>

<style>
  #image-wrapper {
    width: 315px;
    /* height: 400px; */
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 50px 150px #00416d1a;
    transform: translateY(-15%);
    background: white;
  }

  #bazaar {
    width: 100%;
    height: 100%;
  }
</style>

<div id="image-wrapper">
  {#each downloads as dl}
    {#if dl.is_active}
      <div class="mt-2">
        <a href={dl.link}>
          <img
            id="bazaar"
            src={dl.image}
            alt="download_image" />
        </a>
      </div>
    {/if}
  {/each}
</div>
