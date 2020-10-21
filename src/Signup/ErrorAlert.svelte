<script>
  export let errorMessage;
</script>
<style>
  #ErrorWrapper {
      width: 100vw;
      height: 110px;
      border-bottom: 2px solid red;
      padding: 50px 30px 30px 80px;
      position: fixed;
      top: 0;
      background: white;
  }
  #ErrorImage {
      width: 33px;
      height: 30px;
  }
  #ErrorMessage {
      font-weight: 500;
      font-size: 15px;
      color: red;
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
<div id="ErrorWrapper" class="flex flex-col items-center flex-no-wrap">
  <div id="ErrorContent" class="flex flex-no-wrap flex-row">
    <img id="ErrorImage" src="/images/group.svg" alt="error">
    <p id="ErrorMessage">{errorMessage}</p>
  </div>
</div>