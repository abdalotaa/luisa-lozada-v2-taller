/* Portafolio · Luisa Lozada — dirección 2: taller oscuro */
const IMG = "assets/img/";
const WA = "522213260040";
const waLink = (t) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const enquiry = (it) => `Hola Luisa, me interesa la obra «${it.title}» (${it.series.name}, ${it.series.year}). ¿Me puedes compartir disponibilidad y detalles?`;

const SERIES = [
  {
    id: "despues-del-ruido", name: "Después del ruido", year: "2026", tech: "Resinas y técnicas mixtas",
    blurb: "La emoción de la Fórmula 1 hecha forma, color y materia: la flama que enciende, el corazón que sostiene el movimiento y la curva que guarda la huella de la velocidad.",
    note: "Render de la propuesta de exhibición; medidas indicadas en la ficha.",
    items: [
      { slug: "impulso", title: "Impulso", w: 423, h: 945, cut: 1, small: 1, dims: "Alto 60 cm · ancho 24–27 cm · prof. 22–25 cm", extra: ["Base", "30 × 30 cm"], price: "$48,000 MXN" },
      { slug: "latido", title: "Latido", w: 399, h: 724, cut: 1, small: 1, dims: "Alto 40 cm · ancho 23–26 cm · prof. 20–22 cm", extra: ["Base", "26 × 26 cm"], price: "$42,000 MXN" },
      { slug: "aceleracion", title: "Aceleración", w: 543, h: 951, cut: 1, small: 1, dims: "Alto 60 cm · ancho 28–32 cm · prof. 24–27 cm", extra: ["Base", "32 × 32 cm"], price: "$50,000 MXN" },
    ],
  },
  {
    id: "efimero", name: "Efímero", year: "2025", tech: "Patinas al ácido sobre metal",
    blurb: "Metal fundido y arrojado sobre el lienzo metálico, con el soplete como pincel: una cartografía emocional entre la fugacidad y la permanencia.",
    items: [
      { slug: "efimero-1", title: "Efímero I", w: 832, h: 827 },
      { slug: "efimero-2", title: "Efímero II", w: 841, h: 834 },
      { slug: "efimero-3", title: "Efímero III", w: 832, h: 827 },
      { slug: "efimero-4", title: "Efímero IV", w: 823, h: 826 },
      { slug: "efimero-5", title: "Efímero V", w: 832, h: 831 },
      { slug: "efimero-6", title: "Efímero VI", w: 829, h: 826 },
    ].map((o) => ({ ...o, dims: "29 × 29 cm (49 × 49 cm con marco)" })),
  },
  {
    id: "transmutacion", name: "Transmutación", year: "2025", tech: "Metalurgia",
    blurb: "Superficies de metal que el fuego y la fundición transforman en el registro de un instante irrepetible.",
    items: [
      { slug: "transmutacion-1", title: "Transmutación I", w: 870, h: 874, cut: 1, dims: "21 × 21 cm" },
      { slug: "transmutacion-2", title: "Transmutación II", w: 1529, h: 904, cut: 1, dims: "18 × 35 cm" },
      { slug: "transmutacion-3", title: "Transmutación III", w: 1525, h: 795, cut: 1, dims: "40.5 × 24 cm" },
      { slug: "transmutacion-4", title: "Transmutación IV", w: 1224, h: 1170, cut: 1, dims: "28 × 27 cm" },
      { slug: "transmutacion-5", title: "Transmutación V", w: 1383, h: 947, cut: 1, dims: "18 × 26.5 cm" },
    ],
  },
  {
    id: "resiliencias", name: "Resiliencias", year: "2025", tech: "Técnica mixta",
    blurb: "Troncos hallados en una reserva ecológica de Veracruz, a los que el aluminio, el acrílico, el metal o la cerámica devuelven la voz.",
    items: [
      { slug: "arrecife", title: "Arrecife", w: 1568, h: 1425, cut: 1, dims: "60 × 60 × 28 cm" },
      { slug: "vejez", title: "Vejez", w: 1581, h: 1064, cut: 1, dims: "68 × 44 × 26 cm" },
      { slug: "ecos", title: "Ecos", w: 1589, h: 1128, cut: 1, dims: "79 × 47 × 20 cm" },
      { slug: "efecto-mariposa", title: "Efecto mariposa", w: 1500, h: 1409, cut: 1, dims: "55 × 60 × 30 cm" },
    ],
  },
];

const PAGES = { obras: "Obras", sobre: "Sobre mí", contacto: "Contacto" };
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const pad = (n) => String(n).padStart(2, "0");
const src = (it) => (it.cut ? `${IMG}cut/${it.slug}.webp` : `${IMG}plate-${it.slug}.jpg`);
const ALL = SERIES.flatMap((s) => s.items.map((it) => ({ ...it, series: s })));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = () => matchMedia("(max-width: 860px)").matches;

/* ---------- construcción del carril ---------- */
function build() {
  let n = 0;
  const parts = [`
    <section class="panel hero">
      <div class="hero-bg"></div>
      <div class="hero-in">
        <p class="kicker">Arte contemporáneo · Puebla</p>
        <img class="hero-logo" src="assets/logo/wordmark-light.svg" alt="Luisa Lozada" width="417" height="70">
        <p class="hero-sub">Metal, fuego, resina y madera: piezas con alma.</p>
        <p class="hint"><i></i>Desliza para recorrer la obra</p>
      </div>
    </section>`];

  SERIES.forEach((s, si) => {
    parts.push(`
    <section class="panel chap" id="${s.id}" data-name="${s.name}">
      <span class="chap-n" aria-hidden="true">${pad(si + 1)} / ${pad(SERIES.length)}</span>
      <h2>${s.name}</h2>
      <p class="chap-meta">${s.year} · ${s.tech}</p>
      <p class="chap-blurb">${s.blurb}</p>
      <span class="chap-count">${s.items.length} ${s.items.length === 1 ? "obra" : "obras"}</span>
    </section>`);
    s.items.forEach((it) => {
      const idx = n++;
      const ar = (it.w / it.h).toFixed(4);
      parts.push(`
    <button class="slide ${it.cut ? "cut" : "framed"} ${idx % 2 ? "dn" : "up"}" data-i="${idx}" style="--ar:${ar};${it.small ? "--hmax:50vh;" : ""}" aria-label="${it.title}, ${s.year}">
      <span class="art"><img src="${src(it)}" alt="${it.title}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async"></span>
      <span class="cap"><i>${pad(idx + 1)}</i><b>${it.title}</b><em>${it.dims.split(" · ")[0]}</em></span>
    </button>`);
    });
  });

  parts.push(`
    <section class="panel end">
      <h2>¿Hablamos de <em>una pieza?</em></h2>
      <a class="cta" href="#/contacto">Escribirle a Luisa <i aria-hidden="true">→</i></a>
      <img class="end-tag" src="assets/logo/piezas-con-alma.svg" alt="Piezas con alma" width="422" height="407">
    </section>`);

  $("#rail").innerHTML = parts.join("");
  $("#chaptersList").innerHTML = SERIES.map((s, i) => `<a href="#${s.id}" data-id="${s.id}"><b>${pad(i + 1)}</b>${s.name}</a>`).join("");
}

/* ---------- scroll vertical → carril horizontal ---------- */
const sc = $("#scroller"), rail = $("#rail"), mark = $("#mark"), fill = $("#barFill");
let maxX = 0, cur = 0, target = 0, chapX = [], slideX = [], running = false;

function measure() {
  if (isMobile()) { sc.style.height = ""; maxX = 0; return; }
  maxX = Math.max(0, rail.scrollWidth - innerWidth);
  sc.style.height = `${maxX + innerHeight}px`;
  chapX = $$(".chap").map((c) => c.offsetLeft);
  slideX = $$(".slide").map((s) => ({ el: s, img: $("img", s), cx: s.offsetLeft + s.offsetWidth / 2 }));
  readScroll();
}
function readScroll() {
  if (isMobile()) return;
  target = Math.min(maxX, Math.max(0, scrollY - sc.offsetTop));
}
function tick() {
  if (!running) return;
  cur += (target - cur) * (reduce ? 1 : 0.1);
  if (Math.abs(target - cur) < 0.15) cur = target;
  if (!isMobile()) {
    rail.style.transform = `translate3d(${-cur}px,0,0)`;
    mark.style.transform = `translate3d(${-cur * 0.035}px,0,0)`;
    slideX.forEach(({ img, cx }) => {
      const d = cx - cur - innerWidth / 2;
      if (Math.abs(d) < innerWidth) img.style.transform = `translate3d(${(-d * 0.05).toFixed(1)}px,0,0)`;
    });
    fill.style.transform = `scaleX(${maxX ? cur / maxX : 0})`;
    let on = null;
    chapX.forEach((x, i) => { if (x <= cur + innerWidth * 0.5) on = SERIES[i].id; });
    $$("#chaptersList a").forEach((a) => a.classList.toggle("on", a.dataset.id === on));
  }
  requestAnimationFrame(tick);
}
function start() { if (running) return; running = true; measure(); cur = target; requestAnimationFrame(tick); }
function stop() { running = false; }

function observe() {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.12 });
  $$(".slide").forEach((s) => io.observe(s));
}

function goTo(id) {
  const el = document.getElementById(id);
  const x = isMobile() ? el.getBoundingClientRect().top + scrollY - 70 : sc.offsetTop + el.offsetLeft - innerWidth * 0.06;
  scrollTo({ top: x, behavior: reduce ? "auto" : "smooth" });
}

/* ---------- rutas ---------- */
function route() {
  const h = location.hash.replace(/^#\/?/, "");
  const key = h === "sobre" ? "sobre" : h === "contacto" ? "contacto" : "obras";
  $$(".view").forEach((v) => v.classList.toggle("active", v.id === `view-${key}`));
  document.body.dataset.page = key;
  document.title = key === "obras" ? "Luisa Lozada · Arte contemporáneo" : `${PAGES[key]} · Luisa Lozada`;
  $$("#nav a").forEach((a) => a.classList.toggle("on", a.dataset.k === key));
  mark.style.transform = "";
  scrollTo(0, 0);
  closeLB(false);
  if (key === "obras") { cur = target = 0; start(); } else stop();
}

/* ---------- visor ---------- */
const lb = $("#lb");
let curI = 0, opener = null;
function showLB(i) {
  curI = (i + ALL.length) % ALL.length;
  const it = ALL[curI], s = it.series;
  const img = $("#lbImg");
  img.src = src(it); img.alt = it.title;
  $("#lbSeries").textContent = s.name;
  $("#lbTitle").textContent = it.title;
  $("#lbAsk").href = waLink(enquiry(it));
  $("#lbYear").textContent = `${s.year} · ${s.tech}`;
  const rows = [["Medidas", it.dims], ...(it.extra ? [it.extra] : []), ["Técnica", s.tech], ["Producción", s.year]];
  $("#lbDl").innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("") +
    (it.price ? `<div class="price"><dt>Precio</dt><dd>${it.price}</dd></div>` : "");
  $("#lbNote").textContent = s.note || "";
  $("#lbCount").textContent = `${pad(curI + 1)} / ${pad(ALL.length)}`;
}
function openLB(i, from) { opener = from || null; showLB(i); lb.hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus(); }
function closeLB(restore = true) {
  if (lb.hidden) return;
  lb.hidden = true; document.body.style.overflow = "";
  if (restore && opener) opener.focus({ preventScroll: true });
}

/* ---------- init ---------- */
build();
observe();

$("#rail").addEventListener("click", (e) => { const t = e.target.closest(".slide"); if (t) openLB(+t.dataset.i, t); });
$("#chaptersList").addEventListener("click", (e) => { const a = e.target.closest("a"); if (a) { e.preventDefault(); goTo(a.dataset.id); } });
$("#lbClose").addEventListener("click", () => closeLB());
$("#lbPrev").addEventListener("click", () => showLB(curI - 1));
$("#lbNext").addEventListener("click", () => showLB(curI + 1));

document.addEventListener("keydown", (e) => {
  if (!lb.hidden) {
    if (e.key === "Escape") closeLB();
    else if (e.key === "ArrowLeft") showLB(curI - 1);
    else if (e.key === "ArrowRight") showLB(curI + 1);
    return;
  }
  if (document.body.dataset.page === "obras" && !isMobile() && /^(ArrowRight|ArrowLeft)$/.test(e.key) && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
    e.preventDefault();
    scrollBy({ top: (e.key === "ArrowRight" ? 1 : -1) * innerWidth * 0.5, behavior: reduce ? "auto" : "smooth" });
  }
});
addEventListener("wheel", (e) => {
  if (document.body.dataset.page !== "obras" || isMobile() || !lb.hidden) return;
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); scrollBy(0, e.deltaX); }
}, { passive: false });
addEventListener("scroll", readScroll, { passive: true });
addEventListener("resize", () => { if (running) measure(); });
addEventListener("load", () => { if (running) measure(); });

$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target, note = $("#formNote");
  if (!f.checkValidity()) { note.textContent = "Completa los tres campos, por favor."; return; }
  const d = new FormData(f);
  const body = `${d.get("mensaje")}\n\n— ${d.get("nombre")} (${d.get("correo")})`;
  note.textContent = "Se abrirá WhatsApp con tu mensaje.";
  window.open(waLink(body), "_blank", "noopener");
});

addEventListener("hashchange", () => {
  if (/^#[a-z-]+$/.test(location.hash) && document.getElementById(location.hash.slice(1))) return; // ancla interna
  route();
});
route();
