<script>
	let trackdata = null
	import LfmForm from "./components/LfmForm.svelte";
	import SpotifyLogin from "./components/SpotifyLogin.svelte";
	import CreatePlaylist from "./components/CreatePlaylist.svelte"
	import { timeRange, token, tokenExpired } from "./stores.js";
</script>


{#if !trackdata}
	<LfmForm bind:trackdata={trackdata}></LfmForm>
{:else if token && !tokenExpired}
	<SpotifyLogin></SpotifyLogin>
{:else}
	<CreatePlaylist></CreatePlaylist>
{/if}



