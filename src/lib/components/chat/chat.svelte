<script>
  let {
    items,
    item,
    group = false,
    ...rest
  } = $props();

</script>

<div class="messages" {...rest}>
  {#if item}
    {#each items as { me, ...data }}
      <div class="message" class:me>{@render item({ me, ...data })}</div>
    {/each}
  {:else}
    {#each items as { me, text, user, timestamp }}
      <div class="message" class:me>
        <div class="inner">
          {#if group}{#if !me}<a href={user.link} class="username">{user.name}</a
            >{/if}{/if}
          {text}
          <span class="time">{new Date(timestamp).toLocaleTimeString('ru').slice(0, -3)}</span>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>

  .messages {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    padding: 1rem;
    gap: 1rem;
  }

  .message {
    align-self: self-start;
    margin-right: 20%;
  }

  .me {
    align-self: self-end;
    margin-left: 20%;
    margin-right: 0;
  }

  .inner {
    line-height: 1.6em;
    padding: 0.4em 0.7em;
    border-radius: 0.5em;
    white-space: pre-wrap;
    border-bottom-left-radius: 0;
    background-color: #e2e2e2;
  }

  .me > .inner {
    border-radius: 0.5em;
    border-bottom-right-radius: 0;
    background-color: #d1dffc;
  }

  .inner::after {
    content: "";
    display: block;
    clear: both;
    height: 0;
    width: 100%;
  }

  .username {
    display: block;
    font-size: 0.9em;
    font-weight: bold;
    color: #47505f;
    text-decoration: none;
  }

  .time {
    float: right;
    font-size: 0.8em;
    margin: 0.3em -0.4em -0.4em 1em;
    opacity: 0.5;
  }
</style>
