<script>
    import Chat from "../../lib/components/chat/chat.svelte";

  export {Chat} from "$lib/components";

  let input = $state([
    {
      role: 'user',
      parts: [{text: 'Привет!'}]
    },
    {
      role: 'model',
      parts: [{text: 'Привет!'}]
    }
  ]);

  let items = $state([]);

  $effect(() => {
    items = input.map(inp => ({
      text: inp.parts[0].text,
      me: inp.role === 'user',
      name: inp.role
    }))
  });

</script>

<Chat {items}>
  hello

</Chat>

<style>
  
</style>

