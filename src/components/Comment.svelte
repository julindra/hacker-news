<script>
  import { link } from "svelte-routing";

  export let comment;

  let hide = false;
</script>

<style>
  .content :global(*) {
    word-break: break-word;
  }

  .content :global(pre) {
    overflow-x: auto;
  }
</style>

<div style="margin-top: 1rem;">
  <small>
    <a href="/user/{comment.user}" use:link>{comment.user}</a>
    {comment.time_ago}
    <span class="pointer" on:click={() => (hide = !hide)}>[-]</span>
  </small>
  <div class:is-hidden={hide}>
    <div class="content">
      {@html comment.content}
    </div>

    <div style="padding-left: 2rem;">
      {#each comment.comments as comment}
        <svelte:self {comment} />
      {/each}
    </div>
  </div>
</div>
