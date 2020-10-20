<script>

</script>

<style>
  .form-container {
    width: 315px;
    height: 245px;
    border-radius: 20px;
    background-color: white;
    position: absolute;
    bottom: -170px;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    box-shadow: 0 50px 150px #1a00416d;
  }
  .icon-input {
    width: 100%;
    height: 60px;
    border: none;
    margin: 8px 0;
    outline: none;
    padding: 8px 70px 8px 0;
    transition: 0.3s;
    border-radius: 30px;
    text-align: right;
    background: #f8fafb;
  }
  .icon-input-container {
    margin-top: 29px;
    position: relative;
    width: 265px;
  }
  .form-header {
    color: #00416d;
    margin-top: 25px;
    font-size: 14px;
    margin-bottom: 0;
  }
  .icon-container {
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    position: absolute;
    color: #00416d;
    background: white;
    /* border: 1px solid red; */
    right: 5px;
    top: 50%;
    transform: translate(0%, -50%);
  }

  .button-submit {
    width: 265px;
    height: 60px;
    border: none;
    background-color: #f9a44a;
    color: white;
    border-radius: 30px;
    margin-top: 25px;
  }
  .button-submit:focus {
    outline: none;
  }
</style>

<div class="form-container mx-auto">
  <p class="form-header">برای دانلود اپلیکیشن شماره موبایلتان را وارد کنید</p>
  <div class="icon-input-container mx-auto">
    <div class="icon-container">
      <img src="/images/call.svg" alt="mobile icon" />
    </div>
    <input class="icon-input m-0" type="text" placeholder="شماره موبایل" />
  </div>
  <button class="button-submit">ثبت شماره</button>
</div>
