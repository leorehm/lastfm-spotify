var app=function(t){"use strict";function e(){}function n(t){return t()}function o(){return Object.create(null)}function s(t){t.forEach(n)}function r(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(t,n,o){t.$$.on_destroy.push(function(t,...n){if(null==t){for(const t of n)t(void 0);return e}const o=t.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function a(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode&&t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function p(){return d(" ")}function m(){return d("")}function h(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t){return""===t?null:+t}function v(t,e){t.value=null==e?"":e}function y(t,e,n){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}n&&void 0===e||(t.selectedIndex=-1)}function $(t,e,n){t.classList.toggle(e,!!n)}let w;function x(t){w=t}const k=[],_=[];let j=[];const P=[],C=Promise.resolve();let S=!1;function E(t){j.push(t)}const A=new Set;let O=0;function T(){if(0!==O)return;const t=w;do{try{for(;O<k.length;){const t=k[O];O++,x(t),L(t.$$)}}catch(t){throw k.length=0,O=0,t}for(x(null),k.length=0,O=0;_.length;)_.pop()();for(let t=0;t<j.length;t+=1){const e=j[t];A.has(e)||(A.add(e),e())}j.length=0}while(k.length);for(;P.length;)P.pop()();S=!1,A.clear(),x(t)}function L(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}const N=new Set;let M;function z(t,e){t&&t.i&&(N.delete(t),t.i(e))}function R(t,e,n,o){if(t&&t.o){if(N.has(t))return;N.add(t),M.c.push((()=>{N.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}function B(t){return void 0!==t?.length?t:Array.from(t)}function U(t){t&&t.c()}function G(t,e,o){const{fragment:i,after_update:l}=t.$$;i&&i.m(e,o),E((()=>{const e=t.$$.on_mount.map(n).filter(r);t.$$.on_destroy?t.$$.on_destroy.push(...e):s(e),t.$$.on_mount=[]})),l.forEach(E)}function I(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];j.forEach((o=>-1===t.indexOf(o)?e.push(o):n.push(o))),n.forEach((t=>t())),j=e}(n.after_update),s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function q(t,e){-1===t.$$.dirty[0]&&(k.push(t),S||(S=!0,C.then(T)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function D(t,n,r,i,l,a,c,f=[-1]){const d=w;x(t);const p=t.$$={fragment:null,ctx:[],props:a,update:e,not_equal:l,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:o(),dirty:f,skip_bound:!1,root:n.target||d.$$.root};c&&c(p.root);let m=!1;if(p.ctx=r?r(t,n.props||{},((e,n,...o)=>{const s=o.length?o[0]:n;return p.ctx&&l(p.ctx[e],p.ctx[e]=s)&&(!p.skip_bound&&p.bound[e]&&p.bound[e](s),m&&q(t,e)),n})):[],p.update(),m=!0,s(p.before_update),p.fragment=!!i&&i(p.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);p.fragment&&p.fragment.l(t),t.forEach(u)}else p.fragment&&p.fragment.c();n.intro&&z(t.$$.fragment),G(t,n.target,n.anchor),T()}x(d)}class H{$$=void 0;$$set=void 0;$destroy(){I(this,1),this.$destroy=e}$on(t,n){if(!r(n))return e;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("4");const F=[];function J(t,e){return{subscribe:K(t,e).subscribe}}function K(t,n=e){let o;const s=new Set;function r(e){if(i(t,e)&&(t=e,o)){const e=!F.length;for(const e of s)e[1](),F.push(e,t);if(e){for(let t=0;t<F.length;t+=2)F[t][0](F[t+1]);F.length=0}}}function l(e){r(e(t))}return{set:r,update:l,subscribe:function(i,a=e){const c=[i,a];return s.add(c),1===s.size&&(o=n(r,l)||e),i(t),()=>{s.delete(c),0===s.size&&o&&(o(),o=null)}}}}const V=J(null,(function(t){const e={},n=/([^&;=]+)=?([^&;]*)/g,o=window.location.hash.substring(1);let s;for(;s=n.exec(o);)e[s[1]]=decodeURIComponent(s[2]);t(e.access_token),window.history.pushState("object or string","Title","/")})),Y=J(null,(function(t){t("https://leorehm.github.io/lastfm-spotify")})),Q=K(!1),W=K(null);function X(t,e,n){const o=t.slice();return o[7]=e[n],o}function Z(t){let n,o,s=t[7]+"";return{c(){n=f("option"),o=d(s),n.__value=t[7],v(n,n.__value)},m(t,e){c(t,n,e),a(n,o)},p:e,d(t){t&&u(n)}}}function tt(t){let n,o,r,i,l,m,$,w,x,k,_,j,P,C,S,A,O,T,L,N,M,z,R,U,G,I,q,D,H,F,J,K,V,Y,Q=B(t[7]),W=[];for(let e=0;e<Q.length;e+=1)W[e]=Z(X(t,Q,e));return{c(){n=f("div"),o=f("form"),r=f("div"),i=f("label"),i.textContent="last.fm Username",l=p(),m=f("input"),$=f("br"),w=p(),x=f("div"),k=f("label"),k.textContent="Track Limit",_=p(),j=f("input"),P=f("br"),C=p(),S=f("div"),A=f("label"),A.textContent="Time Period",O=p(),T=f("select");for(let t=0;t<W.length;t+=1)W[t].c();L=f("br"),N=p(),M=f("button"),z=d("Get Data "),R=f("i"),G=p(),I=f("div"),q=f("label"),q.textContent="Songs retrieved from last.fm",D=p(),H=f("textarea"),F=p(),J=f("button"),K=d("Next"),g(i,"class","form-label svelte-js0ar"),g(i,"for","username"),g(m,"class","form-input svelte-js0ar"),g(m,"name","username"),g(m,"type","text"),g(k,"class","form-label svelte-js0ar"),g(k,"for","limit"),g(j,"class","form-input svelte-js0ar"),g(j,"name","limit"),g(j,"type","number"),g(j,"min","1"),g(j,"max","100"),g(A,"class","form-label svelte-js0ar"),g(A,"for","period"),g(T,"class","form-input svelte-js0ar"),g(T,"name","period"),void 0===t[0]&&E((()=>t[10].call(T))),g(o,"class","item-form"),g(R,"class","fa-brands fa-lastfm"),g(M,"class","pure-button-primary svelte-js0ar"),g(M,"id","submit-button"),g(M,"disbaled",U=t[4]=""),g(q,"for","output"),g(q,"class","form-label svelte-js0ar"),H.readOnly=!0,g(H,"id","song-output"),g(H,"name","song-output"),g(H,"rows","limit"),g(H,"cols","50"),g(H,"class","svelte-js0ar"),g(I,"class","item-output"),g(J,"class","pure-button-primary svelte-js0ar"),g(J,"id","next-button"),J.disabled=t[3],g(n,"class","container svelte-js0ar")},m(e,s){c(e,n,s),a(n,o),a(o,r),a(r,i),a(r,l),a(r,m),v(m,t[4]),a(r,$),a(o,w),a(o,x),a(x,k),a(x,_),a(x,j),v(j,t[1]),a(x,P),a(o,C),a(o,S),a(S,A),a(S,O),a(S,T);for(let t=0;t<W.length;t+=1)W[t]&&W[t].m(T,null);var u;y(T,t[0],!0),a(S,L),a(n,N),a(n,M),a(M,z),a(M,R),a(n,G),a(n,I),a(I,q),a(I,D),a(I,H),v(H,t[2]),a(n,F),a(n,J),a(J,K),V||(Y=[h(m,"input",t[8]),h(j,"input",t[9]),h(T,"change",t[10]),h(o,"submit",(u=t[5],function(t){return t.preventDefault(),u.call(this,t)})),h(M,"click",t[5]),h(H,"input",t[11]),h(J,"click",t[6])],V=!0)},p(t,[e]){if(16&e&&m.value!==t[4]&&v(m,t[4]),2&e&&b(j.value)!==t[1]&&v(j,t[1]),128&e){let n;for(Q=B(t[7]),n=0;n<Q.length;n+=1){const o=X(t,Q,n);W[n]?W[n].p(o,e):(W[n]=Z(o),W[n].c(),W[n].m(T,null))}for(;n<W.length;n+=1)W[n].d(1);W.length=Q.length}1&e&&y(T,t[0]),16&e&&U!==(U=t[4]="")&&g(M,"disbaled",U),4&e&&v(H,t[2]),8&e&&(J.disabled=t[3])},i:e,o:e,d(t){t&&u(n),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(W,t),V=!1,s(Y)}}}const et="undefined";function nt(t,e,n){let o,s;l(t,W,(t=>n(13,s=t)));let r,i="7day",a=20,c="",u=!0;return n(4,o=""),[i,a,c,u,o,async function(){try{r=await async function(){let t;const e="https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user="+o+"&period="+i+"&limit="+a+"&api_key="+et+"&format=json";return await fetch(e).then((t=>{if(t.ok)return t.json();throw new Error("No songs found. User may not exist or have songs scrobbled during the selected timeframe.")})).then((e=>{t=e.toptracks.track})).catch((e=>{console.log(e),t=e})),t}()}catch(t){return void n(2,c=W.toString())}""!=c&&n(2,c="");for(let t=0;t<r.length;t++)n(2,c+=t+1+": "),n(2,c+=r[t].artist.name+" - "),n(2,c+=r[t].name+"\r\n");if(""==c)return n(2,c="It seems there are no songs available for the selected username and/or time period."),void n(3,u=!0);n(3,u=!1)},function(){var t;s=r,t=s,W.set(t)},["overall","7day","1month","3month","6month","12month"],function(){o=this.value,n(4,o)},function(){a=b(this.value),n(1,a)},function(){i=function(t){const e=t.querySelector(":checked");return e&&e.__value}(this),n(0,i)},function(){c=this.value,n(2,c)}]}class ot extends H{constructor(t){super(),D(this,t,nt,tt,i,{})}}function st(t){let e,n,o,s,r,i,l,d,m,b,v,y;return{c(){e=f("div"),n=f("a"),o=f("button"),o.textContent="Login with Spotify",s=p(),r=f("br"),i=p(),l=f("div"),d=f("label"),d.textContent="Remember me?",m=p(),b=f("input"),g(o,"class","pure-button pure-button-primary svelte-1y3coef"),g(o,"id","login-btn"),g(d,"id","checkbox-label"),g(d,"for","remember-me"),g(d,"class","svelte-1y3coef"),g(b,"id","checkbox-box"),g(b,"name","remember-me"),g(b,"type","checkbox"),g(b,"class","svelte-1y3coef"),g(l,"id","checkbox-container"),g(l,"class","svelte-1y3coef"),g(n,"href",t[2]),g(e,"id","login"),g(e,"class","svelte-1y3coef")},m(u,f){c(u,e,f),a(e,n),a(n,o),a(n,s),a(n,r),a(n,i),a(n,l),a(l,d),a(l,m),a(l,b),b.checked=t[0],v||(y=h(b,"change",t[6]),v=!0)},p(t,e){1&e&&(b.checked=t[0]),4&e&&g(n,"href",t[2])},d(t){t&&u(e),v=!1,y()}}}function rt(t){let e,n,o,s,r;return{c(){e=f("section"),n=f("p"),n.textContent="Token expired! Please log out and log back in again.",o=p(),s=f("a"),r=f("button"),r.textContent="Logout",g(s,"href",t[1]),g(e,"class","expired-token")},m(t,i){c(t,e,i),a(e,n),a(e,o),a(e,s),a(s,r)},p(t,e){2&e&&g(s,"href",t[1])},d(t){t&&u(e)}}}function it(t){let n,o,s=!t[3]&&st(t),r=t[4]&&rt(t);return{c(){s&&s.c(),n=p(),r&&r.c(),o=m()},m(t,e){s&&s.m(t,e),c(t,n,e),r&&r.m(t,e),c(t,o,e)},p(t,[e]){t[3]?s&&(s.d(1),s=null):s?s.p(t,e):(s=st(t),s.c(),s.m(n.parentNode,n)),t[4]?r?r.p(t,e):(r=rt(t),r.c(),r.m(o.parentNode,o)):r&&(r.d(1),r=null)},i:e,o:e,d(t){t&&(u(n),u(o)),s&&s.d(t),r&&r.d(t)}}}function lt(t,e,n){let o,s,r,i,a;l(t,Y,(t=>n(1,r=t))),l(t,V,(t=>n(3,i=t))),l(t,Q,(t=>n(4,a=t)));const c=new URL("https://accounts.spotify.com/authorize?"),u=function(t){let e="";const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let o=0;o<t;o++)e+=n.charAt(Math.floor(62*Math.random()));return e}(16);let f=!0;return t.$$.update=()=>{3&t.$$.dirty&&n(5,o=new URLSearchParams({response_type:"token",show_dialog:!f,client_id:"undefined",scope:"user-read-private playlist-modify-public playlist-modify-private",redirect_uri:r,state:u})),32&t.$$.dirty&&n(2,s=c+o)},[f,r,s,i,a,o,function(){f=this.checked,n(0,f)}]}class at extends H{constructor(t){super(),D(this,t,lt,it,i,{})}}function ct(t){let e,n,o,s,r,i,l,b,y,$,w,x,k,_,j=""!=t[5]&&ut(t);return{c(){e=f("div"),n=f("label"),n.textContent="Playlist Link",o=p(),s=f("input"),r=f("br"),i=p(),l=f("a"),b=f("button"),y=d("Open Playlist "),$=f("i"),w=p(),j&&j.c(),x=m(),g(n,"for","playlist-link"),g(n,"class","label svelte-1pgem8i"),g(s,"name","playlist-link"),g(s,"type","text"),g(s,"class","input svelte-1pgem8i"),g($,"class","fa-brands fa-spotify"),g(b,"class","pure-button-primary svelte-1pgem8i"),g(b,"href",t[3]),g(l,"href",t[3]),g(e,"class","playlist-link")},m(u,f){c(u,e,f),a(e,n),a(e,o),a(e,s),v(s,t[3]),a(e,r),a(e,i),a(e,l),a(l,b),a(b,y),a(b,$),c(u,w,f),j&&j.m(u,f),c(u,x,f),k||(_=h(s,"input",t[11]),k=!0)},p(t,e){8&e&&s.value!==t[3]&&v(s,t[3]),8&e&&g(b,"href",t[3]),8&e&&g(l,"href",t[3]),""!=t[5]?j?j.p(t,e):(j=ut(t),j.c(),j.m(x.parentNode,x)):j&&(j.d(1),j=null)},d(t){t&&(u(e),u(w),u(x)),j&&j.d(t),k=!1,_()}}}function ut(t){let e,n,o,s,r,i;return{c(){e=f("div"),n=f("label"),n.textContent="Missing tracks",o=p(),s=f("textarea"),g(n,"for","failedOutput"),g(n,"class","form-label svelte-1pgem8i"),s.readOnly=!0,g(s,"id","song-output"),g(s,"name","song-output"),g(s,"rows","limit"),g(s,"cols","50"),g(s,"class","svelte-1pgem8i"),g(e,"class","item-output")},m(l,u){c(l,e,u),a(e,n),a(e,o),a(e,s),v(s,t[5]),r||(i=h(s,"input",t[12]),r=!0)},p(t,e){32&e&&v(s,t[5])},d(t){t&&u(e),r=!1,i()}}}function ft(t){let n,o,r,i,l,m,b,y,w,x,k,_,j,P,C,S,E,A,O,T,L,N,M,z,R,B=""!=t[3]&&ct(t);return{c(){var e,s,a,c;n=f("div"),o=f("label"),o.textContent="Playlist Name",r=p(),i=f("input"),l=f("br"),m=p(),b=f("label"),b.textContent="Description",y=p(),w=f("input"),x=f("br"),k=p(),_=f("label"),_.textContent="Visibility",j=p(),P=f("div"),C=f("button"),C.textContent="Public",S=p(),E=f("button"),E.textContent="Private",A=p(),O=f("button"),O.innerHTML='Create Playlist <i class="fa-brands fa-spotify"></i>',T=p(),L=f("p"),N=d(t[4]),M=p(),B&&B.c(),g(o,"class","label svelte-1pgem8i"),g(o,"for","playlist-name"),g(i,"class","input svelte-1pgem8i"),g(i,"name","playlist-name"),g(i,"type","text"),g(b,"class","label svelte-1pgem8i"),g(b,"for","playlist-desc"),g(w,"class","input svelte-1pgem8i"),g(w,"name","playlist-desc"),g(w,"type","text"),g(_,"for","playlist-scope"),g(_,"class","label svelte-1pgem8i"),g(C,"id","public-button"),g(C,"class","toggle-button svelte-1pgem8i"),$(C,"active",t[2]),g(E,"id","private-button"),g(E,"class","toggle-button svelte-1pgem8i"),$(E,"active",!t[2]),g(P,"name","playlist-scope"),g(P,"class","pure-button-group svelte-1pgem8i"),g(P,"role","group"),g(O,"class","pure-button-primary svelte-1pgem8i"),e=L,s="margin",null==(a="10px 0 10px 0")?e.style.removeProperty(s):e.style.setProperty(s,a,c?"important":""),g(n,"class","container svelte-1pgem8i")},m(e,s){c(e,n,s),a(n,o),a(n,r),a(n,i),v(i,t[0]),a(n,l),a(n,m),a(n,b),a(n,y),a(n,w),v(w,t[1]),a(n,x),a(n,k),a(n,_),a(n,j),a(n,P),a(P,C),a(P,S),a(P,E),a(n,A),a(n,O),a(n,T),a(n,L),a(L,N),a(n,M),B&&B.m(n,null),z||(R=[h(i,"input",t[7]),h(w,"input",t[8]),h(C,"click",t[9]),h(E,"click",t[10]),h(O,"click",t[6],{once:!0})],z=!0)},p(t,[e]){1&e&&i.value!==t[0]&&v(i,t[0]),2&e&&w.value!==t[1]&&v(w,t[1]),4&e&&$(C,"active",t[2]),4&e&&$(E,"active",!t[2]),16&e&&function(t,e){e=""+e,t.data!==e&&(t.data=e)}(N,t[4]),""!=t[3]?B?B.p(t,e):(B=ct(t),B.c(),B.m(n,null)):B&&(B.d(1),B=null)},i:e,o:e,d(t){t&&u(n),B&&B.d(),z=!1,s(R)}}}const dt=100;function pt(t,e,n){let o,s;l(t,W,(t=>n(15,o=t))),l(t,V,(t=>n(16,s=t)));let r,i,a="last.fm top "+o.length,c="",u=!0,f="",d="",p=[],m="";async function h(t,e){const n=`https://api.spotify.com/v1/search?q=track:${t=await async function(t){return t.replace(/['{}]/g,"")}(t)}%20artist:${e}&type=track&limit=5`,o=s;let r;return await fetch(n,{method:"GET",headers:{Authorization:"Bearer "+o}}).then((e=>{if(e.ok)return e.json();throw new Error("Track '"+t+"' not found - skipping")})).then((e=>{if(0==e.tracks.items.length)throw console.log(e),new Error("Track '"+t+"' not found - skipping. Response: ");console.log("track_id found: ",e.tracks.items[0].uri),r=e.tracks.items[0].uri})).catch((t=>{console.log(t),r=null})),r}return[a,c,u,f,d,m,async function(){await async function(){n(4,d="Please wait: getting user data...");const t=s;await fetch("https://api.spotify.com/v1/me",{method:"GET",headers:{Authorization:"Bearer "+t}}).then((t=>t.json())).then((t=>{r=t.id}))}(),n(4,d="Please wait: Playlist is being created..."),console.log("creating playlist for user ",r);const t=s,e=await fetch(`https://api.spotify.com/v1/users/${r}/playlists`,{method:"POST",headers:{Authorization:"Bearer "+t},body:JSON.stringify({name:a,public:u,description:c,public:!1})});e.ok?i=await e.json():Q.set(!0),async function(){n(4,d="Please wait: Getting songs...");const t=Math.floor((o.length-1)/dt),e=new Array(Math.floor(t));for(let n=0;n<=t;n++)e[n]=[];for(let t=0;t<o.length;t++){let n=Math.floor(t/dt),s=await h(o[t].name,o[t].artist.name);null!=s?e[n].push(s):p.push(t)}n(4,d="Please wait: Adding songs to playlist...");const r=s,l=`https://api.spotify.com/v1/playlists/${i.id}/tracks`;for(let t=0;t<e.length;t++)await fetch(l,{method:"POST",headers:{Authorization:"Bearer "+r},body:JSON.stringify({uris:e[t]})}).then((t=>{if(t.ok)return t.json();throw new Error("Adding to playlist not successful")})).then((t=>{console.log("add to playlist RESPONSE: ",t)})).catch((t=>{console.log(t),n(4,d="Oh no, something went wrong!")}));if(n(3,f=i.external_urls.spotify),0==p.length)n(4,d="Success!");else{let t="";p.length>1&&(t="s"),""!=m&&n(5,m="");for(let t=0;t<p.length;t++)n(5,m+=p[t]+1+": "),n(5,m+=o[p[t]].artist.name+" - "),n(5,m+=o[p[t]].name+"\r\n");n(4,d="Failed to add "+p.length+" track"+t+" :(")}}()},function(){a=this.value,n(0,a)},function(){c=this.value,n(1,c)},()=>n(2,u=!u),()=>n(2,u=!u),function(){f=this.value,n(3,f)},function(){m=this.value,n(5,m)}]}class mt extends H{constructor(t){super(),D(this,t,pt,ft,i,{})}}function ht(t){let e,n;return e=new mt({}),{c(){U(e.$$.fragment)},m(t,o){G(e,t,o),n=!0},i(t){n||(z(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){I(e,t)}}}function gt(t){let e,n;return e=new ot({}),{c(){U(e.$$.fragment)},m(t,o){G(e,t,o),n=!0},i(t){n||(z(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){I(e,t)}}}function bt(t){let e,n;return e=new at({}),{c(){U(e.$$.fragment)},m(t,o){G(e,t,o),n=!0},i(t){n||(z(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){I(e,t)}}}function vt(t){let e,n,o,r,i,l,d,m,h;const b=[bt,gt,ht],v=[];function y(t,e){return!t[0]||t[1]?0:t[2]?t[0]&&t[2]?2:-1:1}return~(i=y(t))&&(l=v[i]=b[i](t)),{c(){e=f("div"),n=f("div"),n.innerHTML='<h2 style="text-align: center" class="svelte-1a1jwou">last.fm to spotify playlist</h2>',o=p(),r=f("main"),l&&l.c(),d=p(),m=f("footer"),m.innerHTML='<a href="https://github.com/leorehm/lastfm-spotify" target="_blank" class="svelte-1a1jwou"><i class="fa-brands fa-github"></i> Source</a>',g(n,"id","head"),g(r,"id","main"),g(r,"class","svelte-1a1jwou"),g(m,"id","footer"),g(m,"class","svelte-1a1jwou"),g(e,"id","app"),g(e,"class","svelte-1a1jwou")},m(t,s){c(t,e,s),a(e,n),a(e,o),a(e,r),~i&&v[i].m(r,null),a(e,d),a(e,m),h=!0},p(t,[e]){let n=i;i=y(t),i!==n&&(l&&(M={r:0,c:[],p:M},R(v[n],1,1,(()=>{v[n]=null})),M.r||s(M.c),M=M.p),~i?(l=v[i],l||(l=v[i]=b[i](t),l.c()),z(l,1),l.m(r,null)):l=null)},i(t){h||(z(l),h=!0)},o(t){R(l),h=!1},d(t){t&&u(e),~i&&v[i].d()}}}function yt(t,e,n){let o,s,r;return l(t,V,(t=>n(0,o=t))),l(t,Q,(t=>n(1,s=t))),l(t,W,(t=>n(2,r=t))),[o,s,r]}var $t=new class extends H{constructor(t){super(),D(this,t,yt,vt,i,{})}}({target:document.body});return t.LASTFM_API_KEY="test",t.default=$t,Object.defineProperty(t,"__esModule",{value:!0}),t}({});
//# sourceMappingURL=bundle.js.map
