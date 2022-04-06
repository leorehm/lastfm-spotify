<script>
    import { token, timeRange, tokenExpired, trackdata} from "../stores.js";
    let playlistName = "last.fm top " + $trackdata.length;
    let playlistDesc = "";
    let playlistScope = true; // true: public, false: private
    let playlistLink = "";
    let user_id;
    let playlistInfo;
    let message = "";
    let failedTracksIndices = [];
    let failedOutput = "";
    const spotInsertRest = 100; // spotify restriction of only 100 songs per insertion

    async function getUser() {
        message = "Please wait: getting user data...";
        const accessToken = $token;

        const res = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then(response => response.json())
			.then(data => {
                user_id = data.id;
		});
    }

    async function createPlaylist() {
        // https://developer.spotify.com/documentation/web-api/reference/#/operations/create-playlist
        await getUser();
        message = "Please wait: Playlist is being created...";
        console.log("creating playlist for user ", user_id);
        const accessToken = $token;

        const res = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + accessToken, 
            },
            body: JSON.stringify({
                "name": playlistName,
                "public": playlistScope,
                "description": playlistDesc,
                "public": false
            })
        })

        if(res.ok) {
            playlistInfo = await res.json();
        } else {
            tokenExpired.set(true);     
        }
        
        addToPlaylist();
    }

    async function getSongId(track, artist) {
        // https://developer.spotify.com/documentation/web-api/reference/#/operations/search
        // query could be optimized for higher accuracy
        
        // console.log("searching for: ", track, " - ", artist);

        const url = `https://api.spotify.com/v1/search?q=track:${track}%20artist:${artist}&type=track&limit=5`;
        const accessToken = $token;
        let id;
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Track '" + track + "' not found - skipping");
        })
        .then(data => {
            if (data.tracks.items.length == 0) {
                console.log(data);
                throw new Error("Track '" + track + "' not found - skipping");
            }
            else {
                console.log("track_id found: ", data.tracks.items[0].uri);
                id = data.tracks.items[0].uri;
            }
		})
        .catch(error => {
            console.log(error);
            id = null;
        });
        return id;
    }

    async function addToPlaylist() {
        // https://developer.spotify.com/documentation/web-api/reference/#/operations/add-tracks-to-playlist
        message = "Please wait: Getting songs...";

        // get all song ids
        // group ids in arrays with length of spotInsertRest to comply with spotify api

        const indexesNeeded = Math.floor($trackdata.length/spotInsertRest) //counting from 0
        const ids = new Array(Math.floor(indexesNeeded));
        for (let i = 0; i <= indexesNeeded; i++) {
            ids[i] = [];
        }

        for (let i = 0; i < $trackdata.length; i++) {
            let j = Math.floor(i/spotInsertRest);
            let songId = await getSongId($trackdata[i].name, $trackdata[i].artist.name);
            // prevents adding a song with an empty id, which would cause the whole api-call to fail
            if (songId != null) {
                ids[j].push(songId);
            }
            else {
                failedTracksIndices.push(i);
            }
        }
        // console.log("finished getting track ids:", ids);
        
        // add songs to playlist
        message = "Please wait: Adding songs to playlist...";

        const accessToken = $token;
        const url = `https://api.spotify.com/v1/playlists/${playlistInfo.id}/tracks`

        for (let i = 0; i < ids.length; i++) {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
                body: JSON.stringify({
                    uris: ids[i],
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Adding to playlist not successful");
            })
            .then(data => {
                console.log('add to playlist RESPONSE: ', data);
            })
            .catch(error => {
                console.log(error);
                message = "Oh no, something went wrong!";
            });
        }

        playlistLink = playlistInfo.external_urls.spotify;
        if (failedTracksIndices.length == 0) {
            message = "Success!";
        }
        else {
            let plural = "";
            if (failedTracksIndices.length > 1) {plural = "s"};
            if (failedOutput != "") {failedOutput = ""};

            for(let i = 0; i < failedTracksIndices.length; i++) {
			    failedOutput += failedTracksIndices[i]+1 + ": ";
			    failedOutput += $trackdata[failedTracksIndices[i]].artist.name + " - ";
			    failedOutput += $trackdata[failedTracksIndices[i]].name + "\r\n";
            }

            message = "Failed to add " + failedTracksIndices.length + " track" + plural + " :(";
        }
    }

</script>
    <div class="container">

    <label class="label" for="playlist-name">Playlist Name</label>
    <input class="input" name="playlist-name" type=text bind:value={playlistName}><br>

    <label class="label" for="playlist-desc">Description</label>
    <input class="input" name="playlist-desc" type=text bind:value={playlistDesc}><br>
    
    <label for="playlist-scope" class="label">Visibility</label>
    <div name="playlist-scope" class="pure-button-group" role="group">
        <button id="public-button" class="toggle-button" class:active={playlistScope} on:click="{() => playlistScope = !playlistScope}">Public</button>
        <button id="private-button" class="toggle-button" class:active={!playlistScope} on:click="{() => playlistScope = !playlistScope}">Private</button>
    </div>

    <button class="pure-button-primary" on:click|once={createPlaylist}>Create Playlist <i class="fa-brands fa-spotify"></i></button>

    <p style="margin: 10px 0 10px 0;">{message}</p>

    {#if playlistLink != ""}
        <div class="playlist-link">
            <label for="playlist-link" class="label">Playlist Link</label>
            <input name="playlist-link" type="text" class="input" bind:value={playlistLink}><br>
            <a href={playlistLink}><button class="pure-button-primary" href={playlistLink}>Open Playlist <i class="fa-brands fa-spotify"></i></button></a>
        </div>

        {#if failedOutput != ""}
            <div class="item-output">
                <label for="failedOutput" class=form-label>Missing tracks</label>
                <textarea readonly id="song-output" name="song-output" rows=limit cols=50 bind:value={failedOutput}></textarea>
            </div>
        {/if}
    {/if}
</div>
<style>
    .container {
        display: flex;
		flex-direction: column;
		justify-content: center;
		flex-basis: auto;
		align-items: center;
		align-content: center;
    }
    .label {
        margin: 10px 0 10px 0;
		font-weight: bold;
		text-align: center;
    }
    .input {
        grid-row: 1;
		height: 2.2em;
		width: 15rem;
    }
    .pure-button-primary {
		border-radius: 12px;
        margin: 10px 0 10px 0;
		width: 15rem;
	}
    .pure-button-group {
        margin: 0 0 10px 0;
        justify-content: stretch;
        border-radius: 12px;
        width: 15rem;
    }

    .toggle-button {
        font-size: 90%;
        background-color: #005db3;
        color: #333;
        width: 50%;
    }
    .active {
        font-size: 100%;
        color: white;
        background-color: #0078e7;
    }

    .form-label {
		margin: 10px 0 10px 0;
		font-weight: normal;
		text-align: center;
	}
    #public-button {
        border-radius: 12px 0 0 12px;
    }

    #private-button {
        border-radius: 0 12px 12px 0;
    }

    #song-output {
		/* height: 10em;
		width: 95vw; */
		height: 6rem;
		width: 15rem;
	}
</style>