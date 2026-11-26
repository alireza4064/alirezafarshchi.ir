/* ==========================================================================
   Authentic Figma UI3 Interactive Multi-Tab Live Workspace
   - Interactive top tabs: Dashify, IranServer DS, Made In Iran, Farano, Word+
   - Real Dev Mode (</>) toggle switching Right Panel to Inspect / CSS Tokens
   - Real Hand Tool (H) drag-to-pan + Zoom (75% / 100% / 125%) + Reset
   - Real Comment Tool (C) to drop interactive comment pins anywhere on canvas
   - Human-like Bezier cursor engine + Interactive Multiplayer "Guest" cursor
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
    defaultInspector: {
      name: "KPI / Total Sales",
      x: 112,
      y: 128,
      w: 248,
      h: 148,
      r: 16,
      gap: 16,
      pad: 20,
      fillHex: "#165EF6",
      fillName: "blue/500",
      tokenVar: "--primary",
    },
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
    defaultInspector: {
      name: "IranServer / System",
      x: 0,
      y: 0,
      w: 1440,
      h: 1080,
      r: 16,
      gap: 16,
      pad: 24,
      fillHex: "#165EF6",
      fillName: "brand/primary",
      tokenVar: "--primary",
    },
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
    defaultInspector: {
      name: "System / 26 Components",
      x: 0,
      y: 0,
      w: 1440,
      h: 1080,
      r: 14,
      gap: 16,
      pad: 20,
      fillHex: "#165EF6",
      fillName: "b2b/primary",
      tokenVar: "--primary",
    },
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
    defaultInspector: {
      name: "Console / Access Matrix",
      x: 0,
      y: 0,
      w: 1440,
      h: 1080,
      r: 16,
      gap: 12,
      pad: 24,
      fillHex: "#165EF6",
      fillName: "gov/security",
      tokenVar: "--primary",
    },
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
    defaultInspector: {
      name: "Word+ / Mobile Frame",
      x: 0,
      y: 0,
      w: 390,
      h: 844,
      r: 24,
      gap: 16,
      pad: 16,
      fillHex: "#57C1FF",
      fillName: "m3/accent",
      tokenVar: "--accent-sky",
    },
  },
];

const DASHIFY_TARGETS = [
  {
    id: "kpi-sales",
    layerId: "layer-sales",
    name: "KPI / Total Sales",
    box: { left: 7.7, top: 14.2, width: 16.5, height: 21.8 },
    cursorAim: { x: 16.5, y: 25.5 },
    inspector: {
      x: 112,
      y: 128,
      w: 248,
      h: 148,
      r: 16,
      gap: 16,
      pad: 20,
      fillHex: "#165EF6",
      fillName: "blue/500",
      tokenVar: "--primary",
    },
    dim: "248 × 148",
    showGuide: false,
  },
  {
    id: "kpi-orders",
    layerId: "layer-orders",
    name: "KPI / Total Orders",
    box: { left: 24.9, top: 14.2, width: 16.0, height: 21.8 },
    cursorAim: { x: 33.0, y: 25.0 },
    inspector: {
      x: 376,
      y: 128,
      w: 240,
      h: 148,
      r: 16,
      gap: 16,
      pad: 20,
      fillHex: "#101217",
      fillName: "surface/900",
      tokenVar: "--surface-900",
    },
    dim: "240 × 148",
    showGuide: true,
  },
  {
    id: "table-recent",
    layerId: "layer-table",
    name: "Table / Recent Sales",
    box: { left: 7.7, top: 43.5, width: 65.0, height: 49.4 },
    cursorAim: { x: 40.5, y: 67.0 },
    inspector: {
      x: 112,
      y: 312,
      w: 936,
      h: 420,
      r: 16,
      gap: 12,
      pad: 24,
      fillHex: "#0D0F14",
      fillName: "surface/950",
      tokenVar: "--surface-950",
    },
    dim: "936 × 420",
    showGuide: false,
  },
  {
    id: "chart-expert",
    layerId: "layer-chart",
    name: "Chart / Sales Expert",
    box: { left: 73.5, top: 43.5, width: 23.7, height: 49.4 },
    cursorAim: { x: 84.5, y: 69.0 },
    inspector: {
      x: 1064,
      y: 312,
      w: 342,
      h: 420,
      r: 16,
      gap: 16,
      pad: 20,
      fillHex: "#165EF6",
      fillName: "chart/accent",
      tokenVar: "--primary",
    },
    dim: "342 × 420",
    showGuide: false,
  },
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildCssSnippet(data) {
  const tokenVar = data.tokenVar || "--primary";
  const gap = data.gap ?? 16;
  const pad = data.pad ?? 20;
  return [
    `/* ${data.name} */`,
    `${tokenVar}: ${data.fillHex};`,
    `display: flex;`,
    `gap: ${gap}px;`,
    `padding: ${pad}px;`,
    `width: ${data.w}px;`,
    `height: ${data.h}px;`,
    `border-radius: ${data.r}px;`,
    `background: var(${tokenVar});`,
  ].join("\n");
}

function buildCssHtml(data) {
  const tokenVar = data.tokenVar || "--primary";
  const gap = data.gap ?? 16;
  const pad = data.pad ?? 20;
  return [
    `<span class="fg-tok-var">${tokenVar}</span>: <span class="fg-tok-val">${data.fillHex}</span>;`,
    `<span class="fg-tok-prop">display</span>: <span class="fg-tok-val">flex</span>;`,
    `<span class="fg-tok-prop">gap</span>: <span class="fg-tok-num">${gap}px</span>;`,
    `<span class="fg-tok-prop">padding</span>: <span class="fg-tok-num">${pad}px</span>;`,
    `<span class="fg-tok-prop">width</span>: <span class="fg-tok-num">${data.w}px</span>;`,
    `<span class="fg-tok-prop">height</span>: <span class="fg-tok-num">${data.h}px</span>;`,
    `<span class="fg-tok-prop">border-radius</span>: <span class="fg-tok-num">${data.r}px</span>;`,
    `<span class="fg-tok-prop">background</span>: <span class="fg-tok-fn">var</span>(<span class="fg-tok-var">${tokenVar}</span>);`,
  ].join("\n");
}

export function renderHeroFigmaStage(lang = "en") {
  const initialTab = FIGMA_TABS[0];
  const initData = initialTab.defaultInspector;

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
              <!-- Floating Canvas Zoom Bar (75% / 100% / 125% + Reset) -->
              <div class="fg-zoom-bar" role="group" aria-label="Canvas Zoom Controls">
                <button type="button" class="fg-zoom-pill" data-zoom="0.75">75%</button>
                <button type="button" class="fg-zoom-pill is-active" data-zoom="1">100%</button>
                <button type="button" class="fg-zoom-pill" data-zoom="1.25">125%</button>
                <button type="button" class="fg-zoom-reset" id="fg-zoom-reset" title="Reset view" hidden>↺</button>
              </div>

              <!-- Active Tool Hint Pill -->
              <div class="fg-tool-toast" id="fg-tool-toast" aria-live="polite"></div>

              <!-- Visitor Multiplayer "Guest" Cursor -->
              <div class="fg-guest-cursor" id="figma-guest-cursor" aria-hidden="true">
                <svg width="17" height="19" viewBox="0 0 16 18" fill="none">
                  <path d="M1.5 1.5L6.3 15.6L8.7 9.8L14.5 7.6L1.5 1.5Z" fill="#0ACF83" stroke="#FFFFFF" stroke-width="1.35" stroke-linejoin="round"/>
                </svg>
                <span class="fg-guest-tag">Guest</span>
              </div>

              <!-- Artboard Container (Pan & Zoom Target) -->
              <div class="fg-artboard-block" id="fg-artboard-block">
                <div class="fg-artboard-label" id="fg-artboard-label">${initialTab.frameLabel}</div>

                <div class="fg-artboard" id="fg-artboard" style="aspect-ratio:${initialTab.aspect};">
                  <img
                    class="fg-artboard-img"
                    id="fg-artboard-img"
                    src="${initialTab.image}"
                    alt="${initialTab.fileName}"
                    draggable="false"
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

                  <!-- Interactive Comment Pins Layer -->
                  <div class="fg-comments-layer" id="fg-comments-layer"></div>

                  <!-- Floating Comment Composer Popover -->
                  <form class="fg-comment-composer" id="fg-comment-composer" hidden>
                    <input
                      type="text"
                      id="fg-comment-input"
                      maxlength="140"
                      autocomplete="off"
                      placeholder="${lang === "fa" ? "کامنت خود را بنویسید..." : "Add a comment..."}"
                    />
                    <button type="submit" class="fg-comment-submit" aria-label="Post comment">↑</button>
                  </form>

                  <div class="fg-alireza-cursor" id="fg-alireza-cursor" aria-hidden="true">
                    <svg width="17" height="19" viewBox="0 0 16 18" fill="none">
                      <path d="M1.5 1.5L6.3 15.6L8.7 9.8L14.5 7.6L1.5 1.5Z" fill="#0D99FF" stroke="#FFFFFF" stroke-width="1.35" stroke-linejoin="round"/>
                    </svg>
                    <span class="fg-alireza-tag">Alireza</span>
                  </div>
                </div>
              </div>

              <!-- Real Figma UI3 Floating Bottom Tool Dock (Interactive!) -->
              <div class="fg-bottom-dock" role="toolbar" aria-label="Figma Tools">
                <button type="button" class="fg-dock-btn fg-dock-btn--active" data-tool="move" title="Move (V)" aria-pressed="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3.5 2L13 8.2L8.4 9.1L6.2 13.5L3.5 2Z" fill="currentColor"/></svg>
                </button>
                <button type="button" class="fg-dock-btn" data-tool="hand" title="Hand / Pan (H)" aria-pressed="false">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5.2 8.2V4.3C5.2 3.7 5.7 3.2 6.3 3.2C6.9 3.2 7.3 3.7 7.3 4.3V7.2M7.3 6.8V3.5C7.3 2.9 7.8 2.4 8.4 2.4C9 2.4 9.4 2.9 9.4 3.5V7.2M9.4 6.8V4.2C9.4 3.6 9.9 3.1 10.5 3.1C11.1 3.1 11.5 3.6 11.5 4.2V8.8C11.5 11.4 9.8 13.4 7.4 13.4C5.4 13.4 4.1 12.1 3.2 10.3L2.5 8.9C2.2 8.3 2.5 7.6 3.1 7.4C3.7 7.2 4.3 7.5 4.6 8L5.2 9.1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <button type="button" class="fg-dock-btn" data-tool="comment" title="Comment (C)" aria-pressed="false">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2.8A5 5 0 0 1 13 7.8C13 10.6 10.8 12.8 8 12.8H3.2L4.4 10.3A5 5 0 0 1 8 2.8Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></svg>
                </button>
                <span class="fg-dock-btn fg-dock-btn--passive" title="Frame (F)" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 2V14M11 2V14M2 5H14M2 11H14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                </span>
                <span class="fg-dock-btn fg-dock-btn--passive" title="Text (T)" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3.5 4V3H12.5V4M8 3V13M6 13H10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                </span>
                <span class="fg-dock-sep" aria-hidden="true"></span>
                <button type="button" class="fg-dock-dev" id="fg-dev-toggle" title="Dev Mode (Shift+D)" aria-pressed="false">&lt;/&gt;</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Design / Dev Mode Inspector -->
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

          <div class="fg-right-tabs">
            <button type="button" class="fg-rtab is-active" id="fg-rtab-design">Design</button>
            <button type="button" class="fg-rtab" id="fg-rtab-inspect">Inspect</button>
            <span class="fg-zoom-val" id="fg-zoom-readout">100%</span>
          </div>

          <!-- Design Mode Inspector -->
          <div id="fg-design-panel">
            <div class="fg-insp-block">
              <div class="fg-insp-title" id="insp-name">${initData.name}</div>
              <div class="fg-insp-grid">
                <span>X <em id="insp-x">${initData.x}</em></span>
                <span>Y <em id="insp-y">${initData.y}</em></span>
                <span>W <em id="insp-w">${initData.w}</em></span>
                <span>H <em id="insp-h">${initData.h}</em></span>
                <span>R <em id="insp-r">${initData.r}</em></span>
                <span>Op <em>100%</em></span>
              </div>
            </div>

            <div class="fg-insp-block">
              <div class="fg-insp-label">Fill</div>
              <div class="fg-fill-row">
                <span class="fg-swatch" id="insp-swatch" style="background:${initData.fillHex};"></span>
                <span id="insp-fill-hex">${initData.fillHex}</span>
                <em id="insp-fill-name">${initData.fillName}</em>
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
                <span id="insp-gap">→ ${initData.gap}</span>
                <span id="insp-pad">⊞ ${initData.pad}</span>
              </div>
            </div>
          </div>

          <!-- Dev Mode Inspect / CSS Tokens Panel -->
          <div id="fg-dev-panel" hidden>
            <div class="fg-dev-badge">
              <span class="fg-dev-dot" aria-hidden="true"></span>
              <span>DEV MODE · CSS</span>
            </div>

            <div class="fg-insp-block">
              <div class="fg-insp-title" id="dev-node-name">${initData.name}</div>
              <div class="fg-token-chips" id="dev-token-chips">
                <span>${initData.tokenVar}</span>
                <span>radius/${initData.r}</span>
                <span>space/${initData.gap}</span>
              </div>
            </div>

            <div class="fg-insp-block">
              <div class="fg-dev-code-head">
                <span class="fg-insp-label" style="margin:0;">CSS Tokens</span>
                <button type="button" class="fg-copy-css-btn" id="fg-copy-css-btn">Copy</button>
              </div>
              <pre class="fg-dev-code"><code id="dev-css-code">${buildCssHtml(initData)}</code></pre>
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
  const artboardBlock = document.getElementById("fg-artboard-block");
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

  const devToggleBtn = document.getElementById("fg-dev-toggle");
  const designTabBtn = document.getElementById("fg-rtab-design");
  const inspectTabBtn = document.getElementById("fg-rtab-inspect");
  const designPanel = document.getElementById("fg-design-panel");
  const devPanel = document.getElementById("fg-dev-panel");
  const devNodeName = document.getElementById("dev-node-name");
  const devTokenChips = document.getElementById("dev-token-chips");
  const devCssCode = document.getElementById("dev-css-code");
  const copyCssBtn = document.getElementById("fg-copy-css-btn");

  const zoomReadout = document.getElementById("fg-zoom-readout");
  const zoomResetBtn = document.getElementById("fg-zoom-reset");
  const toolToast = document.getElementById("fg-tool-toast");

  const commentsLayer = document.getElementById("fg-comments-layer");
  const commentComposer = document.getElementById("fg-comment-composer");
  const commentInput = document.getElementById("fg-comment-input");

  if (!stage || !canvas || !artboard || !alirezaCursor || !selectBox) return;

  const lang = stage.getAttribute("data-lang") === "fa" ? "fa" : "en";
  let activeTabId = "dashify";
  let activeTool = "move"; // "move" | "hand" | "comment"
  let isDevMode = false;
  let currentInspectorData = { ...FIGMA_TABS[0].defaultInspector };

  // Pan & Zoom State
  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let isPanning = false;
  let panStartX = 0;
  let panStartY = 0;
  let panOriginX = 0;
  let panOriginY = 0;

  // Comments State (per tab)
  const commentsByTab = {
    dashify: [
      {
        id: "c-seed-1",
        x: 61.5,
        y: 23.0,
        author: "Alireza",
        initials: "AF",
        isOwner: true,
        text: lang === "fa" ? "کارت‌های KPI با توکن 16px Auto Layout ساخته شده‌اند." : "KPI cards built with 16px Auto Layout tokens.",
        open: false,
      },
    ],
  };
  let pendingCommentPos = null;
  let toastTimer = null;

  const insp = {
    name: document.getElementById("insp-name"),
    x: document.getElementById("insp-x"),
    y: document.getElementById("insp-y"),
    w: document.getElementById("insp-w"),
    h: document.getElementById("insp-h"),
    r: document.getElementById("insp-r"),
    gap: document.getElementById("insp-gap"),
    pad: document.getElementById("insp-pad"),
    swatch: document.getElementById("insp-swatch"),
    fillHex: document.getElementById("insp-fill-hex"),
    fillName: document.getElementById("insp-fill-name"),
  };

  function showToast(msg) {
    if (!toolToast) return;
    toolToast.textContent = msg;
    toolToast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toolToast.classList.remove("is-visible"), 1900);
  }

  function applyTransform(animate = false) {
    if (!artboardBlock) return;
    artboardBlock.style.transition = animate ? "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)" : "none";
    artboardBlock.style.transform = `translate3d(${panX.toFixed(1)}px, ${panY.toFixed(1)}px, 0) scale(${zoom})`;
    if (zoomReadout) zoomReadout.textContent = `${Math.round(zoom * 100)}%`;
    if (zoomResetBtn) zoomResetBtn.hidden = zoom === 1 && Math.abs(panX) < 2 && Math.abs(panY) < 2;

    stage.querySelectorAll("[data-zoom]").forEach((btn) => {
      const z = parseFloat(btn.getAttribute("data-zoom"));
      btn.classList.toggle("is-active", Math.abs(z - zoom) < 0.01);
    });
  }

  function setZoom(nextZoom) {
    zoom = nextZoom;
    if (zoom <= 1) {
      panX = Math.max(-140, Math.min(140, panX));
      panY = Math.max(-90, Math.min(90, panY));
    }
    applyTransform(true);
  }

  function resetView() {
    zoom = 1;
    panX = 0;
    panY = 0;
    applyTransform(true);
  }

  function updateInspector(data) {
    currentInspectorData = data;
    if (insp.name) insp.name.textContent = data.name;
    if (insp.x) insp.x.textContent = String(data.x);
    if (insp.y) insp.y.textContent = String(data.y);
    if (insp.w) insp.w.textContent = String(data.w);
    if (insp.h) insp.h.textContent = String(data.h);
    if (insp.r) insp.r.textContent = String(data.r);
    if (insp.gap) insp.gap.textContent = `→ ${data.gap ?? 16}`;
    if (insp.pad) insp.pad.textContent = `⊞ ${data.pad ?? 20}`;
    if (insp.swatch) insp.swatch.style.background = data.fillHex;
    if (insp.fillHex) insp.fillHex.textContent = data.fillHex;
    if (insp.fillName) insp.fillName.textContent = data.fillName;

    // Sync Dev Mode Panel
    if (devNodeName) devNodeName.textContent = data.name;
    if (devCssCode) devCssCode.innerHTML = buildCssHtml(data);
    if (devTokenChips) {
      devTokenChips.innerHTML = `
        <span>${data.tokenVar || "--primary"}</span>
        <span>radius/${data.r}</span>
        <span>space/${data.gap ?? 16}</span>
      `;
    }
  }

  function setDevMode(enabled) {
    isDevMode = enabled;
    stage.classList.toggle("is-dev-mode", isDevMode);
    if (devToggleBtn) {
      devToggleBtn.classList.toggle("is-active", isDevMode);
      devToggleBtn.setAttribute("aria-pressed", String(isDevMode));
    }
    if (designPanel) designPanel.hidden = isDevMode;
    if (devPanel) devPanel.hidden = !isDevMode;
    designTabBtn?.classList.toggle("is-active", !isDevMode);
    inspectTabBtn?.classList.toggle("is-active", isDevMode);
    if (isDevMode) {
      showToast(lang === "fa" ? "حالت Dev Mode فعال شد — توکن‌های CSS" : "Dev Mode ON — Inspecting CSS Tokens");
    }
  }

  function setTool(tool) {
    activeTool = tool;
    canvas.classList.toggle("is-hand-tool", tool === "hand");
    canvas.classList.toggle("is-comment-tool", tool === "comment");
    if (tool !== "comment") closeComposer();

    stage.querySelectorAll("[data-tool]").forEach((btn) => {
      const isActive = btn.getAttribute("data-tool") === tool;
      btn.classList.toggle("fg-dock-btn--active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    if (tool === "hand") {
      showToast(lang === "fa" ? "ابزار دست (H): بوم را بکشید و جابه‌جا کنید" : "Hand Tool (H): Drag to pan canvas");
    } else if (tool === "comment") {
      showToast(lang === "fa" ? "ابزار کامنت (C): روی هر جای طرح کلیک کنید" : "Comment Tool (C): Click anywhere to drop a pin");
    }
  }

  function closeComposer() {
    pendingCommentPos = null;
    if (commentComposer) commentComposer.hidden = true;
    if (commentInput) commentInput.value = "";
  }

  function renderComments() {
    if (!commentsLayer) return;
    const list = commentsByTab[activeTabId] || [];
    commentsLayer.innerHTML = list
      .map(
        (c, idx) => `
      <div class="fg-comment-pin ${c.open ? "is-open" : ""} ${c.isOwner ? "is-owner" : ""}" style="left:${c.x.toFixed(2)}%;top:${c.y.toFixed(2)}%;" data-comment-id="${c.id}">
        <button type="button" class="fg-pin-badge" data-pin-toggle="${c.id}" aria-label="Comment ${idx + 1}">
          ${c.initials}
        </button>
        ${
          c.open
            ? `
          <div class="fg-pin-card">
            <div class="fg-pin-card__head">
              <strong>${escapeHtml(c.author)}</strong>
              <button type="button" class="fg-pin-resolve" data-pin-resolve="${c.id}" title="Resolve comment">✓</button>
            </div>
            <p class="fg-pin-card__text">${escapeHtml(c.text)}</p>
          </div>
        `
            : ""
        }
      </div>
    `
      )
      .join("");
  }

  commentsLayer?.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
  });

  commentsLayer?.addEventListener("click", (e) => {
    e.stopPropagation();
    const toggleBtn = e.target.closest("[data-pin-toggle]");
    if (toggleBtn) {
      const id = toggleBtn.getAttribute("data-pin-toggle");
      const list = commentsByTab[activeTabId] || [];
      list.forEach((c) => {
        c.open = c.id === id ? !c.open : false;
      });
      renderComments();
      return;
    }

    const resolveBtn = e.target.closest("[data-pin-resolve]");
    if (resolveBtn) {
      const id = resolveBtn.getAttribute("data-pin-resolve");
      commentsByTab[activeTabId] = (commentsByTab[activeTabId] || []).filter((c) => c.id !== id);
      renderComments();
    }
  });

  commentComposer?.addEventListener("pointerdown", (e) => e.stopPropagation());
  commentComposer?.addEventListener("click", (e) => e.stopPropagation());
  commentComposer?.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = (commentInput?.value || "").trim();
    if (!text || !pendingCommentPos) {
      closeComposer();
      return;
    }
    if (!commentsByTab[activeTabId]) commentsByTab[activeTabId] = [];
    commentsByTab[activeTabId].forEach((c) => {
      c.open = false;
    });
    commentsByTab[activeTabId].push({
      id: `c-${Date.now()}`,
      x: pendingCommentPos.x,
      y: pendingCommentPos.y,
      author: "Guest",
      initials: "G",
      isOwner: false,
      text,
      open: true,
    });
    closeComposer();
    renderComments();
  });

  function applyBox(el, box) {
    el.style.left = `${box.left}%`;
    el.style.top = `${box.top}%`;
    el.style.width = `${box.width}%`;
    el.style.height = `${box.height}%`;
  }

  function showHover(target) {
    if (!hoverBox) return;
    if (!target || activeTabId !== "dashify" || activeTool !== "move") {
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
    closeComposer();
    resetView();

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

    renderComments();
  }

  // Wire up Tabs, Dock Tools, Dev Mode, Zoom, Copy CSS
  stage.querySelectorAll("[data-figma-tab]").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.getAttribute("data-figma-tab")));
  });

  stage.querySelectorAll("[data-tool]").forEach((btn) => {
    btn.addEventListener("click", () => setTool(btn.getAttribute("data-tool")));
  });

  devToggleBtn?.addEventListener("click", () => setDevMode(!isDevMode));
  designTabBtn?.addEventListener("click", () => setDevMode(false));
  inspectTabBtn?.addEventListener("click", () => setDevMode(true));

  stage.querySelectorAll("[data-zoom]").forEach((btn) => {
    btn.addEventListener("click", () => setZoom(parseFloat(btn.getAttribute("data-zoom"))));
  });
  zoomResetBtn?.addEventListener("click", resetView);

  copyCssBtn?.addEventListener("click", async () => {
    const css = buildCssSnippet(currentInspectorData);
    try {
      await navigator.clipboard.writeText(css);
      copyCssBtn.textContent = "Copied ✓";
      window.setTimeout(() => {
        copyCssBtn.textContent = "Copy";
      }, 1500);
    } catch {
      copyCssBtn.textContent = "Copied";
    }
  });

  // Keyboard shortcuts when canvas is hovered or focused (ignoring text inputs)
  let stageHovered = false;
  stage.addEventListener("pointerenter", () => {
    stageHovered = true;
  });
  stage.addEventListener("pointerleave", () => {
    stageHovered = false;
  });

  window.addEventListener("keydown", (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
      if (e.key === "Escape") closeComposer();
      return;
    }
    if (!stageHovered) return;

    const key = e.key.toLowerCase();
    if (e.shiftKey && key === "d") {
      e.preventDefault();
      setDevMode(!isDevMode);
    } else if (key === "v") {
      setTool("move");
    } else if (key === "h") {
      setTool("hand");
    } else if (key === "c") {
      setTool("comment");
    } else if (key === "escape") {
      closeComposer();
      setTool("move");
    }
  });

  // Initial state
  selectTarget(DASHIFY_TARGETS[0]);
  alirezaCursor.style.left = `${DASHIFY_TARGETS[0].cursorAim.x}%`;
  alirezaCursor.style.top = `${DASHIFY_TARGETS[0].cursorAim.y}%`;
  renderComments();

  let guestOverrideUntil = 0;

  // Interactive Guest Cursor, Hand Panning, Comment Dropping & Click-to-Inspect
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (guestCursor && finePointer) {
    canvas.addEventListener("pointerenter", () => {
      canvas.classList.add("is-guest-hover");
      stage.classList.add("is-guest-active");
    });

    canvas.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      guestCursor.style.transform = `translate3d(${(e.clientX - rect.left).toFixed(1)}px, ${(e.clientY - rect.top).toFixed(1)}px, 0)`;

      if (isPanning) {
        const dx = e.clientX - panStartX;
        const dy = e.clientY - panStartY;
        const limitX = 240 * zoom;
        const limitY = 170 * zoom;
        panX = Math.max(-limitX, Math.min(limitX, panOriginX + dx));
        panY = Math.max(-limitY, Math.min(limitY, panOriginY + dy));
        applyTransform(false);
      }
    });

    canvas.addEventListener("pointerleave", () => {
      canvas.classList.remove("is-guest-hover");
      stage.classList.remove("is-guest-active");
      showHover(null);
      if (isPanning) {
        isPanning = false;
        canvas.classList.remove("is-panning");
      }
    });
  }

  // Hand Tool Panning & Comment Dropping (works on mouse + touch!)
  canvas.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".fg-bottom-dock, .fg-zoom-bar, .fg-comment-composer, .fg-comment-pin")) return;

    if (activeTool === "hand") {
      isPanning = true;
      panStartX = e.clientX;
      panStartY = e.clientY;
      panOriginX = panX;
      panOriginY = panY;
      canvas.classList.add("is-panning");
      canvas.setPointerCapture?.(e.pointerId);
      guestOverrideUntil = Date.now() + 6000;
      return;
    }

    if (activeTool === "comment") {
      const abRect = artboard.getBoundingClientRect();
      const relX = ((e.clientX - abRect.left) / abRect.width) * 100;
      const relY = ((e.clientY - abRect.top) / abRect.height) * 100;

      if (relX >= 0 && relX <= 100 && relY >= 0 && relY <= 100) {
        pendingCommentPos = {
          x: Math.max(4, Math.min(92, relX)),
          y: Math.max(6, Math.min(90, relY)),
        };
        if (commentComposer) {
          commentComposer.style.left = `${Math.min(72, pendingCommentPos.x)}%`;
          commentComposer.style.top = `${Math.min(78, pendingCommentPos.y)}%`;
          commentComposer.hidden = false;
          window.setTimeout(() => commentInput?.focus(), 20);
        }
        guestOverrideUntil = Date.now() + 8000;
      } else {
        closeComposer();
      }
      return;
    }

    // Default Move tool click ping
    const rect = canvas.getBoundingClientRect();
    const ping = document.createElement("span");
    ping.className = "fg-click-ping";
    ping.style.left = `${(e.clientX - rect.left).toFixed(1)}px`;
    ping.style.top = `${(e.clientY - rect.top).toFixed(1)}px`;
    canvas.appendChild(ping);
    window.setTimeout(() => ping.remove(), 520);
  });

  window.addEventListener("pointerup", () => {
    if (isPanning) {
      isPanning = false;
      canvas.classList.remove("is-panning");
    }
  });

  artboard.querySelectorAll("[data-target-id]").forEach((el) => {
    const target = DASHIFY_TARGETS.find((t) => t.id === el.getAttribute("data-target-id"));
    if (!target) return;

    el.addEventListener("pointerenter", () => showHover(target));
    el.addEventListener("pointerleave", () => showHover(null));
    el.addEventListener("pointerdown", () => {
      if (activeTool !== "move") return;
      guestOverrideUntil = Date.now() + 5500;
      showHover(null);
      selectTarget(target);
    });
  });

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
      if (activeTabId !== "dashify" || activeTool !== "move" || Date.now() < guestOverrideUntil) continue;

      currentIdx = (currentIdx + 1) % DASHIFY_TARGETS.length;
      const next = DASHIFY_TARGETS[currentIdx];

      const aim = {
        x: next.cursorAim.x + (Math.random() - 0.5) * 2.0,
        y: next.cursorAim.y + (Math.random() - 0.5) * 2.0,
      };

      await animateCurveTo(aim, 960 + Math.random() * 260);
      if (activeTabId !== "dashify" || activeTool !== "move" || Date.now() < guestOverrideUntil) continue;

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
