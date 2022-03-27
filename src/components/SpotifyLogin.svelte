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
    const scope = "user-read-private playlist-modify-public playlist-modify-private";
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
      <button class="pure-button pure-button-primary" id="login-btn">Connect to Spotify</button>
    </a>
    <br />
    <div id="checkbox-container">
      <label id="checkbox-label" for="remember-me">Remember me?</label>
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
  margin: auto;
  width: 50%;
  padding: 10px;
  /* align-items: center;
  display: flex;
  justify-content: center; */
}
#login-btn {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 3rem;
  padding-left: 10px;
  padding-right: 10px;

  font-weight: bold;
  font-size: 125%;
}

.pure-button-primary {
  border-radius: 12px;
}
#checkbox-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
#checkbox-label {
  display: inline-block;
  text-align: center;
  margin: auto;
  font-weight: bold;
}

#checkbox-box{
  display: inline-block;
  margin: auto;
}


</style>