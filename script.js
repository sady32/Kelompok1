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

// Partikel Neon Interaktif
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = { x: null, y: null };
let virtualNode = { x: null, y: null, angle: 0, radius: 80 };
let scrollOffset = 0;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  if (!mouse.x && !mouse.y) {
    virtualNode.x = canvas.width / 2;
    virtualNode.y = canvas.height / 2;
  }
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

window.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
window.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

window.addEventListener("scroll", () => {
  scrollOffset = window.scrollY * 0.2;
  document.querySelector(".hero-section").style.backgroundPosition = `center ${scrollOffset}px`;
});

const colors = [
  "rgba(0, 255, 255, 0.8)",
  "rgba(255, 0, 255, 0.8)",
  "rgba(0, 255, 128, 0.8)",
  "rgba(255, 255, 0, 0.8)",
  "rgba(0, 128, 255, 0.8)"
];

for (let i = 0; i < 70; i++) {
  const depth = Math.random();
  particles.push({
    baseX: Math.random() * canvas.width,
    baseY: Math.random() * canvas.height,
    x: 0, y: 0,
    r: 1 + depth * 4,
    dx: (Math.random() - 0.5) * (0.2 + depth * 0.8),
    dy: (Math.random() - 0.5) * (0.2 + depth * 0.8),
    blur: 4 + depth * 12,
    color: colors[Math.floor(Math.random() * colors.length)],
    depth,
    opacity: Math.random(),
    fadeSpeed: 0.005 + Math.random() * 0.01
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!mouse.x && !mouse.y) {
    virtualNode.angle += 0.01;
    virtualNode.x = canvas.width/2 + Math.cos(virtualNode.angle)*virtualNode.radius;
    virtualNode.y = canvas.height/2 + Math.sin(virtualNode.angle)*virtualNode.radius;
  }
  particles.forEach(p => {
    p.x = p.baseX + p.dx * 50 + scrollOffset * 0.3 * p.depth;
    p.y = p.baseY + p.dy * 50 + scrollOffset * 0.2 * p.depth;
    p.opacity += p.fadeSpeed;
    if (p.opacity > 1 || p.opacity < 0) p.fadeSpeed *= -1;
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.shadowBlur = p.blur;
    ctx.shadowColor = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = 1;
    p.baseX += p.dx; p.baseY += p.dy;
    if (p.baseX < 0 || p.baseX > canvas.width) p.dx *= -1;
    if (p.baseY < 0 || p.baseY > canvas.height) p.dy *= -1;
    const nodeX = mouse.x || virtualNode.x;
    const nodeY = mouse.y || virtualNode.y;
    if (nodeX
