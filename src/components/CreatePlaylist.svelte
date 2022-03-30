<script>
    import { token, timeRange, tokenExpired, trackdata} from "../stores.js";
    let playlistName = "last.fm top " + $trackdata.length;
    let playlistDesc = "";
    let playlistScope = true; // true: public, false: private
    let playlistLink = "";
    let user_id;
    let playlistInfo;
    let message = "";
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
                return response.json()
            }
            throw new Error("Track not found - skipping")
        })
        .then(data => {
            console.log("track_id found: ", data.tracks.items[0].uri);
            id = data.tracks.items[0].uri;
		})
        .catch(error => {
            console.log(error);
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
            ids[j].push(await getSongId($trackdata[i].name, $trackdata[i].artist.name));
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
        message = "Success!";
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
    #public-button {
        border-radius: 12px 0 0 12px;
    }

    #private-button {
        border-radius: 0 12px 12px 0;
    }
</style>