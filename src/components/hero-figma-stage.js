/* ==========================================================================
   Hero Live Photorealistic Figma Design Stage (Inside Safari Browser Frame)
   Uses the real high-res Dashify UI inside an authentic macOS Safari + Figma
   interface with pixel-aligned percentage selection overlays, red smart guides,
   live Layers + Design Inspector sync, and Alireza's animated Figma cursor.
   ========================================================================== */

export function renderHeroFigmaStage() {
  return `
    <div class="figma-stage" dir="ltr" aria-label="Live animated Figma workspace inside Safari showing Alireza designing the Dashify dashboard">
      <!-- Authentic macOS Safari Top Chrome -->
      <div class="safari-bar">
        <div class="safari-left">
          <div class="safari-dots" aria-hidden="true">
            <span class="safari-dot safari-dot--red"></span>
            <span class="safari-dot safari-dot--yellow"></span>
            <span class="safari-dot safari-dot--green"></span>
          </div>
          <div class="safari-nav-arrows" aria-hidden="true">
            <span>‹</span>
            <span>›</span>
          </div>
        </div>

        <div class="safari-url">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="2.2"/>
            <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" stroke-width="2.2"/>
          </svg>
          <span>figma.com/design/alireza-farshchi/Dashify-System</span>
        </div>

        <div class="safari-right" aria-hidden="true">
          <span class="safari-ico">↑</span>
          <span class="safari-ico">+</span>
        </div>
      </div>

      <!-- Authentic Figma Top Toolbar -->
      <div class="figma-toolbar">
        <div class="figma-tools" aria-hidden="true">
          <span class="figma-logo-mark" title="Figma">
            <svg width="12" height="16" viewBox="0 0 38 57" fill="none">
              <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
              <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
              <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
              <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
              <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
            </svg>
          </span>
          <span class="figma-tool figma-tool--active" title="Move (V)">↖</span>
          <span class="figma-tool" title="Frame (F)">#</span>
          <span class="figma-tool" title="Rectangle (R)">▭</span>
          <span class="figma-tool" title="Pen (P)">✒</span>
          <span class="figma-tool" title="Text (T)">T</span>
          <span class="figma-tool" title="Component">❖</span>
        </div>

        <div class="figma-file-title">
          <span class="figma-file-folder">Product Systems /</span>
          <strong>Dashify — Overview Dashboard</strong>
        </div>

        <div class="figma-toolbar-right">
          <span class="figma-avatar figma-avatar--guest" id="figma-guest-avatar" title="Guest (You)">G</span>
          <span class="figma-avatar" title="Alireza Farshchi">AF</span>
          <span class="figma-share-pill">Share</span>
          <span class="figma-zoom">100%</span>
        </div>
      </div>

      <!-- Figma 3-Column Workspace -->
      <div class="figma-workspace">
        <!-- Left Layers Panel -->
        <aside class="figma-layers" aria-hidden="true">
          <div class="figma-panel-tabs">
            <span class="is-active">File</span>
            <span>Assets</span>
          </div>
          <div class="figma-panel-label">Layers</div>
          <div class="figma-layer figma-layer--root">▾ # Desktop — 1440 × 900</div>
          <div class="figma-layer figma-layer--child">◫ Sidebar / Navigation</div>
          <div class="figma-layer figma-layer--child figma-layer--k1">❖ KPI / Total Sales (Primary)</div>
          <div class="figma-layer figma-layer--child figma-layer--k2">❖ KPI / Total Orders</div>
          <div class="figma-layer figma-layer--child">❖ KPI / Visitor &amp; Sold</div>
          <div class="figma-layer figma-layer--child">❖ Card / Last Orders</div>
          <div class="figma-layer figma-layer--child figma-layer--k3">❖ Table / Recent Sales</div>
          <div class="figma-layer figma-layer--child figma-layer--k4">❖ Chart / Sales Expert</div>
        </aside>

        <!-- Center Infinite Dot-Grid Canvas -->
        <div class="figma-canvas" id="figma-canvas">
          <!-- Interactive Visitor Multiplayer Cursor ("Guest") -->
          <div class="figma-guest-cursor" id="figma-guest-cursor" aria-hidden="true">
            <svg width="18" height="20" viewBox="0 0 16 18" fill="none">
              <path
                d="M1.5 1.5L6.3 15.6L8.7 9.8L14.5 7.6L1.5 1.5Z"
                fill="#0ACF83"
                stroke="#FFFFFF"
                stroke-width="1.4"
                stroke-linejoin="round"
              />
            </svg>
            <span class="figma-guest-cursor__tag">Guest</span>
          </div>

          <div class="figma-canvas-frame-head">
            <span class="figma-frame-label">❖ Dashify / Overview — Desktop 1440</span>
            <span class="figma-frame-badge">Auto Layout</span>
          </div>

          <!-- Real High-Res Dashify UI Artboard with Percentage-Aligned Figma Overlays -->
          <div class="figma-artboard-wrap">
            <img
              class="figma-artboard-img"
              src="/assets/dashify-hero-ui.png"
              alt="Dashify dark analytics dashboard UI inside Figma canvas"
              width="1024"
              height="768"
              fetchpriority="high"
            />

            <!-- Selection Box 1: Blue Total Sales Card -->
            <div class="figma-sel figma-sel--1" aria-hidden="true">
              <i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>
              <span class="figma-dim">KPI / Primary · 248 × 148</span>
            </div>

            <!-- Red Smart Guide between Card 1 & Card 2 -->
            <div class="figma-guide-gap" aria-hidden="true">
              <span class="figma-guide-line"></span>
              <span class="figma-guide-pill">16</span>
            </div>

            <!-- Selection Box 2: Total Orders Card -->
            <div class="figma-sel figma-sel--2" aria-hidden="true">
              <i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>
              <span class="figma-dim">KPI / Orders · R16</span>
            </div>

            <!-- Selection Box 3: Recent Sales Table -->
            <div class="figma-sel figma-sel--3" aria-hidden="true">
              <i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>
              <span class="figma-dim">Table / Recent Sales · Auto Layout</span>
            </div>

            <!-- Selection Box 4: Sales Expert Chart -->
            <div class="figma-sel figma-sel--4" aria-hidden="true">
              <i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>
              <span class="figma-dim">Chart / Sales Expert · #165EF6</span>
            </div>

            <!-- Animated Multiplayer Figma Cursor ("Alireza") -->
            <div class="figma-cursor" aria-hidden="true">
              <svg width="18" height="20" viewBox="0 0 16 18" fill="none">
                <path
                  d="M1.5 1.5L6.3 15.6L8.7 9.8L14.5 7.6L1.5 1.5Z"
                  fill="#165EF6"
                  stroke="#FFFFFF"
                  stroke-width="1.4"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="figma-cursor__tag">Alireza</span>
            </div>
          </div>
        </div>

        <!-- Right Figma Design Inspector Panel -->
        <aside class="figma-inspector" aria-hidden="true">
          <div class="figma-panel-tabs">
            <span class="is-active">Design</span>
            <span>Prototype</span>
          </div>

          <div class="figma-insp-section">
            <div class="figma-panel-label">Position &amp; Layout</div>
            <div class="figma-prop-grid">
              <span>X <em>112</em></span>
              <span>Y <em>148</em></span>
              <span>W <em>1440</em></span>
              <span>H <em>900</em></span>
              <span>R <em>16</em></span>
              <span>G <em>16</em></span>
            </div>
          </div>

          <div class="figma-insp-section">
            <div class="figma-panel-label">Auto Layout</div>
            <div class="figma-al-pills">
              <span>→ 16px</span>
              <span>⊞ 24px</span>
            </div>
          </div>

          <div class="figma-insp-section">
            <div class="figma-panel-label">Color Tokens</div>
            <div class="figma-token-row">
              <span class="figma-swatch"></span>
              <span>blue / 500</span>
              <em>#165EF6</em>
            </div>
            <div class="figma-token-row">
              <span class="figma-swatch figma-swatch--sky"></span>
              <span>sky / 400</span>
              <em>#57C1FF</em>
            </div>
            <div class="figma-token-row">
              <span class="figma-swatch figma-swatch--dark"></span>
              <span>surface / 950</span>
              <em>#0B0C10</em>
            </div>
          </div>

          <div class="figma-insp-section">
            <div class="figma-panel-label">Effects</div>
            <div class="figma-token-row">
              <span>Drop shadow · Soft 24</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}
