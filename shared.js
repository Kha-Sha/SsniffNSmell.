/* ═══════════════════════════════════════════════
   SSNIFF N SMELL — Shared JavaScript
   ═══════════════════════════════════════════════ */

// ── CURSOR
const cur = document.getElementById('cur');
const cring = document.getElementById('cring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cur.style.left=mx+'px'; cur.style.top=my+'px';
});
(function loop(){
  rx+=(mx-rx)*.13; ry+=(my-ry)*.13;
  cring.style.left=rx+'px'; cring.style.top=ry+'px';
  requestAnimationFrame(loop);
})();
function attachHover(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => cring.classList.add('h'));
    el.addEventListener('mouseleave', () => cring.classList.remove('h'));
  });
}
attachHover('a, button, .pc, .dcard, .sz, .fBtn, .si, .rc, .tc, .scc, .sample-row');

// ── SCROLL PROGRESS + NAV
const sp = document.getElementById('sp');
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - innerHeight);
  if(sp) sp.style.transform = `scaleX(${pct})`;
  if(nav) nav.classList.toggle('sc', window.scrollY > 50);
});

// ── INTERSECTION OBSERVER
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.08 });
document.querySelectorAll('.rv, .rvl, .rvr, .stg, .scc').forEach(el => io.observe(el));

// ── 3D CARD TILT
document.querySelectorAll('.pc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width/2, cy = r.height/2;
    card.style.transform = `perspective(800px) rotateX(${((y-cy)/cy)*-6}deg) rotateY(${((x-cx)/cx)*6}deg) translateZ(10px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)';
  });
});

// ── DETAIL PANEL
function openDetail(id) {
  if(!window.PRODUCTS || !window.PRODUCTS[id]) return;
  const p = window.PRODUCTS[id];
  document.getElementById('d-name').textContent = p.name;
  document.getElementById('d-cat').textContent = p.cat;
  document.getElementById('d-insp').innerHTML = p.insp;
  const img = document.getElementById('d-img');
  img.src = p.img; img.alt = p.name;
  document.getElementById('d-desc').textContent = p.desc;
  document.getElementById('d-buy').href = p.url;
  document.getElementById('d-glow').style.background =
    `radial-gradient(ellipse, color-mix(in srgb, ${p.ac} 28%, transparent), transparent 72%)`;
  document.getElementById('d-sizes').innerHTML = p.sz.map((s,i) =>
    `<button class="sz ${i===0?'on':''}" onclick="selSz(this)">${s.ml}<span class="szp">${s.p}</span></button>`
  ).join('');
  document.getElementById('d-notes').innerHTML = p.notes.map(n =>
    `<div class="ni"><span class="nit">${n.t} Notes</span><p class="niv">${n.v}</p></div>`
  ).join('');
  const panel = document.getElementById('detailPanel');
  panel.classList.add('open');
  document.body.style.overflow = 'hidden';
  panel.scrollTop = 0;
}
function closeDetail() {
  document.getElementById('detailPanel').classList.remove('open');
  document.body.style.overflow = '';
}
function selSz(btn) {
  document.querySelectorAll('.sz').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
}
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeDetail(); });
