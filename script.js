const scene=document.getElementById("scene");
const core=document.getElementById("core");
const coreWrap=document.getElementById("coreWrap");
const particles=document.getElementById("particles");
const meterFill=document.getElementById("meterFill");
const percent=document.getElementById("percent");
const status=document.getElementById("status");
const shockwave=document.getElementById("shockwave");
let charge=0,charging=false,last=0,cooldown=false;
for(let i=0;i<42;i++){
 const p=document.createElement("i");p.className="particle";
 p.style.setProperty("--radius",(70+Math.random()*140)+"px");
 p.style.setProperty("--angle",(Math.random()*360)+"deg");
 p.style.setProperty("--duration",(3+Math.random()*6)+"s");
 p.style.setProperty("--delay",(-Math.random()*7)+"s");
 particles.appendChild(p);
}
function setCharge(v){charge=Math.max(0,Math.min(100,v));meterFill.style.width=charge+"%";percent.textContent=Math.round(charge)+"%"}
function begin(){if(cooldown)return;charging=true;scene.classList.add("charging");status.textContent="CHARGING"}
function end(){charging=false;scene.classList.remove("charging");if(charge<100)status.textContent="TOUCH TO CHARGE"}
function burst(){
 cooldown=true;charging=false;scene.classList.remove("charging");status.textContent="CORE OVERLOAD";
 const r=coreWrap.getBoundingClientRect();shockwave.style.left=(r.left+r.width/2-10)+"px";shockwave.style.top=(r.top+r.height/2-10)+"px";
 shockwave.classList.remove("fire");void shockwave.offsetWidth;shockwave.classList.add("fire");
 core.animate([{transform:"scale(1.45)"},{transform:"scale(.72)"},{transform:"scale(1)"}],{duration:600,easing:"cubic-bezier(.2,.8,.2,1)"});
 setTimeout(()=>{setCharge(0);status.textContent="TOUCH TO CHARGE";cooldown=false},850)
}
function loop(t){if(!last)last=t;const dt=Math.min(50,t-last);last=t;if(charging&&!cooldown){setCharge(charge+dt*.055);if(charge>=100)burst()}requestAnimationFrame(loop)}
requestAnimationFrame(loop);
scene.addEventListener("pointerdown",begin);
window.addEventListener("pointerup",end);
window.addEventListener("pointercancel",end);
window.addEventListener("blur",end);