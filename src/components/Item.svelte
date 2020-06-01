<script>
  import { link } from "svelte-routing";
  import axios from "axios";
  import { base } from "../stores.js";
  import Comment from "./Comment.svelte";

  export let id;

  const data = axios.get(`${$base}/item/${id}`);
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
  <div class="column is-half-tablet is-full-mobile">
    {#await data}
      <progress class="progress is-small" max="100">50%</progress>
    {:then res}
      <div style="margin-bottom: 0.5rem;">
        {#if res.data.title.startsWith('Ask HN: ')}
          <span class="title is-4">{res.data.title}</span>
        {:else}
          <a href={res.data.url} target="_blank" class="a-black">
            <span class="title is-4">{res.data.title}</span>
            ({res.data.domain})
          </a>
        {/if}
      </div>
      <small>
        {res.data.points} points by
        <a href="/user/{res.data.user}" use:link>{res.data.user}</a>
        {res.data.time_ago}
      </small>

      {#if res.data.content}
        <div class="content" style="margin-top: 1rem;">
          {@html res.data.content}
        </div>
      {/if}

      <hr />

      {#if res.data.comments.length <= 0}0 comments{/if}

      {#each res.data.comments as comment}
        <Comment {comment} />
      {/each}
    {:catch err}
      <p>something went wrong: {err.message}</p>
    {/await}
  </div>
</div>
