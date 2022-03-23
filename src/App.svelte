<script>
	let trackdata = null
	import LfmForm from "./components/LfmForm.svelte";
	import SpotifyLogin from "./components/SpotifyLogin.svelte";
</script>


{#if trackdata}
	<LfmForm bind:trackdata={trackdata}></LfmForm>
{:else}
	<SpotifyLogin></SpotifyLogin>s
{/if}


