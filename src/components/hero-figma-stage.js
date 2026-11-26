/* ==========================================================================
   Authentic Figma UI3 Interactive Live Workspace
   - Matches real Figma UI3: Top file tabs, Left Pages+Layers, Flat #1E1E1E
     canvas with Top & Left Pixel Rulers, Floating Bottom Tool Dock, and
     Live-Updating Right Design Inspector.
   - Real human-like curved Bezier cursor motion (hover -> pause -> click ->
     select -> inspect) + Interactive Multiplayer "Guest" cursor where visitors
     can hover & click real components themselves.
   ========================================================================== */

const TARGETS = [
  {
    id: "kpi-sales",
    layerId: "layer-sales",
    name: "KPI / Total Sales",
    box: { left: 7.7, top: 14.2, width: 16.5, height: 21.8 },
    cursorAim: { x: 16.5, y: 25.5 },
    inspector: { x: 112, y: 128, w: 248, h: 148, r: 16, fillHex: "#165EF6", fillName: "blue/500" },
    dim: "248 × 148",
    showGuide: false,
  },
  {
    id: "kpi-orders",
    layerId: "layer-orders",
    name: "KPI / Total Orders",
    box: { left: 24.9, top: 14.2, width: 16.0, height: 21.8 },
    cursorAim: { x: 33.0, y: 25.0 },
    inspector: { x: 376, y: 128, w: 240, h: 148, r: 16, fillHex: "#101217", fillName: "surface/900" },
    dim: "240 × 148",
    showGuide: true,
  },
  {
    id: "table-recent",
    layerId: "layer-table",
    name: "Table / Recent Sales",
    box: { left: 7.7, top: 43.5, width: 65.0, height: 49.4 },
    cursorAim: { x: 40.5, y: 67.0 },
    inspector: { x: 112, y: 312, w: 936, h: 420, r: 16, fillHex: "#0D0F14", fillName: "surface/950" },
    dim: "936 × 420",
    showGuide: false,
  },
  {
    id: "chart-expert",
    layerId: "layer-chart",
    name: "Chart / Sales Expert",
    box: { left: 73.5, top: 43.5, width: 23.7, height: 49.4 },
    cursorAim: { x: 84.5, y: 69.0 },
    inspector: { x: 1064, y: 312, w: 342, h: 420, r: 16, fillHex: "#165EF6", fillName: "chart/accent" },
    dim: "342 × 420",
    showGuide: false,
  },
];

export function renderHeroFigmaStage() {
  return `
    <div class="figma-ui3" id="figma-stage" dir="ltr" aria-label="Interactive Figma UI3 workspace showing Alireza designing the Dashify dashboard">
      <!-- Real Figma Desktop / Browser Top Tab Bar -->
      <div class="fg-tabbar">
        <div class="fg-traffic" aria-hidden="true">
          <span class="fg-dot fg-dot--red"></span>
          <span class="fg-dot fg-dot--yellow"></span>
          <span class="fg-dot fg-dot--green"></span>
        </div>

        <div class="fg-tabs" aria-hidden="true">
          <span class="fg-home-ico" title="Home">⌂</span>
          <span class="fg-tab fg-tab--active">
            <i class="fg-tab-dot"></i>
            <span>Dashify — Overview</span>
            <em>×</em>
          </span>
          <span class="fg-tab">IranServer DS</span>
          <span class="fg-tab">Farano Console</span>
          <span class="fg-tab-add">+</span>
        </div>
      </div>

      <!-- Figma UI3 3-Column Body -->
      <div class="fg-body">
        <!-- Left Panel: File + Pages + Layers -->
        <aside class="fg-left" aria-hidden="true">
          <div class="fg-file-head">
            <div>
              <div class="fg-file-name">Dashify — Overview ▾</div>
              <div class="fg-file-sub">Design System · Drafts</div>
            </div>
          </div>

          <div class="fg-section-head">
            <span>Pages</span>
            <span>+</span>
          </div>
          <div class="fg-page fg-page--active">Final Design</div>
          <div class="fg-page">Components</div>
          <div class="fg-page">Design Tokens</div>

          <div class="fg-section-head" style="margin-top:10px;">
            <span>Layers</span>
          </div>
          <div class="fg-layer fg-layer--frame">▾ # Desktop — 1440</div>
          <div class="fg-layer fg-layer--child">◫ Navigation Rail</div>
          <div class="fg-layer fg-layer--comp" id="layer-sales">❖ KPI / Total Sales</div>
          <div class="fg-layer fg-layer--comp" id="layer-orders">❖ KPI / Total Orders</div>
          <div class="fg-layer fg-layer--comp">❖ KPI / Visitor &amp; Sold</div>
          <div class="fg-layer fg-layer--comp" id="layer-table">❖ Table / Recent Sales</div>
          <div class="fg-layer fg-layer--comp" id="layer-chart">❖ Chart / Sales Expert</div>
        </aside>

        <!-- Center Flat #1E1E1E Canvas with Top & Left Pixel Rulers + Bottom UI3 Dock -->
        <div class="fg-canvas-shell">
          <!-- Top Pixel Ruler -->
          <div class="fg-ruler-top" aria-hidden="true">
            <span>0</span><span>250</span><span>500</span><span>750</span><span>1000</span><span>1250</span><span>1500</span>
          </div>

          <div class="fg-canvas-row">
            <!-- Left Pixel Ruler -->
            <div class="fg-ruler-left" aria-hidden="true">
              <span>0</span><span>200</span><span>400</span><span>600</span><span>800</span>
            </div>

            <!-- Interactive Canvas Area -->
            <div class="fg-canvas" id="figma-canvas">
              <!-- Visitor Multiplayer "Guest" Cursor -->
              <div class="fg-guest-cursor" id="figma-guest-cursor" aria-hidden="true">
                <svg width="17" height="19" viewBox="0 0 16 18" fill="none">
                  <path d="M1.5 1.5L6.3 15.6L8.7 9.8L14.5 7.6L1.5 1.5Z" fill="#0ACF83" stroke="#FFFFFF" stroke-width="1.35" stroke-linejoin="round"/>
                </svg>
                <span class="fg-guest-tag">Guest</span>
              </div>

              <!-- Artboard Container -->
              <div class="fg-artboard-block">
                <div class="fg-artboard-label">❖ Dashify / Overview — Desktop 1440</div>

                <div class="fg-artboard" id="fg-artboard">
                  <img
                    class="fg-artboard-img"
                    src="/assets/dashify-clean-artboard.png"
                    alt="Dashify dark analytics dashboard design inside Figma canvas"
                    width="889"
                    height="502"
                    fetchpriority="high"
                  />

                  <!-- Interactive Hit Targets (exact percentages on 889x502 clean artboard) -->
                  ${TARGETS.map(
                    (t) => `
                    <div
                      class="fg-hotspot"
                      data-target-id="${t.id}"
                      style="left:${t.box.left}%;top:${t.box.top}%;width:${t.box.width}%;height:${t.box.height}%;"
                    ></div>
                  `
                  ).join("")}

                  <!-- Hover Outline (Thin #0D99FF without handles, like real Figma hover) -->
                  <div class="fg-hover-box" id="fg-hover-box" aria-hidden="true"></div>

                  <!-- Active Selection Bounding Box (with 4 white corner handles + exact dimension badge) -->
                  <div class="fg-select-box" id="fg-select-box" aria-hidden="true">
                    <i class="fg-h tl"></i><i class="fg-h tr"></i><i class="fg-h bl"></i><i class="fg-h br"></i>
                    <span class="fg-dim-pill" id="fg-dim-pill">248 × 148</span>
                  </div>

                  <!-- Red Alt-Measure Smart Guide (between KPI 1 & KPI 2) -->
                  <div class="fg-smart-guide" id="fg-smart-guide" aria-hidden="true">
                    <span class="fg-smart-line"></span>
                    <span class="fg-smart-pill">16</span>
                  </div>

                  <!-- Alireza's Human-Physics Animated Cursor -->
                  <div class="fg-alireza-cursor" id="fg-alireza-cursor" aria-hidden="true">
                    <svg width="17" height="19" viewBox="0 0 16 18" fill="none">
                      <path d="M1.5 1.5L6.3 15.6L8.7 9.8L14.5 7.6L1.5 1.5Z" fill="#0D99FF" stroke="#FFFFFF" stroke-width="1.35" stroke-linejoin="round"/>
                    </svg>
                    <span class="fg-alireza-tag">Alireza</span>
                  </div>
                </div>
              </div>

              <!-- Real Figma UI3 Floating Bottom Tool Dock -->
              <div class="fg-bottom-dock" aria-hidden="true">
                <span class="fg-dock-btn fg-dock-btn--active" title="Move (V)">↖</span>
                <span class="fg-dock-btn" title="Frame (F)">#</span>
                <span class="fg-dock-btn" title="Shape (R)">▭</span>
                <span class="fg-dock-btn" title="Pen (P)">✒</span>
                <span class="fg-dock-btn" title="Text (T)">T</span>
                <span class="fg-dock-btn" title="Comment (C)">💬</span>
                <span class="fg-dock-btn" title="Components">❖</span>
                <span class="fg-dock-sep"></span>
                <span class="fg-dock-dev">&lt;/&gt;</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Design Inspector (Live-updating values) -->
        <aside class="fg-right" aria-hidden="true">
          <div class="fg-right-top">
            <div class="fg-avatars">
              <span class="fg-av fg-av--guest" id="figma-guest-avatar">G</span>
              <span class="fg-av fg-av--owner">AF</span>
            </div>
            <div class="fg-right-actions">
              <span class="fg-play-btn">▷</span>
              <span class="fg-share-btn">Share</span>
            </div>
          </div>

          <div class="fg-right-tabs">
            <span class="is-active">Design</span>
            <span>Prototype</span>
            <span class="fg-zoom-val">68% ▾</span>
          </div>

          <div class="fg-insp-block">
            <div class="fg-insp-title" id="insp-name">KPI / Total Sales</div>
            <div class="fg-insp-grid">
              <span>X <em id="insp-x">112</em></span>
              <span>Y <em id="insp-y">128</em></span>
              <span>W <em id="insp-w">248</em></span>
              <span>H <em id="insp-h">148</em></span>
              <span>R <em id="insp-r">16</em></span>
              <span>Op <em>100%</em></span>
            </div>
          </div>

          <div class="fg-insp-block">
            <div class="fg-insp-label">Fill</div>
            <div class="fg-fill-row">
              <span class="fg-swatch" id="insp-swatch" style="background:#165EF6;"></span>
              <span id="insp-fill-hex">#165EF6</span>
              <em id="insp-fill-name">blue/500</em>
            </div>
          </div>

          <div class="fg-insp-block">
            <div class="fg-insp-label">Auto Layout</div>
            <div class="fg-al-row">
              <span>→ 16</span>
              <span>⊞ 20</span>
            </div>
          </div>

          <div class="fg-insp-block">
            <div class="fg-insp-label">Export</div>
            <div class="fg-export-row">PNG · 2x</div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

/* --- Human-Like Curved Bezier Cursor Engine + Interactive Guest Selection --- */
export function initHeroFigmaStage() {
  const stage = document.getElementById("figma-stage");
  const canvas = document.getElementById("figma-canvas");
  const artboard = document.getElementById("fg-artboard");
  const guestCursor = document.getElementById("figma-guest-cursor");
  const alirezaCursor = document.getElementById("fg-alireza-cursor");
  const hoverBox = document.getElementById("fg-hover-box");
  const selectBox = document.getElementById("fg-select-box");
  const dimPill = document.getElementById("fg-dim-pill");
  const smartGuide = document.getElementById("fg-smart-guide");

  if (!stage || !canvas || !artboard || !alirezaCursor || !selectBox) return;

  const insp = {
    name: document.getElementById("insp-name"),
    x: document.getElementById("insp-x"),
    y: document.getElementById("insp-y"),
    w: document.getElementById("insp-w"),
    h: document.getElementById("insp-h"),
    r: document.getElementById("insp-r"),
    swatch: document.getElementById("insp-swatch"),
    fillHex: document.getElementById("insp-fill-hex"),
    fillName: document.getElementById("insp-fill-name"),
  };

  function applyBox(el, box) {
    el.style.left = `${box.left}%`;
    el.style.top = `${box.top}%`;
    el.style.width = `${box.width}%`;
    el.style.height = `${box.height}%`;
  }

  function showHover(target) {
    if (!hoverBox) return;
    if (!target) {
      hoverBox.classList.remove("is-visible");
      return;
    }
    applyBox(hoverBox, target.box);
    hoverBox.classList.add("is-visible");
  }

  function selectTarget(target) {
    if (!target) return;
    applyBox(selectBox, target.box);
    selectBox.classList.add("is-visible");
    if (dimPill) dimPill.textContent = target.dim;
    if (smartGuide) smartGuide.classList.toggle("is-visible", Boolean(target.showGuide));

    // Sync Left Layers Panel
    TARGETS.forEach((t) => {
      document.getElementById(t.layerId)?.classList.toggle("is-selected", t.id === target.id);
    });

    // Sync Right Inspector Panel
    if (insp.name) insp.name.textContent = target.name;
    if (insp.x) insp.x.textContent = String(target.inspector.x);
    if (insp.y) insp.y.textContent = String(target.inspector.y);
    if (insp.w) insp.w.textContent = String(target.inspector.w);
    if (insp.h) insp.h.textContent = String(target.inspector.h);
    if (insp.r) insp.r.textContent = String(target.inspector.r);
    if (insp.swatch) insp.swatch.style.background = target.inspector.fillHex;
    if (insp.fillHex) insp.fillHex.textContent = target.inspector.fillHex;
    if (insp.fillName) insp.fillName.textContent = target.inspector.fillName;
  }

  // Initial clean selection
  selectTarget(TARGETS[0]);
  alirezaCursor.style.left = `${TARGETS[0].cursorAim.x}%`;
  alirezaCursor.style.top = `${TARGETS[0].cursorAim.y}%`;

  let guestOverrideUntil = 0;

  // Interactive Guest Cursor & Real Click-to-Inspect on Desktop
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (guestCursor && finePointer) {
    canvas.addEventListener("pointerenter", () => {
      canvas.classList.add("is-guest-hover");
      stage.classList.add("is-guest-active");
    });

    canvas.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      guestCursor.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    });

    canvas.addEventListener("pointerleave", () => {
      canvas.classList.remove("is-guest-hover");
      stage.classList.remove("is-guest-active");
      showHover(null);
    });

    canvas.addEventListener("pointerdown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const ping = document.createElement("span");
      ping.className = "fg-click-ping";
      ping.style.left = `${(e.clientX - rect.left).toFixed(1)}px`;
      ping.style.top = `${(e.clientY - rect.top).toFixed(1)}px`;
      canvas.appendChild(ping);
      window.setTimeout(() => ping.remove(), 520);
    });

    // Let Guest hover and click any real Dashify component!
    artboard.querySelectorAll("[data-target-id]").forEach((el) => {
      const target = TARGETS.find((t) => t.id === el.getAttribute("data-target-id"));
      if (!target) return;

      el.addEventListener("pointerenter", () => showHover(target));
      el.addEventListener("pointerleave", () => showHover(null));
      el.addEventListener("pointerdown", () => {
        guestOverrideUntil = Date.now() + 5500;
        showHover(null);
        selectTarget(target);
      });
    });
  }

  // Human-like Curved Bezier Motion for Alireza's Cursor
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let currentIdx = 0;
  let pos = { ...TARGETS[0].cursorAim };

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateCurveTo(dest, durationMs) {
    return new Promise((resolve) => {
      const start = { ...pos };
      // Create an organic curved Bezier control point (human wrist arc)
      const dx = dest.x - start.x;
      const dy = dest.y - start.y;
      const arcOffset = (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 6);
      const ctrl = {
        x: start.x + dx * 0.5 - dy * 0.14 + arcOffset * 0.35,
        y: start.y + dy * 0.5 + dx * 0.12 + arcOffset * 0.35,
      };

      const t0 = performance.now();
      function frame(now) {
        const rawT = Math.min(1, (now - t0) / durationMs);
        const t = easeInOutCubic(rawT);
        const inv = 1 - t;
        pos.x = inv * inv * start.x + 2 * inv * t * ctrl.x + t * t * dest.x;
        pos.y = inv * inv * start.y + 2 * inv * t * ctrl.y + t * t * dest.y;

        alirezaCursor.style.left = `${pos.x.toFixed(2)}%`;
        alirezaCursor.style.top = `${pos.y.toFixed(2)}%`;

        if (rawT < 1) {
          requestAnimationFrame(frame);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(frame);
    });
  }

  const sleep = (ms) => new Promise((r) => window.setTimeout(r, ms));

  async function runHumanDesignLoop() {
    while (document.body.contains(stage)) {
      await sleep(2200);
      if (Date.now() < guestOverrideUntil) continue;

      currentIdx = (currentIdx + 1) % TARGETS.length;
      const next = TARGETS[currentIdx];

      // Slight organic jitter on aim point like a real person
      const aim = {
        x: next.cursorAim.x + (Math.random() - 0.5) * 2.2,
        y: next.cursorAim.y + (Math.random() - 0.5) * 2.2,
      };

      // Smooth human glide (950–1250ms)
      await animateCurveTo(aim, 980 + Math.random() * 280);
      if (Date.now() < guestOverrideUntil) continue;

      // Hover preview before clicking (real Figma feel)
      showHover(next);
      await sleep(220);

      // Subtle click press + lock selection
      alirezaCursor.classList.add("is-clicking");
      showHover(null);
      selectTarget(next);
      await sleep(160);
      alirezaCursor.classList.remove("is-clicking");
    }
  }

  runHumanDesignLoop();
}
