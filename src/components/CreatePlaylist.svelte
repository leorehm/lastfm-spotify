<script>
    import { token, timeRange, tokenExpired } from "../stores.js";
    let playlistName = "last.fm top 50";
    let playlistDesc = "New playlist description";
    let user_id;


    async function getUser() {
        const accessToken = $token;

        const res = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        if(res.ok) {
            const json = await res.json();
		    result = JSON.stringify(json);
            return result;
        } else {
            tokenExpired.set(true);     
        }
    }

    async function createPlaylist() {
        console.log(getUser())
        const accessToken = $token;

        const res = await fetch('https://api.spotify.com/v1/users/leo26299/playlists', {
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
            const json = await res.json();
		    result = JSON.stringify(json);
        } else {
            tokenExpired.set(true);     
        }
        
        console.log(result);
    }

</script>

<label class="label" for="playlist-name">Name der Playlist</label>
<input class="input" name="playlist-name" type=text bind:value={playlistName}><br>

<button on:click|once={createPlaylist}>Playlist erstellen</button> 


<style>

</style>