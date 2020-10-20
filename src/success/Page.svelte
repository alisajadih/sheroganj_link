<script>
    import GetApp from "./GetApp.svelte";
</script>
<style>
    .flex {
        display: flex;
    }
    .flex-col {
        flex-direction: column;
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
    #upper {
        background: #fef3e6;
        height: 326px;
        width: 100%;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
    }
    #logo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        color: #00416d;
        background: rgba(0, 65, 109, 0.05);
        margin-top: 50px;
    }
    #success-message {
        font-size: 21px;
        color: #f9a44a;
        margin-top: 30px;
    }
</style>
<div class='flex flex-col items-center'>
    <div id='upper' class='flex flex-col items-center'>
        <div id='logo' class='flex flex-col items-center justify-center'>
            Logo
        </div>
        <p id='success-message'>شماره موبایل شما با موفقیت ثبت شد.</p>
    </div>
    <GetApp/>
</div>
