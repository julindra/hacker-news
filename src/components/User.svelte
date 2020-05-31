<script>
  import axios from "axios";
  import { base } from "../stores.js";

  export let username;

  const data = axios.get(`${$base}/user/${username}`);
</script>

<style>
  .content :global(*) {
    word-break: break-word;
  }

  .content :global(pre) {
    overflow-x: auto;
  }
</style>

<div class="columns is-mobile is-centered is-marginless">
  <div class="column is-half-tablet">
    {#await data}
      <progress class="progress is-small" max="100">50%</progress>
    {:then res}
      {#if res.data.error}
        <p>user {username} not found</p>
      {:else}
        <div style="margin-bottom: 0.5rem;">
          <span class="title is-4">{username}</span>
        </div>
        <p style="margin-bottom: 1rem;">
          joined {res.data.created}, has {res.data.karma} karma
        </p>
        {#if res.data.about}
          <div class="content">
            {@html res.data.about}
          </div>
        {/if}

        <div style="margin-bottom: 1.5rem">
          <a href="https://news.ycombinator.com/submitted?id={username}">
            submissions
          </a>
          |
          <a href="https://news.ycombinator.com/threads?id={username}">
            comments
          </a>
          |
          <a href="https://news.ycombinator.com/favorites?id={username}">
            favorites
          </a>
        </div>
      {/if}
    {:catch err}
      <p>something went wrong: {err.message}</p>
    {/await}
  </div>
</div>
