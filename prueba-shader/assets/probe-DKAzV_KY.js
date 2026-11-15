import{W as dt,f as nt,N as yt,S as pt,O as ht,a as G,i as xt,_ as gt,M as vt,l as Mt,D as ot,k as D,x as L,p as Gt,$ as wt,U as St,a0 as bt}from"./opentype-CkibRBCm.js";const Et=`
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,At=`
precision highp float;

uniform vec2 uRes;
uniform float uPR;
uniform float uFit;
uniform sampler2D uG0;
uniform sampler2D uG1;
uniform sampler2D uG2;
uniform sampler2D uG3;
uniform sampler2D uG4;
uniform sampler2D uG5;
uniform sampler2D uG6;
uniform sampler2D uG7;
uniform vec2 uO[8];
uniform vec2 uS[8];
uniform vec2 uA[16];
uniform vec2 uB[16];
uniform float uR[16];
uniform sampler2D uMatcap;

out vec4 fragColor;

const float BEVEL = 6.0;
const float SK = 8.0;
const float RANGE = 128.0;
const vec3 GOLD = vec3(0.671, 0.445, 0.112);
const vec3 BG = vec3(0.0034, 0.0052, 0.0144);

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float capsule(vec2 p, vec2 a, vec2 b, float r) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-4), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

float glyph(sampler2D tex, vec2 p, vec2 origin, vec2 size) {
  vec2 q = (p - origin) / max(size, vec2(1.0));
  float sd = (texture(tex, clamp(q, 0.0, 1.0)).r - 0.5) * (RANGE * 2.0);
  vec2 box = max(abs(q - 0.5) - 0.5, 0.0) * size;
  return sd + length(box);
}

float scene(vec2 p) {
  float d = glyph(uG0, p, uO[0], uS[0]);
  d = smin(d, glyph(uG1, p, uO[1], uS[1]), SK);
  d = smin(d, glyph(uG2, p, uO[2], uS[2]), SK);
  d = smin(d, glyph(uG3, p, uO[3], uS[3]), SK);
  d = smin(d, glyph(uG4, p, uO[4], uS[4]), SK);
  d = smin(d, glyph(uG5, p, uO[5], uS[5]), SK);
  d = smin(d, glyph(uG6, p, uO[6], uS[6]), SK);
  d = smin(d, glyph(uG7, p, uO[7], uS[7]), SK);
  for (int i = 0; i < 16; i++) {
    d = smin(d, capsule(p, uA[i], uB[i], uR[i]), SK);
  }
  return d;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / (uPR * uFit);
  float d = scene(p);
  vec2 e = vec2(2.4, 0.0);
  float dx = scene(p + e.xy) - scene(p - e.xy);
  float dy = scene(p + e.yx) - scene(p - e.yx);
  float face = clamp(-d / BEVEL, 0.0, 1.0);
  vec3 n = normalize(vec3(dx, dy, 18.0 * (0.25 + face)));
  vec3 env = texture(uMatcap, clamp(n.xy * 0.48 + 0.5, 0.0, 1.0)).rgb;
  float ndl = clamp(dot(n, normalize(vec3(-0.25, 0.55, 0.8))), 0.0, 1.0);
  float rim = pow(1.0 - clamp(n.z, 0.0, 1.0), 1.15);
  vec3 col = GOLD * (0.78 + 0.4 * ndl) + env * rim * 0.35;
  float aa = max(fwidth(d), 0.8);
  float mask = 1.0 - smoothstep(-aa, aa, d);
  fragColor = vec4(mix(BG, col, mask), 1.0);
}
`,Ft="OBSERVA.",at=150,I=28,x=8,W=128,S=8,Y=16,it=document.getElementById("root");if(!it)throw new Error("falta #root");const R=it,v=new dt({antialias:!1,alpha:!1,powerPreference:"high-performance"});v.outputColorSpace=nt;v.toneMapping=yt;v.setClearColor(725024,1);R.appendChild(v.domElement);const k=new pt,j=new ht(-1,1,1,-1,0,1),rt=Array.from({length:S},()=>new G),st=Array.from({length:S},()=>new G),K=Array.from({length:Y},()=>new G),N=Array.from({length:Y},()=>new G),U=new Float32Array(Y),B=new xt({glslVersion:gt,vertexShader:Et,fragmentShader:At,depthTest:!1,depthWrite:!1,uniforms:{uRes:{value:new G(1,1)},uPR:{value:1},uFit:{value:1},uG0:{value:null},uG1:{value:null},uG2:{value:null},uG3:{value:null},uG4:{value:null},uG5:{value:null},uG6:{value:null},uG7:{value:null},uO:{value:rt},uS:{value:st},uA:{value:K},uB:{value:N},uR:{value:U},uMatcap:{value:Bt()}}});k.add(new vt(new Mt(2,2),B));const T=[];let lt=800,ct=160,P="device",ut=!0,$=!1,b=0;const q=document.getElementById("fps"),Q=document.getElementById("ms"),Z=document.getElementById("ratio"),J=document.getElementById("size"),A=document.getElementById("t"),tt=document.getElementById("loop");function Bt(){const t=new Uint8Array(16384);for(let o=0;o<64;o+=1)for(let l=0;l<64;l+=1){const i=l/63-.5,r=o/63-.5,s=Math.min(1,Math.hypot(i,r)*2),m=Math.max(0,1-Math.hypot(i+.18,r-.22)*2.4),n=(1-s*.55)*.75+m*.45,u=(o*64+l)*4;t[u]=Math.round(Math.min(255,214*n+40*m)),t[u+1]=Math.round(Math.min(255,178*n+24*m)),t[u+2]=Math.round(Math.min(255,94*n+8*m)),t[u+3]=255}const a=new ot(t,64,64);return a.colorSpace=nt,a.magFilter=D,a.minFilter=D,a.wrapS=L,a.wrapT=L,a.needsUpdate=!0,a}function z(e,t,a){const o=e[e.length-1];o&&Math.abs(o.x-t)<.001&&Math.abs(o.y-a)<.001||e.push({x:t,y:a})}function Rt(e,t,a){const o=a.x-t.x,l=a.y-t.y,i=Math.hypot(o,l);return i<1e-6?Math.hypot(e.x-t.x,e.y-t.y):Math.abs(o*(t.y-e.y)-l*(t.x-e.x))/i}function g(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function E(e,t,a){const o=t[0],l=t[t.length-1];let i=!1;for(let f=1;f<t.length-1;f+=1)Rt(t[f],o,l)>.35&&(i=!0);if(!i||a>10){z(e,l.x,l.y);return}if(t.length===3){const f=g(t[0],t[1]),d=g(t[1],t[2]),y=g(f,d);E(e,[t[0],f,y],a+1),E(e,[y,d,t[2]],a+1);return}const r=g(t[0],t[1]),s=g(t[1],t[2]),m=g(t[2],t[3]),n=g(r,s),u=g(s,m),c=g(n,u);E(e,[t[0],r,n,c],a+1),E(e,[c,u,m,t[3]],a+1)}function It(e,t,a,o,l){const i=t.getPath(a,o,l,{},e),r=[];let s=null,m=null;for(const n of i.commands)if(n.type==="M")s=[],m={x:n.x,y:n.y},r.push(s),z(s,m.x,m.y);else if(n.type==="Z")s&&m&&z(s,m.x,m.y);else if(s){if(n.type==="L")z(s,n.x,n.y);else if(n.type==="Q"){const u=s[s.length-1];E(s,[u,{x:n.x1,y:n.y1},{x:n.x,y:n.y}],0)}else if(n.type==="C"){const u=s[s.length-1];E(s,[u,{x:n.x1,y:n.y1},{x:n.x2,y:n.y2},{x:n.x,y:n.y}],0)}}else continue;return r.filter(n=>n.length>=3)}function C(e){const t=e.length,a=new Float64Array(t),o=new Int32Array(t),l=new Float64Array(t+1);let i=0;o[0]=0,l[0]=-1/0,l[1]=1/0;for(let r=1;r<t;r+=1){let s=(e[r]+r*r-(e[o[i]]+o[i]*o[i]))/(2*r-2*o[i]);for(;s<=l[i];)i-=1,s=(e[r]+r*r-(e[o[i]]+o[i]*o[i]))/(2*r-2*o[i]);i+=1,o[i]=r,l[i]=s,l[i+1]=1/0}i=0;for(let r=0;r<t;r+=1){for(;l[i+1]<r;)i+=1;const s=r-o[i];a[r]=s*s+e[o[i]]}return a}function Ct(e,t,a,o,l){const i=new Uint8Array(o*l),r=[];for(let s=0;s<l;s+=1){const m=a+(s+.5)/x;r.length=0;for(const c of e){const f=c.length;for(let d=0;d<f;d+=1){const y=c[d],M=c[(d+1)%f],p=M.y-y.y;p!==0&&(y.y<=m&&M.y>m?r.push({x:y.x+(m-y.y)/p*(M.x-y.x),dir:1}):M.y<=m&&y.y>m&&r.push({x:y.x+(m-y.y)/p*(M.x-y.x),dir:-1}))}}r.sort((c,f)=>c.x-f.x);let n=0,u=0;for(const c of r){if(n!==0){const f=Math.max(0,Math.ceil((u-t)*x-.5)),d=Math.min(o,Math.ceil((c.x-t)*x-.5));i.fill(1,s*o+f,s*o+Math.max(f,d))}n+=c.dir,u=c.x}}return i}function Ot(e,t,a){const l=new Float64Array(t*a),i=new Float64Array(Math.max(t,a)),r=new Float32Array(t*a);for(let n=0;n<a;n+=1){for(let u=0;u<t;u+=1)i[u]=e[n*t+u]?1e15:0;l.set(C(i.subarray(0,t)),n*t)}const s=new Float64Array(a);for(let n=0;n<t;n+=1){for(let c=0;c<a;c+=1)s[c]=l[c*t+n];const u=C(s);for(let c=0;c<a;c+=1)r[c*t+n]=Math.sqrt(u[c])}for(let n=0;n<a;n+=1){for(let u=0;u<t;u+=1)i[u]=e[n*t+u]?0:1e15;l.set(C(i.subarray(0,t)),n*t)}const m=new Float32Array(t*a);for(let n=0;n<t;n+=1){for(let c=0;c<a;c+=1)s[c]=l[c*t+n];const u=C(s);for(let c=0;c<a;c+=1){const f=c*t+n;m[f]=e[f]?-(r[f]||.5):Math.sqrt(u[c])||.5}}return m}function zt(e,t,a){const o=It(e,t,a,0,at);let l=1/0,i=1/0,r=-1/0,s=-1/0;for(const w of o)for(const h of w)h.x<l&&(l=h.x),h.y<i&&(i=h.y),h.x>r&&(r=h.x),h.y>s&&(s=h.y);Number.isFinite(l)||(l=a,r=a+8,i=0,s=8);const m=l-I,n=i-I,u=Math.max(2,Math.ceil(r-l+I*2)),c=Math.max(2,Math.ceil(s-i+I*2)),f=Ct(o,m,n,u*x,c*x),d=Ot(f,u*x,c*x),y=new Uint8Array(u*c),M=x/2-1;for(let w=0;w<c;w+=1)for(let h=0;h<u;h+=1){const ft=d[(w*x+M)*u*x+(h*x+M)]/x,mt=Math.round(Math.max(-W,Math.min(W,ft))/W*.5*255+127.5);y[w*u+h]=mt}const p=new ot(y,u,c,wt,St);return p.colorSpace=bt,p.flipY=!1,p.magFilter=D,p.minFilter=D,p.wrapS=L,p.wrapT=L,p.generateMipmaps=!1,p.needsUpdate=!0,{texture:p,origin:new G(m,n),size:new G(u,c),cx:(l+r)/2,base:i}}function Dt(e){const t=Gt(e);t.variation?.set({wght:700});let o=0,l=null;const i=["uG0","uG1","uG2","uG3","uG4","uG5","uG6","uG7"];for(const f of Ft){const d=t.charToGlyph(f);l&&(o+=t.getKerningValue(l,d));const y=zt(t,d,o*at/t.unitsPerEm);T.push(y),o+=d.advanceWidth??0,l=d}let r=1/0,s=1/0,m=-1/0,n=-1/0;for(const f of T)r=Math.min(r,f.origin.x),s=Math.min(s,f.origin.y),m=Math.max(m,f.origin.x+f.size.x),n=Math.max(n,f.origin.y+f.size.y);const u=(r+m)/2,c=(s+n)/2;lt=m-r,ct=n-s,T.forEach((f,d)=>{f.origin.x-=u,f.origin.y-=c,f.cx-=u,f.base-=c,rt[d].copy(f.origin),st[d].copy(f.size),B.uniforms[i[d]].value=f.texture})}function X(e){for(let t=0;t<S;t+=1){const a=-2400+e*4800+t*36,o=-180+Math.sin(e*Math.PI+t*.4)*220;K[t].set(a,o),N[t].set(a,o),U[t]=9,K[t+S].set(a-70,o-36),N[t+S].set(a+24,o+48),U[t+S]=3.5}}function Lt(){return P==="device"?window.devicePixelRatio||1:Number(P)}function Pt(){const e=R.clientWidth||window.innerWidth,t=R.clientHeight||window.innerHeight;return Math.min(e*.9/lt,t*.52/ct)}function _(){const e=Lt(),t=R.clientWidth||window.innerWidth,a=R.clientHeight||window.innerHeight;v.setPixelRatio(e),v.setSize(t,a,!1);const o=v.domElement;o.style.width=`${t}px`,o.style.height=`${a}px`,B.uniforms.uRes.value.set(o.width,o.height),B.uniforms.uPR.value=e,B.uniforms.uFit.value=Pt(),Z&&(Z.textContent=e.toFixed(2)),J&&(J.textContent=`${o.width}×${o.height}`);for(const l of document.querySelectorAll("button[data-pr]"))l.setAttribute("aria-pressed",l.dataset.pr===P?"true":"false")}function qt(e,t){q&&(q.textContent=e.toFixed(1)),Q&&(Q.textContent=t.toFixed(2))}let F=0,O=0,H=performance.now(),et=!1;function V(e){const t=e-H;if(H=e,!et){et=!0,v.render(k,j),requestAnimationFrame(V);return}F+=t,O+=1,F>=1e3&&(qt(O*1e3/F,F/O),F=0,O=0),ut&&!$&&(b=(b+t/2100)%1,A&&(A.value=b.toFixed(3))),X(b),v.render(k,j),requestAnimationFrame(V)}A?.addEventListener("pointerdown",()=>{$=!0});A?.addEventListener("pointerup",()=>{$=!1});A?.addEventListener("input",()=>{b=Number(A.value),X(b)});tt?.addEventListener("change",()=>{ut=tt.checked});for(const e of document.querySelectorAll("button[data-pr]"))e.addEventListener("click",()=>{const t=e.dataset.pr;(t==="1"||t==="1.5"||t==="2"||t==="device")&&(P=t),_()});window.addEventListener("resize",_);fetch("/fonts/PlayfairDisplay.ttf").then(e=>{if(!e.ok)throw new Error(`fuente ${e.status}`);return e.arrayBuffer()}).then(e=>{Dt(e),X(0),_(),H=performance.now(),requestAnimationFrame(V)}).catch(e=>{const t=e instanceof Error?e.message:"fuente";q&&(q.textContent=t)});
