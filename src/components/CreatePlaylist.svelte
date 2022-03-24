<script>
import { onMount } from "svelte";

    import { token, timeRange, tokenExpired, trackdata} from "../stores.js";
    let playlistName = "last.fm top 50";
    let playlistDesc = "New playlist description";
    let user_id;
    let playlistInfo;

    onMount(() =>  {
        console.log('token: ', $token);
        console.log('time range: ', $timeRange);
        console.log('token expired: ', $tokenExpired);
        console.log('track data: ', $trackdata);
    });

    async function getUser() {
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
        await getUser();
        console.log("creating playlist for user ", user_id);
        const accessToken = $token;

        let result;
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

        // if(res.ok) {
            playlistInfo = await res.json();

        // } else {
        //     tokenExpired.set(true);     
        // }
        
        console.log(playlistInfo);
    }

    async function getSongIds() {
        const res = await fetch(``, {
            
        })
    }

    async function addToPlaylist() {
        const res = await fetch(``, {

        })
    }

</script>

<label class="label" for="playlist-name">Name der Playlist</label>
<input class="input" name="playlist-name" type=text bind:value={playlistName}><br>

<button on:click|once={createPlaylist}>Playlist erstellen</button> 


<style>

</style>