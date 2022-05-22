<script>
  import { timeRange, token, tokenExpired, trackdata } from "../stores.js";
  $: username = "";
  const period = ["overall", "7day", "1month", "3month", "6month", "12month"];
  let chosenPeriod = "7day";
  let limit = 20;
  const apiKey = "57411198178c595fbb09fabbe83934ac";
  let __trackdata;
  let output = "";
  let nextButtonDisabled = true;

  async function onSubmit() {
    console.log("username: ", username);
    try {
      __trackdata = await fetchLfmData();
    } catch (e) {
      output = trackdata.toString();
      return;
    }

    if (output != "") output = "";

    for (let i = 0; i < __trackdata.length; i++) {
      output += i + 1 + ": ";
      output += __trackdata[i].artist.name + " - ";
      output += __trackdata[i].name + "\r\n";
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

  // TODO: input username, period, limit and api key as parameter with URLSeachParams()
  async function fetchLfmData() {
    let res;
    console.log("fetching last.fm data...");
    const url =
      "https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" +
      username +
      "&period=" +
      chosenPeriod +
      "&limit=" +
      limit +
      "&api_key=" +
      apiKey +
      "&format=json";
    await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("No songs found. User may not exist or have songs scrobbled during the selected timeframe.");
      })
      .then((data) => {
        res = data.toptracks.track;
        console.log("...done!");
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
