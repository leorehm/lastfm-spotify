<script>
  import LastFmForm from "./components/LastFmForm.svelte";
  import StreamingLogin from "./components/StreamingLogin.svelte";
  import CreatePlaylist from "./components/CreatePlaylist.svelte";
  import { timeRange, token, tokenExpired, trackdata } from "./stores.js";
</script>

<div id="app">
  <div id="head">
    <h2 style="text-align: center">last.fm to spotify playlist</h2>
  </div>

  <main id="main">
    {#if !$token || $tokenExpired}
      <StreamingLogin />
    {:else if !$trackdata}
      <LastFmForm />
    {:else if $token && $trackdata}
      <CreatePlaylist />
    {/if}
  </main>

  <footer id="footer">
    <a href="https://github.com/leorehm/lastfm-spotify" target="_blank">
      <i class="fa-brands fa-github" /> Source
    </a>
  </footer>
</div>

<style>
  h2 {
    text-align: center;
  }
  a {
    text-align: center;
    color: white;
    text-decoration: none;
    text-decoration-color: white;
  }
  a:hover {
    text-decoration: underline;
  }
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  #footer {
    text-align: center;
    margin: 10px;
    font-size: 0.9em;
  }
  #main {
    flex-grow: 1;
  }
</style>
