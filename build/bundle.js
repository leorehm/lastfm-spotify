var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function s(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function l(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function a(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function d(){return f(" ")}function p(){return f("")}function m(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t){return""===t?null:+t}function y(t,e){t.value=null==e?"":e}function g(t,e,n,o){null===n?t.style.removeProperty(e):t.style.setProperty(e,n,o?"important":"")}function v(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}t.selectedIndex=-1}function $(t,e,n){t.classList[n?"add":"remove"](e)}let k;function x(t){k=t}const w=[],_=[],C=[],P=[],S=Promise.resolve();let E=!1;function N(t){C.push(t)}const T=new Set;let A=0;function O(){const t=k;do{for(;A<w.length;){const t=w[A];A++,x(t),j(t.$$)}for(x(null),w.length=0,A=0;_.length;)_.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];T.has(e)||(T.add(e),e())}C.length=0}while(w.length);for(;P.length;)P.pop()();E=!1,T.clear(),x(t)}function j(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}const L=new Set;let z;function B(t,e){t&&t.i&&(L.delete(t),t.i(e))}function R(t,e,n,o){if(t&&t.o){if(L.has(t))return;L.add(t),z.c.push((()=>{L.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function U(t){t&&t.c()}function G(t,n,r,i){const{fragment:l,on_mount:c,on_destroy:a,after_update:u}=t.$$;l&&l.m(n,r),i||N((()=>{const n=c.map(e).filter(s);a?a.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(N)}function M(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function q(t,e){-1===t.$$.dirty[0]&&(w.push(t),E||(E=!0,S.then(O)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function D(e,s,r,i,l,c,u,f=[-1]){const d=k;x(e);const p=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(d?d.$$.context:[])),callbacks:n(),dirty:f,skip_bound:!1,root:s.target||d.$$.root};u&&u(p.root);let m=!1;if(p.ctx=r?r(e,s.props||{},((t,n,...o)=>{const s=o.length?o[0]:n;return p.ctx&&l(p.ctx[t],p.ctx[t]=s)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](s),m&&q(e,t)),n})):[],p.update(),m=!0,o(p.before_update),p.fragment=!!i&&i(p.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);p.fragment&&p.fragment.l(t),t.forEach(a)}else p.fragment&&p.fragment.c();s.intro&&B(e.$$.fragment),G(e,s.target,s.anchor,s.customElement),O()}x(d)}class I{$destroy(){M(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const J=[];function H(t,e){return{subscribe:V(t,e).subscribe}}function V(e,n=t){let o;const s=new Set;function i(t){if(r(e,t)&&(e=t,o)){const t=!J.length;for(const t of s)t[1](),J.push(t,e);if(t){for(let t=0;t<J.length;t+=2)J[t][0](J[t+1]);J.length=0}}}return{set:i,update:function(t){i(t(e))},subscribe:function(r,l=t){const c=[r,l];return s.add(c),1===s.size&&(o=n(i)||t),r(e),()=>{s.delete(c),0===s.size&&(o(),o=null)}}}}const F=H(null,(function(t){const e={},n=/([^&;=]+)=?([^&;]*)/g,o=window.location.hash.substring(1);let s;for(;s=n.exec(o);)e[s[1]]=decodeURIComponent(s[2]);t(e.access_token),window.history.pushState("object or string","Title","/")})),K=H(null,(function(t){t("https://leorehm.github.io/lastfm-spotify")})),Q=V(!1),W=V(null);function X(t,e,n){const o=t.slice();return o[7]=e[n],o}function Y(e){let n,o,s,r=e[7]+"";return{c(){n=u("option"),o=f(r),n.__value=s=e[7],n.value=n.__value},m(t,e){c(t,n,e),l(n,o)},p:t,d(t){t&&a(n)}}}function Z(e){let n,s,r,i,p,g,$,k,x,w,_,C,P,S,E,T,A,O,j,L,z,B,R,U,G,M,q,D,I,J,H,V,F,K,Q=e[7],W=[];for(let t=0;t<Q.length;t+=1)W[t]=Y(X(e,Q,t));return{c(){n=u("div"),s=u("form"),r=u("div"),i=u("label"),i.textContent="last.fm Username",p=d(),g=u("input"),$=u("br"),k=d(),x=u("div"),w=u("label"),w.textContent="Track Limit",_=d(),C=u("input"),P=u("br"),S=d(),E=u("div"),T=u("label"),T.textContent="Time Period",A=d(),O=u("select");for(let t=0;t<W.length;t+=1)W[t].c();j=u("br"),L=d(),z=u("button"),B=f("Get Data "),R=u("i"),G=d(),M=u("div"),q=u("label"),q.textContent="Songs retrieved from last.fm",D=d(),I=u("textarea"),J=d(),H=u("button"),V=f("Next"),h(i,"class","form-label svelte-3aywy4"),h(i,"for","username"),h(g,"class","form-input svelte-3aywy4"),h(g,"name","username"),h(g,"type","text"),h(w,"class","form-label svelte-3aywy4"),h(w,"for","limit"),h(C,"class","form-input svelte-3aywy4"),h(C,"name","limit"),h(C,"type","number"),h(C,"min","1"),h(C,"max","100"),h(T,"class","form-label svelte-3aywy4"),h(T,"for","period"),h(O,"class","form-input svelte-3aywy4"),h(O,"name","period"),void 0===e[0]&&N((()=>e[10].call(O))),h(s,"class","item-form"),h(R,"class","fa-brands fa-lastfm"),h(z,"class","pure-button-primary svelte-3aywy4"),h(z,"id","submit-button"),h(z,"disbaled",U=e[4]=""),h(q,"for","output"),h(q,"class","form-label svelte-3aywy4"),I.readOnly=!0,h(I,"id","song-output"),h(I,"name","song-output"),h(I,"rows","limit"),h(I,"cols","50"),h(I,"class","svelte-3aywy4"),h(M,"class","item-output"),h(H,"class","pure-button-primary svelte-3aywy4"),h(H,"id","next-button"),H.disabled=e[3],h(n,"class","container svelte-3aywy4")},m(t,o){c(t,n,o),l(n,s),l(s,r),l(r,i),l(r,p),l(r,g),y(g,e[4]),l(r,$),l(s,k),l(s,x),l(x,w),l(x,_),l(x,C),y(C,e[1]),l(x,P),l(s,S),l(s,E),l(E,T),l(E,A),l(E,O);for(let t=0;t<W.length;t+=1)W[t].m(O,null);var a;v(O,e[0]),l(E,j),l(n,L),l(n,z),l(z,B),l(z,R),l(n,G),l(n,M),l(M,q),l(M,D),l(M,I),y(I,e[2]),l(n,J),l(n,H),l(H,V),F||(K=[m(g,"input",e[8]),m(C,"input",e[9]),m(O,"change",e[10]),m(s,"submit",(a=e[5],function(t){return t.preventDefault(),a.call(this,t)})),m(z,"click",e[5]),m(I,"input",e[11]),m(H,"click",e[6])],F=!0)},p(t,[e]){if(16&e&&g.value!==t[4]&&y(g,t[4]),2&e&&b(C.value)!==t[1]&&y(C,t[1]),128&e){let n;for(Q=t[7],n=0;n<Q.length;n+=1){const o=X(t,Q,n);W[n]?W[n].p(o,e):(W[n]=Y(o),W[n].c(),W[n].m(O,null))}for(;n<W.length;n+=1)W[n].d(1);W.length=Q.length}129&e&&v(O,t[0]),16&e&&U!==(U=t[4]="")&&h(z,"disbaled",U),4&e&&y(I,t[2]),8&e&&(H.disabled=t[3])},i:t,o:t,d(t){t&&a(n),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(W,t),F=!1,o(K)}}}const tt="57411198178c595fbb09fabbe83934ac";function et(t,e,n){let o,s;i(t,W,(t=>n(13,s=t)));const r=["overall","7day","1month","3month","6month","12month"];let l,c="7day",a=20,u="",f=!0;return n(4,o=""),[c,a,u,f,o,async function(){console.log("username: ",o);try{l=await async function(){let t;console.log("fetching last.fm data...");const e="https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user="+o+"&period="+c+"&limit="+a+"&api_key="+tt+"&format=json";return await fetch(e).then((t=>{if(t.ok)return t.json();throw new Error("No songs found. User may not exist or have songs scrobbled during the selected timeframe.")})).then((e=>{t=e.toptracks.track,console.log("...done!")})).catch((e=>{console.log(e),t=e})),t}()}catch(t){return void n(2,u=W.toString())}""!=u&&n(2,u="");for(let t=0;t<l.length;t++)n(2,u+=t+1+": "),n(2,u+=l[t].artist.name+" - "),n(2,u+=l[t].name+"\r\n");if(""==u)return n(2,u="It seems there are no songs available for the selected username and/or time period."),void n(3,f=!0);n(3,f=!1)},function(){var t;s=l,t=s,W.set(t)},r,function(){o=this.value,n(4,o)},function(){a=b(this.value),n(1,a)},function(){c=function(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}(this),n(0,c),n(7,r)},function(){u=this.value,n(2,u)}]}class nt extends I{constructor(t){super(),D(this,t,et,Z,r,{})}}function ot(t){let e,n,o,s,r,i,f,p,b,y,g,v;return{c(){e=u("div"),n=u("a"),o=u("button"),o.textContent="Connect to Spotify",s=d(),r=u("br"),i=d(),f=u("div"),p=u("label"),p.textContent="Remember me?",b=d(),y=u("input"),h(o,"class","pure-button pure-button-primary svelte-1inu2bh"),h(o,"id","login-btn"),h(n,"href",t[2]),h(p,"id","checkbox-label"),h(p,"for","remember-me"),h(p,"class","svelte-1inu2bh"),h(y,"id","checkbox-box"),h(y,"name","remember-me"),h(y,"type","checkbox"),h(y,"class","svelte-1inu2bh"),h(f,"id","checkbox-container"),h(f,"class","svelte-1inu2bh"),h(e,"id","login"),h(e,"class","svelte-1inu2bh")},m(a,u){c(a,e,u),l(e,n),l(n,o),l(e,s),l(e,r),l(e,i),l(e,f),l(f,p),l(f,b),l(f,y),y.checked=t[0],g||(v=m(y,"change",t[6]),g=!0)},p(t,e){4&e&&h(n,"href",t[2]),1&e&&(y.checked=t[0])},d(t){t&&a(e),g=!1,v()}}}function st(t){let e,n,o,s,r;return{c(){e=u("section"),n=u("p"),n.textContent="Token expired! Please log out and log back in again.",o=d(),s=u("a"),r=u("button"),r.textContent="Logout",h(s,"href",t[1]),h(e,"class","expired-token")},m(t,i){c(t,e,i),l(e,n),l(e,o),l(e,s),l(s,r)},p(t,e){2&e&&h(s,"href",t[1])},d(t){t&&a(e)}}}function rt(e){let n,o,s=!e[3]&&ot(e),r=e[4]&&st(e);return{c(){s&&s.c(),n=d(),r&&r.c(),o=p()},m(t,e){s&&s.m(t,e),c(t,n,e),r&&r.m(t,e),c(t,o,e)},p(t,[e]){t[3]?s&&(s.d(1),s=null):s?s.p(t,e):(s=ot(t),s.c(),s.m(n.parentNode,n)),t[4]?r?r.p(t,e):(r=st(t),r.c(),r.m(o.parentNode,o)):r&&(r.d(1),r=null)},i:t,o:t,d(t){s&&s.d(t),t&&a(n),r&&r.d(t),t&&a(o)}}}function it(t,e,n){let o,s,r,l,c;i(t,K,(t=>n(1,r=t))),i(t,F,(t=>n(3,l=t))),i(t,Q,(t=>n(4,c=t)));const a=new URL("https://accounts.spotify.com/authorize?"),u=function(t){let e="";const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let o=0;o<t;o++)e+=n.charAt(Math.floor(Math.random()*n.length));return e}(16);let f=!0;return t.$$.update=()=>{3&t.$$.dirty&&n(5,o=new URLSearchParams({response_type:"token",show_dialog:!f,client_id:"e27568bbeef44f7db83b446e2d6f57ab",scope:"user-read-private playlist-modify-public playlist-modify-private",redirect_uri:r,state:u})),32&t.$$.dirty&&n(2,s=a+o)},[f,r,s,l,c,o,function(){f=this.checked,n(0,f)}]}class lt extends I{constructor(t){super(),D(this,t,it,rt,r,{})}}function ct(t){let e,n,o,s,r,i,p,b,g,v,$,k;return{c(){e=u("div"),n=u("label"),n.textContent="Playlist Link",o=d(),s=u("input"),r=u("br"),i=d(),p=u("a"),b=u("button"),g=f("Open Playlist "),v=u("i"),h(n,"for","playlist-link"),h(n,"class","label svelte-cudkfm"),h(s,"name","playlist-link"),h(s,"type","text"),h(s,"class","input svelte-cudkfm"),h(v,"class","fa-brands fa-spotify"),h(b,"class","pure-button-primary svelte-cudkfm"),h(b,"href",t[3]),h(p,"href",t[3]),h(e,"class","playlist-link")},m(a,u){c(a,e,u),l(e,n),l(e,o),l(e,s),y(s,t[3]),l(e,r),l(e,i),l(e,p),l(p,b),l(b,g),l(b,v),$||(k=m(s,"input",t[10]),$=!0)},p(t,e){8&e&&s.value!==t[3]&&y(s,t[3]),8&e&&h(b,"href",t[3]),8&e&&h(p,"href",t[3])},d(t){t&&a(e),$=!1,k()}}}function at(e){let n,s,r,i,p,b,v,k,x,w,_,C,P,S,E,N,T,A,O,j,L,z,B,R,U,G=""!=e[3]&&ct(e);return{c(){n=u("div"),s=u("label"),s.textContent="Playlist Name",r=d(),i=u("input"),p=u("br"),b=d(),v=u("label"),v.textContent="Description",k=d(),x=u("input"),w=u("br"),_=d(),C=u("label"),C.textContent="Visibility",P=d(),S=u("div"),E=u("button"),E.textContent="Public",N=d(),T=u("button"),T.textContent="Private",A=d(),O=u("button"),O.innerHTML='Create Playlist <i class="fa-brands fa-spotify"></i>',j=d(),L=u("p"),z=f(e[4]),B=d(),G&&G.c(),h(s,"class","label svelte-cudkfm"),h(s,"for","playlist-name"),h(i,"class","input svelte-cudkfm"),h(i,"name","playlist-name"),h(i,"type","text"),h(v,"class","label svelte-cudkfm"),h(v,"for","playlist-desc"),h(x,"class","input svelte-cudkfm"),h(x,"name","playlist-desc"),h(x,"type","text"),h(C,"for","playlist-scope"),h(C,"class","label svelte-cudkfm"),h(E,"id","public-button"),h(E,"class","toggle-button svelte-cudkfm"),$(E,"active",e[2]),h(T,"id","private-button"),h(T,"class","toggle-button svelte-cudkfm"),$(T,"active",!e[2]),h(S,"name","playlist-scope"),h(S,"class","pure-button-group svelte-cudkfm"),h(S,"role","group"),h(O,"class","pure-button-primary svelte-cudkfm"),g(L,"margin","10px 0 10px 0"),h(n,"class","container svelte-cudkfm")},m(t,o){c(t,n,o),l(n,s),l(n,r),l(n,i),y(i,e[0]),l(n,p),l(n,b),l(n,v),l(n,k),l(n,x),y(x,e[1]),l(n,w),l(n,_),l(n,C),l(n,P),l(n,S),l(S,E),l(S,N),l(S,T),l(n,A),l(n,O),l(n,j),l(n,L),l(L,z),l(n,B),G&&G.m(n,null),R||(U=[m(i,"input",e[6]),m(x,"input",e[7]),m(E,"click",e[8]),m(T,"click",e[9]),m(O,"click",e[5],{once:!0})],R=!0)},p(t,[e]){1&e&&i.value!==t[0]&&y(i,t[0]),2&e&&x.value!==t[1]&&y(x,t[1]),4&e&&$(E,"active",t[2]),4&e&&$(T,"active",!t[2]),16&e&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(z,t[4]),""!=t[3]?G?G.p(t,e):(G=ct(t),G.c(),G.m(n,null)):G&&(G.d(1),G=null)},i:t,o:t,d(t){t&&a(n),G&&G.d(),R=!1,o(U)}}}function ut(t,e,n){let o,s;i(t,F,(t=>n(13,o=t))),i(t,W,(t=>n(14,s=t)));let r,l,c="last.fm top "+s.length,a="",u=!0,f="",d="";async function p(t,e){const n=`https://api.spotify.com/v1/search?q=track:${t}%20artist:${e}&type=track&limit=5`,s=o;let r;return await fetch(n,{method:"GET",headers:{Authorization:"Bearer "+s}}).then((t=>{if(t.ok)return t.json();throw new Error("Track not found - skipping")})).then((t=>{console.log("track_id found: ",t.tracks.items[0].uri),r=t.tracks.items[0].uri})).catch((t=>{console.log(t)})),r}return[c,a,u,f,d,async function(){await async function(){n(4,d="Please wait: getting user data...");const t=o;await fetch("https://api.spotify.com/v1/me",{method:"GET",headers:{Authorization:"Bearer "+t}}).then((t=>t.json())).then((t=>{r=t.id}))}(),n(4,d="Please wait: Playlist is being created..."),console.log("creating playlist for user ",r);const t=o,e=await fetch(`https://api.spotify.com/v1/users/${r}/playlists`,{method:"POST",headers:{Authorization:"Bearer "+t},body:JSON.stringify({name:c,public:u,description:a,public:!1})});e.ok?l=await e.json():Q.set(!0),async function(){n(4,d="Please wait: Getting songs...");const t=[];for(let e=0;e<s.length;e++)t.push(await p(s[e].name,s[e].artist.name));n(4,d="Please wait: Adding songs to playlist...");const e=o,r=`https://api.spotify.com/v1/playlists/${l.id}/tracks`;await fetch(r,{method:"POST",headers:{Authorization:"Bearer "+e},body:JSON.stringify({uris:t})}).then((t=>{if(t.ok)return t.json();throw new Error("Adding to playlist not successful")})).then((t=>{console.log("add to playlist RESPONSE: ",t)})).catch((t=>{console.log(t),n(4,d="Oh no, something went wrong!")})),n(3,f=l.external_urls.spotify),n(4,d="Success!")}()},function(){c=this.value,n(0,c)},function(){a=this.value,n(1,a)},()=>n(2,u=!u),()=>n(2,u=!u),function(){f=this.value,n(3,f)}]}class ft extends I{constructor(t){super(),D(this,t,ut,at,r,{})}}function dt(t){let e,n;return e=new ft({}),{c(){U(e.$$.fragment)},m(t,o){G(e,t,o),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){M(e,t)}}}function pt(t){let e,n;return e=new nt({}),{c(){U(e.$$.fragment)},m(t,o){G(e,t,o),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){M(e,t)}}}function mt(t){let e,n;return e=new lt({}),{c(){U(e.$$.fragment)},m(t,o){G(e,t,o),n=!0},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){M(e,t)}}}function ht(t){let e,n,s,r,i,l;const f=[mt,pt,dt],m=[];function h(t,e){return!t[0]||t[1]?0:t[2]?t[0]&&t[2]?2:-1:1}return~(s=h(t))&&(r=m[s]=f[s](t)),{c(){e=u("h2"),e.textContent="last.fm to spotify playlist.",n=d(),r&&r.c(),i=p(),g(e,"text-align","center")},m(t,o){c(t,e,o),c(t,n,o),~s&&m[s].m(t,o),c(t,i,o),l=!0},p(t,[e]){let n=s;s=h(t),s!==n&&(r&&(z={r:0,c:[],p:z},R(m[n],1,1,(()=>{m[n]=null})),z.r||o(z.c),z=z.p),~s?(r=m[s],r||(r=m[s]=f[s](t),r.c()),B(r,1),r.m(i.parentNode,i)):r=null)},i(t){l||(B(r),l=!0)},o(t){R(r),l=!1},d(t){t&&a(e),t&&a(n),~s&&m[s].d(t),t&&a(i)}}}function bt(t,e,n){let o,s,r;return i(t,F,(t=>n(0,o=t))),i(t,Q,(t=>n(1,s=t))),i(t,W,(t=>n(2,r=t))),[o,s,r]}return new class extends I{constructor(t){super(),D(this,t,bt,ht,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
