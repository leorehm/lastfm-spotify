<script>
	let username = "leo26299";
	const period = ["overall", "7day", "1month", "3month", "6month", "12month"];
	let chosenPeriod = "7day";
	let limit = 50;
	const apiKey = "57411198178c595fbb09fabbe83934ac";
	export let trackdata;

	function onSubmit() {
		trackdata = fetchLfmData();
	}

	async function fetchLfmData() {
		const url = "http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" + username + "&period=" + chosenPeriod + "&limit" + limit + "&api_key=" + apiKey + "&format=json";
		const response = await self.fetch(url);
		if(response.ok) {
			return response.json();
		} else {
			throw new Error (tracks);
		}
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<label>last.fm username
		<input type=text bind:value={username}>
	</label> 
	<label>track limit
		<input type=number bind:value={limit} min=1 max=100>
	</label>
	<label>time period
		<select bind:value={chosenPeriod}>
			{#each period as period}
				<option>{period}</option>
			{/each}
		</select>
	</label>
	<button on:click={onSubmit}>Submit</button>
</form>


<style>
    
</style>