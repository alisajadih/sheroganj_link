<script>
  import Header from "./Header.svelte";
  import Form from "./Form.svelte";
  import { saving,save,errors } from "./formStore";

  let form = {
    phoneNumber: "",
  };
  const onSubmit = () => {
    save(form);
  };
</script>

<style>
  .signup-container {
    position: relative;
  }
</style>

<div class="signup-container">
  
  <Header />
  <Form bind:form on:submit={onSubmit} errors={$errors} loading={$saving}/>
</div>
