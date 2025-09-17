// Modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
  const video = modal.querySelector('video');
  if (video) video.play();
}
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
  const video = modal.querySelector('video');
  if (video) { video.pause(); video.currentTime = 0; }
}
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => { if (event.target == modal) closeModal(modal.id); });
}

// Partikel Ringan
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = { x: null, y: null };
let virtualNode = { x: null, y: null, angle: 0, radius: 80 };
function resizeCanvas() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; if (!mouse.x && !mouse.y) { virtualNode.x = canvas.width/2; virtualNode.y = canvas.height/2; } }
window.addEventListener("resize", resizeCanvas); resizeCanvas();
window.addEventListener("mousemove", e => { const rect = canvas.getBoundingClientRect(); mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top; });
window.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });
const colors = ["rgba(0,255,255,0.8)","rgba(255,0,255,0.8)","rgba(0,255,128,0.8)","rgba(255,255,0,0.8)","rgba(0,128,255,0.8)"];
for (let i = 0; i < 40; i++) { const d=Math.random(); particles.push({baseX:Math.random()*canvas.width, baseY:Math.random()*canvas.height, x:0,y:0, r:1+d*3, dx:(Math.random()-0.5)*(0.1+d*0.5), dy:(Math.random()-0.5)*(0.1+d*0.5), blur:2+d*6, color:colors[Math.floor(Math.random()*colors.length)], depth:d, opacity:Math.random(), fadeSpeed:0.004+Math.random()*0.006}); }
function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (!mouse.x && !mouse.y) { virtualNode.angle+=0.01; virtualNode.x=canvas.width/2+Math.cos(virtualNode.angle)*virtualNode.radius; virtualNode.y=canvas.height/2+Math.sin(virtualNode.angle)*virtualNode.radius; }
  particles.forEach(p=>{ p.x=p.baseX+p.dx*30; p.y=p.baseY+p.dy*30; p.opacity+=p.fadeSpeed; if(p.opacity>1||p.opacity<0)p.fadeSpeed*=-1; ctx.beginPath(); ctx.fillStyle=p.color; ctx.globalAlpha=p.opacity; ctx.shadowBlur=p.blur; ctx.shadowColor=p.color; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1; p.baseX+=p.dx; p.baseY+=p.dy; if(p.baseX<0||p.baseX>canvas.width)p.dx*=-1; if(p.baseY<0||p.baseY>canvas.height)p.dy*=-1; const nodeX=mouse.x||virtualNode.x, nodeY=mouse.y||virtualNode.y; if(nodeX&&nodeY){ const dx=p.x-nodeX, dy=p.y-nodeY, dist=Math.sqrt(dx*dx+dy*dy); if(dist<100){ p.baseX-=dx*0.004*p.depth; p.baseY-=dy*0.004*p.depth; } } });
  requestAnimationFrame(animate);
}
animate();

// Efek tilt pada card
document.querySelectorAll('.member-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    card.style.transform = `rotateY(${x/25}deg) rotateX(${-y/25}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = 'rotateY(0) rotateX(0) scale(1)'; });
});
