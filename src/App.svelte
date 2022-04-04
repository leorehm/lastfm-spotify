<script>
	import LfmForm from "./components/LfmForm.svelte";
	import SpotifyLogin from "./components/SpotifyLogin.svelte";
	import CreatePlaylist from "./components/CreatePlaylist.svelte"
	import { timeRange, token, tokenExpired, trackdata } from "./stores.js";
</script>

<h2 style="text-align: center">last.fm to spotify playlist</h2>

{#if !$token || $tokenExpired}
	<SpotifyLogin></SpotifyLogin>
{:else if !$trackdata}
	<LfmForm></LfmForm>
{:else if $token && $trackdata }
	<CreatePlaylist></CreatePlaylist>
{/if}




