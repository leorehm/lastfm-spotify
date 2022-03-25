<script>
    import { token, timeRange, tokenExpired, trackdata} from "../stores.js";
    let playlistName = "last.fm top " + $trackdata.length;
    let playlistDesc = "";
    let user_id;
    let playlistInfo;
    let message = "";

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
            // console.log(data);
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
        const ids = []
        for (let i = 0; i<$trackdata.length; i++) {
            ids.push(await getSongId($trackdata[i].name, $trackdata[i].artist.name))
        }
        // console.log("finished getting track ids:", ids);
        
        // add songs to playlist
        message = "Please wait: Adding songs to playlist...";

        const accessToken = $token;
        const url = `https://api.spotify.com/v1/playlists/${playlistInfo.id}/tracks`

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify({
                uris: ids,
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

        message = "Success!";
    }

</script>

<label class="label" for="playlist-name">Playlist Name</label>
<input class="input" name="playlist-name" type=text bind:value={playlistName}><br>

<label class="label" for="playlist-desc">Description</label>
<input class="input" name="playlist-desc" type=text bind:value={playlistDesc}><br>

<button on:click|once={createPlaylist}>Create Playlist</button> 

<p>{message}</p>

<style>

</style>