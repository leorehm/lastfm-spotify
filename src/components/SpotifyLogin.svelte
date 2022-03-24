<script>
    import { token, tokenExpired, appUrl } from "../stores.js";

    const client_id = "e27568bbeef44f7db83b446e2d6f57ab";

    function generateRandomString(length) {
        let text = "";
        const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    const url = new URL("https://accounts.spotify.com/authorize?");
    const scope = "user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private";
    const state = generateRandomString(16);
    let rememberMe = true;
    $: params = new URLSearchParams({
        response_type: "token",
        show_dialog: !rememberMe, // Will show up on first sign-on regardless
        client_id,
        scope,
        redirect_uri: $appUrl,
        state,
    });
    $: loginLink = url + params;

</script>

{#if !$token}
  <div id="login">
    <a href={loginLink}>
      <button class="login-btn">Connect to Spotify</button>
    </a>
    <br />
    <div id="checkbox-container">
      <label id="checkbox-text" for="remember-me">Remember me?</label>
      <input
        id="checkbox-box"
        name="remember-me"
        type="checkbox"
        bind:checked={rememberMe}
      />
    </div>
  </div>
{/if}

{#if $tokenExpired}
  <section class="expired-token">
    <p>Token expired! Please log out and log back in again.</p>
    <a href={$appUrl}>
      <button>Logout</button>
    </a>
  </section>
{/if}


<style>

#login {
  position: relative;
  left: 25%;
}
.login-btn {
  grid-row: 1;

}
#checkbox-container {
  align-text: center;
}
#checkbox-text {
  
}

#checkbox-box{

}


</style>