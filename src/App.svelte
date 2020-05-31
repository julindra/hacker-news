<script>
  import { Router, link, Route } from "svelte-routing";
  import { types, current } from "./stores.js";
  import Lists from "./components/Lists.svelte";
  import Item from "./components/Item.svelte";
  import User from "./components/User.svelte";

  if (localStorage.getItem("dark") === "true") {
    document.getElementsByTagName("html")[0].setAttribute("class", "dark");
  }

  const switchTheme = () => {
    if (localStorage.getItem("dark") === "true") {
      localStorage.setItem("dark", "false");
      document.getElementsByTagName("html")[0].removeAttribute("class");
    } else {
      localStorage.setItem("dark", "true");
      document.getElementsByTagName("html")[0].setAttribute("class", "dark");
    }
  };
</script>

<style>
  div.is-flex {
    background: #ff6600;
    padding: 0.5rem 0rem;
    justify-content: center;
    align-items: center;
  }

  .theme {
    position: absolute;
    right: 1rem;
    width: 1rem;
    height: 1rem;
    background: #222;
  }

  .tabs {
    margin-bottom: 0.25rem;
  }

  .tabs li.is-active a,
  .tabs li a:hover {
    border-bottom-color: #ff6600;
    color: #ff6600;
    text-decoration: none;
  }
</style>

<div>
  <Router>
    <div class="is-flex">
      <a href="/" style="font-size: 0;" use:link>
        <img src="/hn.png" alt="Hacker News" style="height: 2.5rem;" />
      </a>
      <span
        class="theme pointer"
        title="theme switcher"
        on:click={switchTheme} />
    </div>
    <div class="tabs is-medium is-centered is-fullwidth-mobile">
      <ul>
        <li class:is-active={$current === 'news'}>
          <a href="/" use:link>top</a>
        </li>
        {#each $types as type}
          <li class:is-active={$current === type}>
            <a href="/{type}" use:link>{type}</a>
          </li>
        {/each}
      </ul>
    </div>
    <Route exact path="/" component={Lists} />
    <Route path="/:page" component={Lists} />
    {#each $types as type}
      <Route path="/{type}">
        <Lists {type} />
      </Route>
      <Route path="/{type}/:page" let:params>
        <Lists {type} page={params.page} />
      </Route>
    {/each}
    <Route path="/item/:id" component={Item} />
    <Route path="/user/:username" component={User} />
  </Router>
</div>
