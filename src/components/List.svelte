<script>
  import { link } from "svelte-routing";

  export let no, detail;
</script>

<article class="media">
  <div class="media-left has-text-centered" style="min-width: 2.3rem;">
    <h2 class="title is-4">{no}</h2>
  </div>
  <div class="media-content">
    {#if detail.type !== 'ask'}
      <a href={detail.url} target="_blank" class="a-black">
        <p>
          {detail.title}
          <small>({detail.domain})</small>
        </p>
      </a>
    {:else}
      <p>{detail.title}</p>
    {/if}
    {#if detail.type !== 'job'}
      <small>
        {detail.points} points by
        <a href="/user/{detail.user}" use:link>{detail.user}</a>
        {detail.time_ago} |
        <a href="/item/{detail.id}" use:link>
          {detail.comments_count} comments
        </a>
      </small>
    {:else}
      <small>{detail.time_ago}</small>
    {/if}
  </div>
</article>
