<script>
 import {Chat} from "$lib/components";

  let input = $state([
    {
      role: 'user',
      parts: [{text: 'Привет!'}]
    },
    {
      role: 'model',
      parts: [{text: 'Привет! К\n акsdfsffgdfgdf  \n fggrd дела? Может сегоднf eccewcw fdsfd gfvd msdj dkdsjdshdg sdsv'}]
    },{
      role: 'user',
      parts: [{text: 'Привет!'}]
    },
  ]);

  

  let items = $state([]);
  $effect(() => {
    items = input.map(inp => ({
      text: inp.parts[0].text,
      me: inp.role === 'user',
      user:{name: inp.role, link: '/'},
      timestamp: Date.now(),
    }))
  });

</script>

<Chat {items} style="gap: 1em; padding: 1em 1.5em">
  {#snippet item({me, text, user, timestamp})}
  <div class="message" class:me>
    <!-- <a href={user.link} class="username">{user.name}</a> -->
    <div class="inner">{text}</div>
  </div>
    <div class="time">{new Date(timestamp).toLocaleTimeString('ru').slice(0, -3)}</div>
  {/snippet}
</Chat>

<style>
.message {
  --br: 1.25em;
  --bg: #eee;
  position: relative;
  font-size: 13px;
  background: var(--bg);
  padding: .5em .8em;
  white-space: pre-wrap;
  line-height: 1.5;
  border-radius: var(--br);
  border-bottom-left-radius: 0;
}

.me {
  --bg: #d5ddf1;
  background: var(--bg);
  border-bottom-left-radius: var(--br);
  border-bottom-right-radius: 0;
}

.message::before {
  content: '';
  position: absolute;
  left: 0;
  top: 100%;
  width: 0;
  height: 0;
  border: .2em solid;
  border-color: var(--bg) transparent transparent var(--bg)  ;
}

.me::before {
  left: auto;
  right: 0;
  border-color: var(--bg) var(--bg) transparent transparent;
}

.username {
  font-weight: 700;
  text-decoration: none;
  color: #333;
}

.time {
  float: left;
  opacity: .5;
  font-size: 10px;
  margin-left: .5em;
}

.me + .time {
  float: right;
  margin-right: .5em;
}

  
</style>

