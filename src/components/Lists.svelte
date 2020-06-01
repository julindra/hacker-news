<script>
  import { onMount, onDestroy } from "svelte";
  import { target, current, data } from "../stores.js";
  import { link } from "svelte-routing";
  import List from "./List.svelte";

  export let type = "news",
    page = 1;

  let error = false;

  $: {
    if (isNaN(page) || page < 1) {
      error = true;
    } else {
      error = false;
    }

    $target = { type, page: +page };
    $current = type;
    window.scrollTo(0, 0);
  }

  onMount(() => {});

  onDestroy(() => {});
</script>

<style>
  div.is-flex {
    justify-content: center;
  }

  div.is-flex a {
    margin: 1rem 1rem 2rem 1rem;
  }
</style>

<div class="columns is-mobile is-centered is-marginless">
  <div class="column is-half-tablet">
    {#if !error}
      {#await $data}
        <progress class="progress is-small" max="100">50%</progress>
      {:then res}
        {#if res.data.length <= 0}
          <p>no more data to display</p>
        {:else}
          {#each res.data as d, i}
            <List no={(page - 1) * 30 + i + 1} detail={d} />
          {/each}
        {/if}
      {:catch err}
        <p>something went wrong: {err.message}</p>
      {/await}
    {:else}
      <p>invalid url</p>
    {/if}
  </div>
</div>

{#if !error}
  <div class="is-flex">
    <a
      href="{type !== 'news' ? '/' + type : ''}/{+page - 1}"
      class:is-hidden={page <= 1}
      use:link>
      prev
    </a>
    <a href="{type !== 'news' ? '/' + type : ''}/{+page + 1}" use:link>next</a>
  </div>
{/if}
