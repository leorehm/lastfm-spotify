<script>

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
    const scope = "user-read-private user-read-email user-top-read";
    const state = generateRandomString(16);
    let rememberMe = true;
    $: params = new URLSearchParams({
    response_type: "token",
    show_dialog: !rememberMe, // Will show up on first sign-on regardless
    client_id,
    scope,
    redirect_uri: "http://localhost:8080/",
    //state,
    });
    $: loginLink = url + params;

</script>

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

