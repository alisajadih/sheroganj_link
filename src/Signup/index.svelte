<script>
    import Header from "./Header.svelte";
    import Form from "./Form.svelte";
    import {errors, save, saving} from "./formStore";
    import ErrorAlert from "./ErrorAlert.svelte";

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
  {#if $errors}
    <ErrorAlert errorMessage={$errors.phoneNumber}/>
  {/if}
  <Header/>
  <Form bind:form on:submit={onSubmit} errors={$errors} loading={$saving}/>
</div>
