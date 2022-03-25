var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function l(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function a(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function d(){return f(" ")}function p(){return f("")}function m(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t){return""===t?null:+t}function g(t,e){t.value=null==e?"":e}function y(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}t.selectedIndex=-1}let $;function v(t){$=t}function x(t){(function(){if(!$)throw new Error("Function called outside component initialization");return $})().$$.on_mount.push(t)}const k=[],w=[],_=[],z=[],C=Promise.resolve();let j=!1;function E(t){_.push(t)}const P=new Set;let S=0;function A(){const t=$;do{for(;S<k.length;){const t=k[S];S++,v(t),N(t.$$)}for(v(null),k.length=0,S=0;w.length;)w.pop()();for(let t=0;t<_.length;t+=1){const e=_[t];P.has(e)||(P.add(e),e())}_.length=0}while(k.length);for(;z.length;)z.pop()();j=!1,P.clear(),v(t)}function N(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}const O=new Set;let T;function B(t,e){t&&t.i&&(O.delete(t),t.i(e))}function L(t,e,n,o){if(t&&t.o){if(O.has(t))return;O.add(t),T.c.push((()=>{O.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function R(t){t&&t.c()}function G(t,n,s,i){const{fragment:l,on_mount:c,on_destroy:a,after_update:u}=t.$$;l&&l.m(n,s),i||E((()=>{const n=c.map(e).filter(r);a?a.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(E)}function q(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function D(t,e){-1===t.$$.dirty[0]&&(k.push(t),j||(j=!0,C.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function M(e,r,s,i,l,c,u,f=[-1]){const d=$;v(e);const p=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(d?d.$$.context:[])),callbacks:n(),dirty:f,skip_bound:!1,root:r.target||d.$$.root};u&&u(p.root);let m=!1;if(p.ctx=s?s(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return p.ctx&&l(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),m&&D(e,t)),n})):[],p.update(),m=!0,o(p.before_update),p.fragment=!!i&&i(p.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);p.fragment&&p.fragment.l(t),t.forEach(a)}else p.fragment&&p.fragment.c();r.intro&&B(e.$$.fragment),G(e,r.target,r.anchor,r.customElement),A()}v(d)}class U{$destroy(){q(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const I=[];function J(t,e){return{subscribe:F(t,e).subscribe}}function F(e,n=t){let o;const r=new Set;function i(t){if(s(e,t)&&(e=t,o)){const t=!I.length;for(const t of r)t[1](),I.push(t,e);if(t){for(let t=0;t<I.length;t+=2)I[t][0](I[t+1]);I.length=0}}}return{set:i,update:function(t){i(t(e))},subscribe:function(s,l=t){const c=[s,l];return r.add(c),1===r.size&&(o=n(i)||t),s(e),()=>{r.delete(c),0===r.size&&(o(),o=null)}}}}const H=J(null,(function(t){const e={},n=/([^&;=]+)=?([^&;]*)/g,o=window.location.hash.substring(1);let r;for(;r=n.exec(o);)e[r[1]]=decodeURIComponent(r[2]);t(e.access_token),window.history.pushState("object or string","Title","/")})),K=J(null,(function(t){t("https://leorehm.github.io/lastfm-spotify")})),Q=F(!1),V=F(null);function W(t,e,n){const o=t.slice();return o[6]=e[n],o}function X(e){let n,o,r,s=e[6]+"";return{c(){n=u("option"),o=f(s),n.__value=r=e[6],n.value=n.__value},m(t,e){c(t,n,e),l(n,o)},p:t,d(t){t&&a(n)}}}function Y(e){let n,r,s,i,p,$,v,x,k,w,_,z,C,j,P,S,A,N,O,T,B,L,R,G,q,D,M,U,I,J,F,H,K=e[6],Q=[];for(let t=0;t<K.length;t+=1)Q[t]=X(W(e,K,t));return{c(){n=u("div"),r=u("form"),s=u("div"),i=u("label"),i.textContent="last.fm username",p=d(),$=u("input"),v=u("br"),x=d(),k=u("div"),w=u("label"),w.textContent="track limit",_=d(),z=u("input"),C=u("br"),j=d(),P=u("div"),S=u("label"),S.textContent="time period",A=d(),N=u("select");for(let t=0;t<Q.length;t+=1)Q[t].c();O=u("br"),T=d(),B=u("button"),L=f("Get Data"),G=d(),q=u("div"),D=u("textarea"),M=d(),U=u("button"),I=f("Next"),h(i,"class","form-label svelte-et0bzl"),h(i,"for","username"),h($,"class","form-input svelte-et0bzl"),h($,"name","username"),h($,"type","text"),h(w,"class","form-label svelte-et0bzl"),h(w,"for","limit"),h(z,"class","form-input svelte-et0bzl"),h(z,"name","limit"),h(z,"type","number"),h(z,"min","1"),h(z,"max","100"),h(S,"class","form-label svelte-et0bzl"),h(S,"for","period"),h(N,"class","form-input svelte-et0bzl"),h(N,"name","period"),void 0===e[1]&&E((()=>e[9].call(N))),h(B,"id","submit-button"),h(B,"disbaled",R=e[0]=""),h(B,"class","svelte-et0bzl"),h(r,"class","item-form svelte-et0bzl"),D.readOnly=!0,h(D,"id","song-output"),h(D,"rows","limit"),h(D,"cols","50"),h(D,"class","svelte-et0bzl"),h(q,"class","item-output svelte-et0bzl"),h(n,"class","container svelte-et0bzl"),h(U,"id","next-button"),U.disabled=J=""==e[3],h(U,"class","svelte-et0bzl")},m(t,o){c(t,n,o),l(n,r),l(r,s),l(s,i),l(s,p),l(s,$),g($,e[0]),l(s,v),l(r,x),l(r,k),l(k,w),l(k,_),l(k,z),g(z,e[2]),l(k,C),l(r,j),l(r,P),l(P,S),l(P,A),l(P,N);for(let t=0;t<Q.length;t+=1)Q[t].m(N,null);var a;y(N,e[1]),l(P,O),l(r,T),l(r,B),l(B,L),l(n,G),l(n,q),l(q,D),g(D,e[3]),c(t,M,o),c(t,U,o),l(U,I),F||(H=[m($,"input",e[7]),m(z,"input",e[8]),m(N,"change",e[9]),m(B,"click",e[4],{once:!0}),m(r,"submit",(a=e[4],function(t){return t.preventDefault(),a.call(this,t)})),m(D,"input",e[10]),m(U,"click",e[5],{once:!0})],F=!0)},p(t,[e]){if(1&e&&$.value!==t[0]&&g($,t[0]),4&e&&b(z.value)!==t[2]&&g(z,t[2]),64&e){let n;for(K=t[6],n=0;n<K.length;n+=1){const o=W(t,K,n);Q[n]?Q[n].p(o,e):(Q[n]=X(o),Q[n].c(),Q[n].m(N,null))}for(;n<Q.length;n+=1)Q[n].d(1);Q.length=K.length}66&e&&y(N,t[1]),1&e&&R!==(R=t[0]="")&&h(B,"disbaled",R),8&e&&g(D,t[3]),8&e&&J!==(J=""==t[3])&&(U.disabled=J)},i:t,o:t,d(t){t&&a(n),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(Q,t),t&&a(M),t&&a(U),F=!1,o(H)}}}const Z="57411198178c595fbb09fabbe83934ac";function tt(t,e,n){let o;i(t,V,(t=>n(12,o=t)));let r="";const s=["overall","7day","1month","3month","6month","12month"];let l,c="7day",a=20,u="";return[r,c,a,u,async function(){await async function(){console.log("fetching last.fm data...");const t="https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user="+r+"&period="+c+"&limit="+a+"&api_key="+Z+"&format=json";await fetch(t).then((t=>t.json())).then((t=>{l=t.toptracks.track,console.log("...done!")}))}(),""!=u&&n(3,u="");for(let t=0;t<l.length;t++)n(3,u+=t+1+": "),n(3,u+=l[t].artist.name+" - "),n(3,u+=l[t].name+"\r\n")},function(){var t;o=l,t=o,V.set(t)},s,function(){r=this.value,n(0,r)},function(){a=b(this.value),n(2,a)},function(){c=function(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}(this),n(1,c),n(6,s)},function(){u=this.value,n(3,u)}]}class et extends U{constructor(t){super(),M(this,t,tt,Y,s,{})}}function nt(t){let e,n,o,r,s,i,f,p,b,g,y,$;return{c(){e=u("div"),n=u("a"),o=u("button"),o.textContent="Connect to Spotify",r=d(),s=u("br"),i=d(),f=u("div"),p=u("label"),p.textContent="Remember me?",b=d(),g=u("input"),h(o,"class","login-btn svelte-181gumj"),h(n,"href",t[2]),h(p,"id","checkbox-text"),h(p,"for","remember-me"),h(p,"class","svelte-181gumj"),h(g,"id","checkbox-box"),h(g,"name","remember-me"),h(g,"type","checkbox"),h(g,"class","svelte-181gumj"),h(f,"id","checkbox-container"),h(f,"class","svelte-181gumj"),h(e,"id","login"),h(e,"class","svelte-181gumj")},m(a,u){c(a,e,u),l(e,n),l(n,o),l(e,r),l(e,s),l(e,i),l(e,f),l(f,p),l(f,b),l(f,g),g.checked=t[0],y||($=m(g,"change",t[6]),y=!0)},p(t,e){4&e&&h(n,"href",t[2]),1&e&&(g.checked=t[0])},d(t){t&&a(e),y=!1,$()}}}function ot(t){let e,n,o,r,s;return{c(){e=u("section"),n=u("p"),n.textContent="Token expired! Please log out and log back in again.",o=d(),r=u("a"),s=u("button"),s.textContent="Logout",h(r,"href",t[1]),h(e,"class","expired-token")},m(t,i){c(t,e,i),l(e,n),l(e,o),l(e,r),l(r,s)},p(t,e){2&e&&h(r,"href",t[1])},d(t){t&&a(e)}}}function rt(e){let n,o,r=!e[3]&&nt(e),s=e[4]&&ot(e);return{c(){r&&r.c(),n=d(),s&&s.c(),o=p()},m(t,e){r&&r.m(t,e),c(t,n,e),s&&s.m(t,e),c(t,o,e)},p(t,[e]){t[3]?r&&(r.d(1),r=null):r?r.p(t,e):(r=nt(t),r.c(),r.m(n.parentNode,n)),t[4]?s?s.p(t,e):(s=ot(t),s.c(),s.m(o.parentNode,o)):s&&(s.d(1),s=null)},i:t,o:t,d(t){r&&r.d(t),t&&a(n),s&&s.d(t),t&&a(o)}}}function st(t,e,n){let o,r,s,l,c;i(t,K,(t=>n(1,s=t))),i(t,H,(t=>n(3,l=t))),i(t,Q,(t=>n(4,c=t)));const a=new URL("https://accounts.spotify.com/authorize?"),u=function(t){let e="";const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let o=0;o<t;o++)e+=n.charAt(Math.floor(Math.random()*n.length));return e}(16);let f=!0;return t.$$.update=()=>{3&t.$$.dirty&&n(5,o=new URLSearchParams({response_type:"token",show_dialog:!f,client_id:"e27568bbeef44f7db83b446e2d6f57ab",scope:"user-read-private user-read-email playlist-modify-public playlist-modify-private",redirect_uri:s,state:u})),32&t.$$.dirty&&n(2,r=a+o)},[f,s,r,l,c,o,function(){f=this.checked,n(0,f)}]}class it extends U{constructor(t){super(),M(this,t,st,rt,s,{})}}function lt(e){let n,r,s,i,p,b,y,$,v,x,k,w,_,z,C,j;return{c(){n=u("label"),n.textContent="Playlist Name",r=d(),s=u("input"),i=u("br"),p=d(),b=u("label"),b.textContent="Description",y=d(),$=u("input"),v=u("br"),x=d(),k=u("button"),k.textContent="Create Playlist",w=d(),_=u("p"),z=f(e[2]),h(n,"class","label"),h(n,"for","playlist-name"),h(s,"class","input"),h(s,"name","playlist-name"),h(s,"type","text"),h(b,"class","label"),h(b,"for","playlist-desc"),h($,"class","input"),h($,"name","playlist-desc"),h($,"type","text")},m(t,o){c(t,n,o),c(t,r,o),c(t,s,o),g(s,e[0]),c(t,i,o),c(t,p,o),c(t,b,o),c(t,y,o),c(t,$,o),g($,e[1]),c(t,v,o),c(t,x,o),c(t,k,o),c(t,w,o),c(t,_,o),l(_,z),C||(j=[m(s,"input",e[4]),m($,"input",e[5]),m(k,"click",e[3],{once:!0})],C=!0)},p(t,[e]){1&e&&s.value!==t[0]&&g(s,t[0]),2&e&&$.value!==t[1]&&g($,t[1]),4&e&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(z,t[2])},i:t,o:t,d(t){t&&a(n),t&&a(r),t&&a(s),t&&a(i),t&&a(p),t&&a(b),t&&a(y),t&&a($),t&&a(v),t&&a(x),t&&a(k),t&&a(w),t&&a(_),C=!1,o(j)}}}function ct(t,e,n){let o,r,s;i(t,H,(t=>n(8,o=t))),i(t,V,(t=>n(9,r=t))),i(t,Q,(t=>n(10,s=t)));let l,c,a="last.fm top "+r.length,u="",f="";async function d(t,e){const n=`https://api.spotify.com/v1/search?q=track:${t}%20artist:${e}&type=track&limit=5`,r=o;let s;return await fetch(n,{method:"GET",headers:{Authorization:"Bearer "+r}}).then((t=>{if(t.ok)return t.json();throw new Error("Track not found - skipping")})).then((t=>{console.log(t),console.log("track_id found: ",t.tracks.items[0].uri),s=t.tracks.items[0].uri})).catch((t=>{console.log(t)})),s}return x((()=>{console.log(o),console.log(s),console.log(r)})),[a,u,f,async function(){await async function(){n(2,f="Please wait: getting user data...");const t=o;await fetch("https://api.spotify.com/v1/me",{method:"GET",headers:{Authorization:"Bearer "+t}}).then((t=>t.json())).then((t=>{l=t.id}))}(),n(2,f="Please wait: Playlist is being created..."),console.log("creating playlist for user ",l);const t=o,e=await fetch(`https://api.spotify.com/v1/users/${l}/playlists`,{method:"POST",headers:{Authorization:"Bearer "+t},body:JSON.stringify({name:a,description:u,public:!1})});e.ok?c=await e.json():Q.set(!0),async function(){n(2,f="Please wait: Getting songs...");const t=[];for(let e=0;e<r.length;e++)t.push(await d(r[e].name,r[e].artist.name));n(2,f="Please wait: Adding songs to playlist...");const e=o,s=`https://api.spotify.com/v1/playlists/${c.id}/tracks`;await fetch(s,{method:"POST",headers:{Authorization:"Bearer "+e},body:JSON.stringify({uris:t})}).then((t=>{if(t.ok)return t.json();throw new Error("Adding to playlist not successful")})).then((t=>{console.log("add to playlist RESPONSE: ",t)})).catch((t=>{console.log(t),n(2,f="Oh no, something went wrong!")})),n(2,f="Success!")}()},function(){a=this.value,n(0,a)},function(){u=this.value,n(1,u)}]}class at extends U{constructor(t){super(),M(this,t,ct,lt,s,{})}}function ut(t){let e,n;return e=new at({}),{c(){R(e.$$.fragment)},m(t,o){G(e,t,o),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){L(e.$$.fragment,t),n=!1},d(t){q(e,t)}}}function ft(t){let e,n;return e=new et({}),{c(){R(e.$$.fragment)},m(t,o){G(e,t,o),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){L(e.$$.fragment,t),n=!1},d(t){q(e,t)}}}function dt(t){let e,n;return e=new it({}),{c(){R(e.$$.fragment)},m(t,o){G(e,t,o),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){L(e.$$.fragment,t),n=!1},d(t){q(e,t)}}}function pt(t){let e,n,r,s,i,l;const f=[dt,ft,ut],m=[];function h(t,e){return!t[0]||t[1]?0:t[2]?t[0]&&t[2]?2:-1:1}return~(r=h(t))&&(s=m[r]=f[r](t)),{c(){var t,o,r,l;e=u("h2"),e.textContent="last.fm to spotify playlist",n=d(),s&&s.c(),i=p(),t=e,o="text-align",null===(r="center")?t.style.removeProperty(o):t.style.setProperty(o,r,l?"important":"")},m(t,o){c(t,e,o),c(t,n,o),~r&&m[r].m(t,o),c(t,i,o),l=!0},p(t,[e]){let n=r;r=h(t),r!==n&&(s&&(T={r:0,c:[],p:T},L(m[n],1,1,(()=>{m[n]=null})),T.r||o(T.c),T=T.p),~r?(s=m[r],s||(s=m[r]=f[r](t),s.c()),B(s,1),s.m(i.parentNode,i)):s=null)},i(t){l||(B(s),l=!0)},o(t){L(s),l=!1},d(t){t&&a(e),t&&a(n),~r&&m[r].d(t),t&&a(i)}}}function mt(t,e,n){let o,r,s;return i(t,H,(t=>n(0,o=t))),i(t,Q,(t=>n(1,r=t))),i(t,V,(t=>n(2,s=t))),[o,r,s]}return new class extends U{constructor(t){super(),M(this,t,mt,pt,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map