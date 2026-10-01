const stars=document.getElementById("stars");
const box=document.getElementById("box");
const person=document.getElementById("person");
const caption=document.getElementById("caption");
for(let i=0;i<46;i++){const s=document.createElement("i");s.className="star";s.style.left=Math.random()*100+"%";s.style.top=Math.random()*63+"%";s.style.animationDelay=(-Math.random()*2.5)+"s";s.style.transform="scale("+(0.5+Math.random()*1.4)+")";stars.appendChild(s)}
box.addEventListener("animationend",e=>{if(e.animationName==="boxDrop"){caption.textContent="LANDED";setTimeout(()=>caption.textContent="STANDING BY",650)}});
person.addEventListener("animationend",e=>{if(e.animationName==="personEnter")caption.textContent="READY"});