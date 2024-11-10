<script>
  import { Loader } from "$lib/components";
  import { expandTextareaHeight } from "$lib/actions";

  let {data} = $props();
  const messages = $state([
    'Hello',
    'World from some random file World from some random file World from some random file',
    'World from some random file World from some random file World from some random file World from some random file World from some random file World from some random file',
    'World from some random file World from some random file World from some random file',
    'SvelteKit',
    'with',
    'Vite'
  ]);

  let value = $state('');
  let isSubmitted = $state(false);

  function onCtrlEnter(event) {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      document.querySelector("button").click();
    }
  }

</script>
<pre>{JSON.stringify(data, null, 2)}</pre>

<main>
  <div class="messages">
    {#each messages as message}
      <div>{message}</div>
    {/each}
  </div>

  <form method="POST">
    <label class="text-area">
      <textarea
        id="text"
        rows="1"
        name="text"
        bind:value
        onkeydown={onCtrlEnter}
        disabled={isSubmitted}
        use:expandTextareaHeight={6}
      ></textarea>
      <button type="submit" disabled={!value || isSubmitted}>
        {#if isSubmitted}
          <Loader size="20px" color="#000" thickness="2px" />
        {:else}
          <img src="finger.svg" alt="" />
        {/if}
      </button>
    </label>
  </form>
</main>


<style>
  main {
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid #ccc;
    height: 100%;
  }

  .messages {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    padding: 1rem;
    background-color: #eee;
    gap: 1rem;
  }
  .messages > div {
    font-size: .9rem;
    line-height: 1.6em;
    padding: .4em .7em;
    border-radius: 0.5em;
  }
  
  .messages div:nth-child(even) {
    align-self: self-start;
    margin-right: 20%;
    border-bottom-left-radius: 0;
    background-color: #e2e2e2;
  }
  
  .messages div:nth-child(odd) {
    align-self: self-end;
    margin-left: 20%;
    border-bottom-right-radius: 0;
    background-color: #d1dffc;
  }


  form {
    width: 100%;
    position: relative;
  }

  .text-area {
    position: relative;
    display: block;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      border-top: 1px solid #ccc;
      height: 18px;
      width: 100%;
      background: linear-gradient(#fff, transparent);
    }
  }

  textarea {
    font-family: inherit;
    display: block;
    box-sizing: border-box;
    line-height: 22px;
    font-size: 16px;
    overflow-y: auto;
    resize: none;
    outline: 0;
    width: 100%;
    border: 1px solid #ccc;
    border-width: 1px 0;
    padding: 14px 45px 14px 14px;
    transition: .3s;

    &::-webkit-scrollbar {
      width: 2px;
    }

    &::-webkit-scrollbar-track {
      background: #fff;
      padding-right: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 1px;
      border: 0;
      width: 2px;
    }
  }

  button {
    position: absolute;
    bottom: 0;
    padding: 15px 15px 15px 5px;
    height: 50px;
    width: 40px;
    right: 0;
    background: none;
    border: none;
    /* outline: 1px solid #ccc; */
    cursor: pointer;
    z-index: 1;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;

    &[disabled] {
      opacity: 0.3;
    }
  }

  img {
    width: 20px;
    height: 20px;
  }

</style>