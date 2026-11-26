/* ==========================================================================
   Authentic Figma UI3 Interactive Multi-Tab Live Workspace
   - Interactive top tabs let visitors switch between Dashify, IranServer DS,
     Made In Iran, Farano Console, and Word+ directly inside Figma!
   - Exact Figma UI3 layout: Left Pages+Layers, Flat #1E1E1E canvas with
     Top & Left Pixel Rulers, Floating Bottom Tool Dock, and Live Right Inspector.
   - Human-like Bezier cursor engine + Interactive Multiplayer "Guest" cursor.
   ========================================================================== */

const FIGMA_TABS = [
  {
    id: "dashify",
    tabLabel: "Dashify — Overview",
    fileName: "Dashify — Overview",
    fileSub: "Analytics UI · Interactive",
    frameLabel: "❖ Dashify / Overview — Desktop 1440",
    image: "/assets/dashify-clean-artboard.png",
    aspect: "889 / 502",
    projectSlug: null,
    interactiveTargets: true,
    layers: [
      { id: "layer-sales", label: "❖ KPI / Total Sales", type: "comp" },
      { id: "layer-orders", label: "❖ KPI / Total Orders", type: "comp" },
      { id: "layer-table", label: "❖ Table / Recent Sales", type: "comp" },
      { id: "layer-chart", label: "❖ Chart / Sales Expert", type: "comp" },
    ],
    defaultInspector: { name: "KPI / Total Sales", x: 112, y: 128, w: 248, h: 148, r: 16, fillHex: "#165EF6", fillName: "blue/500" },
  },
  {
    id: "iranserver",
    tabLabel: "IranServer DS",
    fileName: "IranServer — Ecosystem",
    fileSub: "Senior Product Designer",
    frameLabel: "❖ IranServer / Design System & Portal",
    image: "/assets/project-iranserver.jpg",
    aspect: "4 / 3",
    projectSlug: "iranserver",
    interactiveTargets: false,
    layers: [
      { id: "is-1", label: "❖ Tokens / Semantic Blue", type: "comp" },
      { id: "is-2", label: "❖ Portal / Cloud Hosting", type: "comp" },
      { id: "is-3", label: "❖ Flow / Checkout Funnel", type: "comp" },
      { id: "is-4", label: "❖ Audit / GA4 + Clarity", type: "comp" },
    ],
    defaultInspector: { name: "IranServer / System", x: 0, y: 0, w: 1440, h: 1080, r: 16, fillHex: "#165EF6", fillName: "brand/primary" },
  },
  {
    id: "made-in-iran",
    tabLabel: "Made In Iran",
    fileName: "Made In Iran — B2B DS",
    fileSub: "26 Components · 4 Surfaces",
    frameLabel: "❖ Made In Iran / 0-to-1 Design System",
    image: "/assets/project-madeiniran.jpg",
    aspect: "4 / 3",
    projectSlug: "made-in-iran",
    interactiveTargets: false,
    layers: [
      { id: "mi-1", label: "❖ Tokens / Material + Tailwind", type: "comp" },
      { id: "mi-2", label: "❖ Surface / Buyer Panel", type: "comp" },
      { id: "mi-3", label: "❖ Surface / Supplier Panel", type: "comp" },
      { id: "mi-4", label: "❖ Surface / Admin & Web", type: "comp" },
    ],
    defaultInspector: { name: "System / 26 Components", x: 0, y: 0, w: 1440, h: 1080, r: 14, fillHex: "#165EF6", fillName: "b2b/primary" },
  },
  {
    id: "farano",
    tabLabel: "Farano Console",
    fileName: "Farano — GovTech",
    fileSub: "IA · Access Control · AI",
    frameLabel: "❖ Farano / Iran Digital Console",
    image: "/assets/project-farano.jpg",
    aspect: "4 / 3",
    projectSlug: "farano",
    interactiveTargets: false,
    layers: [
      { id: "fr-1", label: "❖ IA / Role Access Control", type: "comp" },
      { id: "fr-2", label: "❖ Flow / Privacy First", type: "comp" },
      { id: "fr-3", label: "❖ AI / Persona Simulation", type: "comp" },
      { id: "fr-4", label: "❖ Spec / PRD & Test Cases", type: "comp" },
    ],
    defaultInspector: { name: "Console / Access Matrix", x: 0, y: 0, w: 1440, h: 1080, r: 16, fillHex: "#165EF6", fillName: "gov/security" },
  },
  {
    id: "word-plus",
    tabLabel: "Word+ App",
    fileName: "Word+ — Mobile",
    fileSub: "Material 3 · 40 Interviews",
    frameLabel: "❖ Word+ / Learning & Gamification",
    image: "/assets/project-wordplus.jpg",
    aspect: "4 / 3",
    projectSlug: "word-plus",
    interactiveTargets: false,
    layers: [
      { id: "wp-1", label: "❖ System / Material 3", type: "comp" },
      { id: "wp-2", label: "❖ Flow / Dual Study Mode", type: "comp" },
      { id: "wp-3", label: "❖ UX / Paywall Clarity", type: "comp" },
      { id: "wp-4", label: "❖ Engagement / Gamification", type: "comp" },
    ],
    defaultInspector: { name: "Word+ / Mobile Frame", x: 0, y: 0, w: 390, h: 844, r: 24, fillHex: "#57C1FF", fillName: "m3/accent" },
  },
];

const DASHIFY_TARGETS = [
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

export function renderHeroFigmaStage(lang = "en") {
  const initialTab = FIGMA_TABS[0];

  return `
    <div class="figma-ui3" id="figma-stage" data-lang="${lang}" dir="ltr" aria-label="Interactive Figma UI3 workspace showing Alireza's live design files">
      <!-- Real Figma Desktop / Browser Top Tab Bar (Clickable Project Tabs!) -->
      <div class="fg-tabbar">
        <div class="fg-traffic" aria-hidden="true">
          <span class="fg-dot fg-dot--red"></span>
          <span class="fg-dot fg-dot--yellow"></span>
          <span class="fg-dot fg-dot--green"></span>
        </div>

        <div class="fg-tabs" role="tablist" aria-label="Figma Project Files">
          <span class="fg-home-ico" aria-hidden="true">⌂</span>
          ${FIGMA_TABS.map(
            (tab, i) => `
            <button
              type="button"
              role="tab"
              class="fg-tab ${i === 0 ? "fg-tab--active" : ""}"
              data-figma-tab="${tab.id}"
              aria-selected="${i === 0 ? "true" : "false"}"
            >
              <i class="fg-tab-dot" aria-hidden="true"></i>
              <span>${tab.tabLabel}</span>
            </button>
          `
          ).join("")}
        </div>
      </div>

      <!-- Figma UI3 3-Column Body -->
      <div class="fg-body">
        <!-- Left Panel: File + Pages + Layers -->
        <aside class="fg-left" aria-hidden="true">
          <div class="fg-file-head">
            <div class="fg-file-name" id="fg-file-name">${initialTab.fileName} ▾</div>
            <div class="fg-file-sub" id="fg-file-sub">${initialTab.fileSub}</div>
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
          <div class="fg-layer fg-layer--frame">▾ # Main Artboard</div>
          <div id="fg-layers-list">
            ${initialTab.layers
              .map(
                (l, i) =>
                  `<div class="fg-layer fg-layer--comp ${i === 0 ? "is-selected" : ""}" id="${l.id}">${l.label}</div>`
              )
              .join("")}
          </div>
        </aside>

        <!-- Center Flat #1E1E1E Canvas with Pixel Rulers + Bottom UI3 Dock -->
        <div class="fg-canvas-shell">
          <div class="fg-ruler-top" aria-hidden="true">
            <span>0</span><span>250</span><span>500</span><span>750</span><span>1000</span><span>1250</span><span>1500</span>
          </div>

          <div class="fg-canvas-row">
            <div class="fg-ruler-left" aria-hidden="true">
              <span>0</span><span>200</span><span>400</span><span>600</span><span>800</span>
            </div>

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
                <div class="fg-artboard-label" id="fg-artboard-label">${initialTab.frameLabel}</div>

                <div class="fg-artboard" id="fg-artboard" style="aspect-ratio:${initialTab.aspect};">
                  <img
                    class="fg-artboard-img"
                    id="fg-artboard-img"
                    src="${initialTab.image}"
                    alt="${initialTab.fileName}"
                    fetchpriority="high"
                  />

                  <!-- Interactive Hit Targets for Dashify -->
                  <div id="fg-hotspots-layer">
                    ${DASHIFY_TARGETS.map(
                      (t) => `
                      <div
                        class="fg-hotspot"
                        data-target-id="${t.id}"
                        style="left:${t.box.left}%;top:${t.box.top}%;width:${t.box.width}%;height:${t.box.height}%;"
                      ></div>
                    `
                    ).join("")}
                  </div>

                  <div class="fg-hover-box" id="fg-hover-box" aria-hidden="true"></div>

                  <div class="fg-select-box" id="fg-select-box" aria-hidden="true">
                    <i class="fg-h tl"></i><i class="fg-h tr"></i><i class="fg-h bl"></i><i class="fg-h br"></i>
                    <span class="fg-dim-pill" id="fg-dim-pill">248 × 148</span>
                  </div>

                  <div class="fg-smart-guide" id="fg-smart-guide" aria-hidden="true">
                    <span class="fg-smart-line"></span>
                    <span class="fg-smart-pill">16</span>
                  </div>

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

        <!-- Right Design Inspector (Authentic Figma UI3 Top Bar & Live Values) -->
        <aside class="fg-right">
          <div class="fg-right-top">
            <div class="fg-avatars" aria-hidden="true">
              <span class="fg-av fg-av--owner" title="Alireza Farshchi">AF</span>
              <span class="fg-av fg-av--guest" id="figma-guest-avatar" title="Guest (You)">G</span>
            </div>
            <div class="fg-right-actions" aria-hidden="true">
              <span class="fg-play-btn" title="Present">▷</span>
              <span class="fg-share-btn">Share</span>
            </div>
          </div>

          <div class="fg-right-tabs" aria-hidden="true">
            <span class="is-active">Design</span>
            <span>Prototype</span>
            <span class="fg-zoom-val">68% ▾</span>
          </div>

          <div class="fg-insp-block">
            <div class="fg-insp-title" id="insp-name">${initialTab.defaultInspector.name}</div>
            <div class="fg-insp-grid">
              <span>X <em id="insp-x">${initialTab.defaultInspector.x}</em></span>
              <span>Y <em id="insp-y">${initialTab.defaultInspector.y}</em></span>
              <span>W <em id="insp-w">${initialTab.defaultInspector.w}</em></span>
              <span>H <em id="insp-h">${initialTab.defaultInspector.h}</em></span>
              <span>R <em id="insp-r">${initialTab.defaultInspector.r}</em></span>
              <span>Op <em>100%</em></span>
            </div>
          </div>

          <div class="fg-insp-block">
            <div class="fg-insp-label">Fill</div>
            <div class="fg-fill-row">
              <span class="fg-swatch" id="insp-swatch" style="background:${initialTab.defaultInspector.fillHex};"></span>
              <span id="insp-fill-hex">${initialTab.defaultInspector.fillHex}</span>
              <em id="insp-fill-name">${initialTab.defaultInspector.fillName}</em>
            </div>
          </div>

          <div class="fg-insp-block" id="fg-project-link-wrap" hidden>
            <a class="fg-open-project-btn" id="fg-open-project-btn" href="/${lang}/work/">
              ${lang === "fa" ? "مشاهده معرفی پروژه ↗" : "Open project overview ↗"}
            </a>
          </div>

          <div class="fg-insp-block" aria-hidden="true">
            <div class="fg-insp-label">Auto Layout</div>
            <div class="fg-al-row">
              <span>→ 16</span>
              <span>⊞ 20</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

export function initHeroFigmaStage() {
  const stage = document.getElementById("figma-stage");
  const canvas = document.getElementById("figma-canvas");
  const artboard = document.getElementById("fg-artboard");
  const artboardImg = document.getElementById("fg-artboard-img");
  const artboardLabel = document.getElementById("fg-artboard-label");
  const hotspotsLayer = document.getElementById("fg-hotspots-layer");
  const fileNameEl = document.getElementById("fg-file-name");
  const fileSubEl = document.getElementById("fg-file-sub");
  const layersListEl = document.getElementById("fg-layers-list");
  const projectLinkWrap = document.getElementById("fg-project-link-wrap");
  const projectLinkBtn = document.getElementById("fg-open-project-btn");
  const guestCursor = document.getElementById("figma-guest-cursor");
  const alirezaCursor = document.getElementById("fg-alireza-cursor");
  const hoverBox = document.getElementById("fg-hover-box");
  const selectBox = document.getElementById("fg-select-box");
  const dimPill = document.getElementById("fg-dim-pill");
  const smartGuide = document.getElementById("fg-smart-guide");

  if (!stage || !canvas || !artboard || !alirezaCursor || !selectBox) return;

  const lang = stage.getAttribute("data-lang") === "fa" ? "fa" : "en";
  let activeTabId = "dashify";

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

  function updateInspector(data) {
    if (insp.name) insp.name.textContent = data.name;
    if (insp.x) insp.x.textContent = String(data.x);
    if (insp.y) insp.y.textContent = String(data.y);
    if (insp.w) insp.w.textContent = String(data.w);
    if (insp.h) insp.h.textContent = String(data.h);
    if (insp.r) insp.r.textContent = String(data.r);
    if (insp.swatch) insp.swatch.style.background = data.fillHex;
    if (insp.fillHex) insp.fillHex.textContent = data.fillHex;
    if (insp.fillName) insp.fillName.textContent = data.fillName;
  }

  function applyBox(el, box) {
    el.style.left = `${box.left}%`;
    el.style.top = `${box.top}%`;
    el.style.width = `${box.width}%`;
    el.style.height = `${box.height}%`;
  }

  function showHover(target) {
    if (!hoverBox) return;
    if (!target || activeTabId !== "dashify") {
      hoverBox.classList.remove("is-visible");
      return;
    }
    applyBox(hoverBox, target.box);
    hoverBox.classList.add("is-visible");
  }

  function selectTarget(target) {
    if (!target || activeTabId !== "dashify") return;
    applyBox(selectBox, target.box);
    selectBox.classList.add("is-visible");
    if (dimPill) dimPill.textContent = target.dim;
    if (smartGuide) smartGuide.classList.toggle("is-visible", Boolean(target.showGuide));

    DASHIFY_TARGETS.forEach((t) => {
      document.getElementById(t.layerId)?.classList.toggle("is-selected", t.id === target.id);
    });

    updateInspector({ name: target.name, ...target.inspector });
  }

  // Switch between interactive Figma project tabs!
  function switchTab(tabId) {
    const tab = FIGMA_TABS.find((t) => t.id === tabId);
    if (!tab) return;
    activeTabId = tab.id;

    stage.querySelectorAll("[data-figma-tab]").forEach((btn) => {
      const isActive = btn.getAttribute("data-figma-tab") === tabId;
      btn.classList.toggle("fg-tab--active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });

    if (fileNameEl) fileNameEl.textContent = `${tab.fileName} ▾`;
    if (fileSubEl) fileSubEl.textContent = tab.fileSub;
    if (artboardLabel) artboardLabel.textContent = tab.frameLabel;
    if (artboardImg) {
      artboardImg.src = tab.image;
      artboardImg.alt = tab.fileName;
    }
    artboard.style.aspectRatio = tab.aspect;

    if (layersListEl) {
      layersListEl.innerHTML = tab.layers
        .map(
          (l, i) =>
            `<div class="fg-layer fg-layer--comp ${i === 0 ? "is-selected" : ""}" id="${l.id}">${l.label}</div>`
        )
        .join("");
    }

    if (projectLinkWrap && projectLinkBtn) {
      if (tab.projectSlug) {
        projectLinkWrap.hidden = false;
        projectLinkBtn.href = `/${lang}/work/${tab.projectSlug}/`;
      } else {
        projectLinkWrap.hidden = true;
      }
    }

    if (tab.interactiveTargets) {
      if (hotspotsLayer) hotspotsLayer.style.display = "block";
      alirezaCursor.style.opacity = "1";
      selectTarget(DASHIFY_TARGETS[0]);
    } else {
      if (hotspotsLayer) hotspotsLayer.style.display = "none";
      selectBox.classList.remove("is-visible");
      hoverBox.classList.remove("is-visible");
      smartGuide?.classList.remove("is-visible");
      alirezaCursor.style.opacity = "0";
      updateInspector(tab.defaultInspector);
    }
  }

  stage.querySelectorAll("[data-figma-tab]").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.getAttribute("data-figma-tab")));
  });

  // Initial state
  selectTarget(DASHIFY_TARGETS[0]);
  alirezaCursor.style.left = `${DASHIFY_TARGETS[0].cursorAim.x}%`;
  alirezaCursor.style.top = `${DASHIFY_TARGETS[0].cursorAim.y}%`;

  let guestOverrideUntil = 0;

  // Interactive Guest Cursor & Click-to-Inspect
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (guestCursor && finePointer) {
    canvas.addEventListener("pointerenter", () => {
      canvas.classList.add("is-guest-hover");
      stage.classList.add("is-guest-active");
    });

    canvas.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      guestCursor.style.transform = `translate3d(${(e.clientX - rect.left).toFixed(1)}px, ${(e.clientY - rect.top).toFixed(1)}px, 0)`;
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

    artboard.querySelectorAll("[data-target-id]").forEach((el) => {
      const target = DASHIFY_TARGETS.find((t) => t.id === el.getAttribute("data-target-id"));
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

  // Subtle Scroll Expansion on Hero Figma Stage
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    const onScrollExpand = () => {
      const rect = stage.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, 1 - rect.top / 420));
      const scale = 0.975 + progress * 0.025;
      stage.style.transform = `scale(${scale.toFixed(4)})`;
    };
    window.addEventListener("scroll", onScrollExpand, { passive: true });
    onScrollExpand();
  }

  if (prefersReduced) return;

  // Human-Like Curved Bezier Motion for Alireza's Cursor
  let currentIdx = 0;
  let pos = { ...DASHIFY_TARGETS[0].cursorAim };

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateCurveTo(dest, durationMs) {
    return new Promise((resolve) => {
      const start = { ...pos };
      const dx = dest.x - start.x;
      const dy = dest.y - start.y;
      const arcOffset = (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 5);
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

        if (rawT < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  const sleep = (ms) => new Promise((r) => window.setTimeout(r, ms));

  async function runHumanDesignLoop() {
    while (document.body.contains(stage)) {
      await sleep(2300);
      if (activeTabId !== "dashify" || Date.now() < guestOverrideUntil) continue;

      currentIdx = (currentIdx + 1) % DASHIFY_TARGETS.length;
      const next = DASHIFY_TARGETS[currentIdx];

      const aim = {
        x: next.cursorAim.x + (Math.random() - 0.5) * 2.0,
        y: next.cursorAim.y + (Math.random() - 0.5) * 2.0,
      };

      await animateCurveTo(aim, 960 + Math.random() * 260);
      if (activeTabId !== "dashify" || Date.now() < guestOverrideUntil) continue;

      showHover(next);
      await sleep(220);

      alirezaCursor.classList.add("is-clicking");
      showHover(null);
      selectTarget(next);
      await sleep(160);
      alirezaCursor.classList.remove("is-clicking");
    }
  }

  runHumanDesignLoop();
}
