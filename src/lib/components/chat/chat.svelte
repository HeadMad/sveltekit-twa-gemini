<script>
  let {children, items, item} = $props();
</script>


<div class="messages">
  {#if item}
    {#each items as data}
      {@render item(data)}
    {/each}
  {:else}
    {#each items as {me, text, name}}
    <div class={me ? 'me' : 'other'}>
      <b>{name}</b>
      {text}
    </div>
    {/each}
  {/if}
</div>


<style>
  .messages {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    padding: 1rem;
    gap: 1rem;
  }

  .me, .other {
    line-height: 1.6em;
    padding: .4em .7em;
    border-radius: 0.5em;
  }
  
  .me {
    align-self: self-end;
    margin-left: 20%;
    border-bottom-right-radius: 0;
    background-color: #d1dffc;
  }

  .other {
    align-self: self-start;
    margin-right: 20%;
    border-bottom-left-radius: 0;
    background-color: #e2e2e2;
  }

  b {
    display: block;
    font-size: 1em;
  }
</style>