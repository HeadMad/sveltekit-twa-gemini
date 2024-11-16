<script>
  import { Loader, Chat } from "$lib/components";
  import { expandTextareaHeight } from "$lib/actions";

  let { data } = $props();
  const messages = $state([
    {
      role: "user",
      parts: [{ text: "Привет!" }],
    },
    {
      role: "model",
      parts: [{ text: "Привет!" }],
    },
  ]);

  let value = $state("");
  let isSubmitted = $state(false);

  function onCtrlEnter(event) {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      document.querySelector("button").click();
    }
  }

  let items = $derived(
    messages.map((msg) => ({
      text: msg.parts.map(({text}) => text).join(""),
      me: msg.role === "user",
      user: { name: msg.role, link: "/" },
      timestamp: Date.now(),
    })),
  );
</script>

<!-- <div class="console">
  <h1>Data</h1>
  {JSON.stringify({
    "candidates": [
      {
        "content": {
          "parts": [
            {
              "text": "Привет, Павел! 👋  Рада познакомиться. 😊  Чем могу тебе помочь? 😊\n"
            }
          ],
          "role": "model"
        },
        "finishReason": "STOP",
        "index": 0,
        "safetyRatings": [
          {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "probability": "NEGLIGIBLE"
          },
          {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "probability": "NEGLIGIBLE"
          },
          {
            "category": "HARM_CATEGORY_HARASSMENT",
            "probability": "NEGLIGIBLE"
          },
          {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "probability": "NEGLIGIBLE"
          }
        ]
      }
    ],
    "usageMetadata": {
      "promptTokenCount": 5,
      "candidatesTokenCount": 19,
      "totalTokenCount": 24
    },
    "modelVersion": "gemini-1.5-flash-001"
  }, null, 2)}
</div> -->
<main>
  <header>Gemini model</header>
  <pre>{JSON.stringify(data, null, 2)}</pre>
  <Chat {items}></Chat>

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
  .console {
    position: absolute;
    box-sizing: border-box;
    z-index: 100;
    top: 5vw;
    left: 5vw;
    width: 90vw;
    padding: 1em;
    height: 90vh;
    overflow: auto;
    font-size: 0.8em;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    white-space: pre-wrap;
    font-family: monospace;
  }
  main {
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    padding: 0.5em 1em;
    border-bottom: 1px solid #ccc;
  }

  .messages {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    padding: 1rem;
    /* background-color: #eee; */
    gap: 1rem;
  }

  .user,
  .model {
    font-size: 0.9rem;
    line-height: 1.6em;
    padding: 0.4em 0.7em;
    border-radius: 0.5em;
  }

  .user {
    align-self: self-end;
    margin-left: 20%;
    border-bottom-right-radius: 0;
    background-color: #d1dffc;
  }

  .model {
    align-self: self-start;
    margin-right: 20%;
    border-bottom-left-radius: 0;
    background-color: #e2e2e2;
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
    transition: 0.3s;

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
