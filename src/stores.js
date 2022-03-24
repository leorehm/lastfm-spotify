import { readable, writable } from 'svelte/store';

export const token = readable(null, function start(set) {
  const hashParams = {};
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  let e;
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  const access_token = hashParams.access_token;
  set(access_token);

  window.history.pushState("object or string", "Title", "/");

})

export const appUrl = readable(null, function start(set) {
  set("https://leorehm.github.io/lastfm-spotify");
  // set("http://localhost:8080/");
})

export const timeRange = writable('medium_term');

export const tokenExpired = writable(false);

export const trackdata = writable(null);