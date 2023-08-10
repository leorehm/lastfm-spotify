<script>
  import { timeRange, token, tokenExpired, trackdata } from "../stores.js";

  $: username = "";

  const period = ["overall", "7day", "1month", "3month", "6month", "12month"];
  
  const apiKey = process.env.LASTFM_API_KEY;

  let chosenPeriod = "7day";
  let limit = 20;
  let __trackdata;
  let output = "";
  let nextButtonDisabled = true;

  async function onSubmit() {
    // get data from lastfm
    try {
      __trackdata = await fetchLastFmData();
    } catch (e) {
      output = trackdata.toString();
      return;
    }
    
    // clear output
    output = "";

    for (let i = 0; i < __trackdata.length; i++) {
      let track = __trackdata[i];
      output += `${i+1}: ${track.artist.name} - ${track.name}\r\n`;
    }

    if (output == "") {
      output = "It seems there are no songs available for the selected username and/or time period.";
      nextButtonDisabled = true;
      return;
    }
    nextButtonDisabled = false;
  }

  function onNext() {
    $trackdata = __trackdata;
  }

  async function fetchLastFmData() {
    var res;

    const url = new URL("https://ws.audioscrobbler.com/2.0/?");

    const params = new URLSearchParams({
      "method": "user.gettoptracks",
      "username": username,
      "period": chosenPeriod,
      "limit": limit,
      "api_key": apiKey,
      "format": "json",
    })

    await fetch(url + params)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("No songs found. User may not exist or have songs scrobbled during the selected timeframe.");
      })
      .then((data) => {
        res = data.toptracks.track;
      })
      .catch((error) => {
        console.log(error);
        res = error;
      });
    return res;
  }
</script>

<div class="container">
  <form class="item-form" on:submit|preventDefault={onSubmit}>
    <div>
      <label class="form-label" for="username">last.fm Username</label>
      <input class="form-input" name="username" type="text" bind:value={username} /><br />
    </div>
    <div>
      <label class="form-label" for="limit">Track Limit</label>
      <input class="form-input" name="limit" type="number" bind:value={limit} min="1" max="100" /><br />
    </div>
    <div>
      <label class="form-label" for="period">Time Period</label>
      <select class="form-input" name="period" bind:value={chosenPeriod}>
        {#each period as period}
          <option>{period}</option>
        {/each}
      </select><br />
    </div>
  </form>
  <button class="pure-button-primary" id="submit-button" disbaled={(username = "")} on:click={onSubmit}
    >Get Data <i class="fa-brands fa-lastfm" /></button
  >

  <div class="item-output">
    <label for="output" class="form-label">Songs retrieved from last.fm</label>
    <textarea readonly id="song-output" name="song-output" rows="limit" cols="50" bind:value={output} />
  </div>
  <button class="pure-button-primary" id="next-button" disabled={nextButtonDisabled} on:click={onNext}>Next</button>
</div>

<style>
  .container {
    /* display: grid;
		grid-template-columns: 1fr 1fr, 1fr; */

    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-basis: auto;
    align-items: center;
    align-content: center;
  }
  .form-label {
    margin: 10px 0 10px 0;
    font-weight: bold;
    text-align: center;
  }
  .form-input {
    grid-row: 1;
    height: 2.2em;
    width: 15rem;
  }
  #song-output {
    /* height: 10em;
		width: 95vw; */
    height: 20rem;
    width: 15rem;
  }
  #submit-button {
    /* height: 2em;
		width: 80% */
    margin: 10px 0 10px 0;
    width: 15rem;
  }
  #next-button {
    /* height: 2em;
		width: 20em;
		transform: translate(50%, 50%);
		left: 50%; */
    margin: 10px 0 10px 0;
    width: 15rem;
  }
  .pure-button-primary {
    border-radius: 12px;
  }
</style>
