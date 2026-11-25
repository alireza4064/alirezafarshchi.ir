/* ==========================================================================
   Hero Live Figma Design Stage (Inside Safari Browser Frame)
   Choreographed 60fps CSS motion: Alireza's Figma cursor actively selecting,
   aligning, and styling the Dashify dark dashboard UI with bounding boxes,
   smart-guide spacing badges, and live layer highlights.
   ========================================================================== */

export function renderHeroFigmaStage() {
  return `
    <div class="figma-stage" dir="ltr" aria-label="Animated Figma workspace inside Safari showing Alireza designing the Dashify analytics dashboard">
      <!-- Safari Browser Chrome -->
      <div class="safari-bar">
        <div class="safari-dots" aria-hidden="true">
          <span class="safari-dot safari-dot--red"></span>
          <span class="safari-dot safari-dot--yellow"></span>
          <span class="safari-dot safari-dot--green"></span>
        </div>
        <div class="safari-url">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="2.2"/>
            <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" stroke-width="2.2"/>
          </svg>
          <span>figma.com/design/alireza-system</span>
        </div>
        <div class="safari-actions" aria-hidden="true">
          <span></span><span></span>
        </div>
      </div>

      <!-- Figma Top Toolbar -->
      <div class="figma-toolbar">
        <div class="figma-tools" aria-hidden="true">
          <span class="figma-tool figma-tool--active" title="Move">↖</span>
          <span class="figma-tool" title="Frame">#</span>
          <span class="figma-tool" title="Component">❖</span>
          <span class="figma-tool" title="Text">T</span>
        </div>
        <div class="figma-file-title">
          <span class="figma-file-folder">Dashify /</span>
          <strong>Overview UI</strong>
        </div>
        <div class="figma-toolbar-right">
          <span class="figma-avatar" title="Alireza">AF</span>
          <span class="figma-share-pill">Share</span>
        </div>
      </div>

      <!-- Figma Workspace Body -->
      <div class="figma-workspace">
        <!-- Left Layers Sidebar -->
        <aside class="figma-layers" aria-hidden="true">
          <div class="figma-panel-label">Layers</div>
          <div class="figma-layer figma-layer--root"># Dashify / Desktop</div>
          <div class="figma-layer figma-layer--child figma-layer--k1">❖ KPI / Total Sales</div>
          <div class="figma-layer figma-layer--child figma-layer--k2">❖ KPI / Total Orders</div>
          <div class="figma-layer figma-layer--child figma-layer--k3">❖ Table / Recent Sales</div>
          <div class="figma-layer figma-layer--child figma-layer--k4">❖ Chart / Sales Expert</div>
        </aside>

        <!-- Center Figma Canvas -->
        <div class="figma-canvas">
          <div class="figma-frame-label">Desktop — 1440 × 900</div>

          <!-- Dashify Dark Dashboard Artboard (faithful to user's uploaded design) -->
          <div class="dashify-artboard">
            <!-- Left Mini Sidebar -->
            <div class="dash-side" aria-hidden="true">
              <div class="dash-logo">
                <span></span><span></span>
              </div>
              <div class="dash-nav-dot dash-nav-dot--active"></div>
              <div class="dash-nav-dot"></div>
              <div class="dash-nav-dot"></div>
              <div class="dash-nav-dot"></div>
              <div class="dash-side-spacer"></div>
              <div class="dash-nav-dot"></div>
            </div>

            <!-- Main Dashboard Content -->
            <div class="dash-main">
              <div class="dash-top">
                <span class="dash-heading">Overview</span>
                <div class="dash-top-icons" aria-hidden="true">
                  <span class="dash-pill-icon"></span>
                  <span class="dash-pill-icon"></span>
                  <span class="dash-user-dot"></span>
                </div>
              </div>

              <!-- KPI Row -->
              <div class="dash-kpis">
                <!-- Card 1: Primary Blue Total Sales (animated selection target 1) -->
                <div class="dash-kpi dash-kpi--blue dash-target-1">
                  <div class="dash-kpi__head">
                    <span class="dash-kpi__ico"></span>
                    <span class="dash-badge dash-badge--up">+7.8%</span>
                  </div>
                  <div class="dash-kpi__label">Total Sales</div>
                  <div class="dash-kpi__val">$425.<span>103</span></div>
                  <!-- Figma Selection Overlay 1 -->
                  <div class="figma-sel figma-sel--1" aria-hidden="true">
                    <i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>
                    <span class="figma-dim">164 × 76</span>
                  </div>
                </div>

                <!-- Smart Guide Spacing Indicator between Card 1 and Card 2 -->
                <div class="figma-guide-gap" aria-hidden="true">
                  <span>12</span>
                </div>

                <!-- Card 2: Total Orders (animated selection target 2) -->
                <div class="dash-kpi dash-target-2">
                  <div class="dash-kpi__head">
                    <span class="dash-kpi__ico dash-kpi__ico--amber"></span>
                    <span class="dash-badge dash-badge--down">-2.5%</span>
                  </div>
                  <div class="dash-kpi__label">Total Orders</div>
                  <div class="dash-kpi__val">4251</div>
                  <div class="figma-sel figma-sel--2" aria-hidden="true">
                    <i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>
                    <span class="figma-dim">Auto · 12px</span>
                  </div>
                </div>

                <!-- Card 3: Visitor -->
                <div class="dash-kpi">
                  <div class="dash-kpi__head">
                    <span class="dash-kpi__ico dash-kpi__ico--purple"></span>
                    <span class="dash-badge dash-badge--down">-12%</span>
                  </div>
                  <div class="dash-kpi__label">Visitor</div>
                  <div class="dash-kpi__val">64321</div>
                </div>

                <!-- Card 4: Sold Products -->
                <div class="dash-kpi dash-kpi--hide-sm">
                  <div class="dash-kpi__head">
                    <span class="dash-kpi__ico dash-kpi__ico--rose"></span>
                    <span class="dash-badge dash-badge--up">+20%</span>
                  </div>
                  <div class="dash-kpi__label">Sold</div>
                  <div class="dash-kpi__val">16324</div>
                </div>
              </div>

              <!-- Lower Split: Recent Sales Table + Sales Expert Chart -->
              <div class="dash-lower">
                <!-- Recent Sales Table (animated selection target 3) -->
                <div class="dash-panel dash-target-3">
                  <div class="dash-panel__head">
                    <span class="dash-panel__title">Recent Sales</span>
                    <span class="dash-panel__meta">132 Items</span>
                  </div>
                  <div class="dash-table">
                    <div class="dash-tr">
                      <span class="dash-prod">MacBook Pro 13"</span>
                      <span class="dash-status dash-status--paid">Paid</span>
                      <span class="dash-amt">$1,799</span>
                    </div>
                    <div class="dash-tr">
                      <span class="dash-prod">AirPods Max</span>
                      <span class="dash-status dash-status--unpaid">Unpaid</span>
                      <span class="dash-amt">$549</span>
                    </div>
                    <div class="dash-tr">
                      <span class="dash-prod">Apple Watch S9</span>
                      <span class="dash-status dash-status--paid">Paid</span>
                      <span class="dash-amt">$399</span>
                    </div>
                  </div>
                  <div class="figma-sel figma-sel--3" aria-hidden="true">
                    <i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>
                    <span class="figma-dim">Table / 3 rows</span>
                  </div>
                </div>

                <!-- Sales Expert Sparkline Card (animated selection target 4) -->
                <div class="dash-panel dash-target-4">
                  <div class="dash-panel__head">
                    <span class="dash-panel__title">Sales Expert</span>
                  </div>
                  <div class="dash-expert-val"><span>$</span>48,654.<small>00</small></div>
                  <svg class="dash-chart" viewBox="0 0 140 46" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="dashLineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#165EF6" stop-opacity="0.35" />
                        <stop offset="100%" stop-color="#165EF6" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M2 38 C16 36, 22 24, 34 26 C44 28, 50 8, 62 12 C74 16, 78 28, 92 22 C104 16, 114 34, 138 14 L138 46 L2 46 Z"
                      fill="url(#dashLineGrad)"
                    />
                    <path
                      class="dash-chart-line"
                      d="M2 38 C16 36, 22 24, 34 26 C44 28, 50 8, 62 12 C74 16, 78 28, 92 22 C104 16, 114 34, 138 14"
                      stroke="#2B6FF8"
                      stroke-width="2.2"
                      stroke-linecap="round"
                    />
                    <circle class="dash-chart-dot" cx="62" cy="12" r="3.2" fill="#57C1FF" stroke="#0B0C10" stroke-width="1.5" />
                  </svg>
                  <div class="figma-sel figma-sel--4" aria-hidden="true">
                    <i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>
                    <span class="figma-dim">Token / primary</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Animated Multiplayer Figma Cursor ("Alireza") -->
          <div class="figma-cursor" aria-hidden="true">
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
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

        <!-- Right Compact Inspector -->
        <aside class="figma-inspector" aria-hidden="true">
          <div class="figma-panel-label">Design</div>
          <div class="figma-prop-grid">
            <span>W <em>1440</em></span>
            <span>H <em>900</em></span>
            <span>R <em>14</em></span>
            <span>G <em>12</em></span>
          </div>
          <div class="figma-panel-label" style="margin-top:10px;">Fill Token</div>
          <div class="figma-token-row">
            <span class="figma-swatch"></span>
            <span>primary/500</span>
          </div>
          <div class="figma-token-row">
            <span class="figma-swatch figma-swatch--dark"></span>
            <span>surface/950</span>
          </div>
          <div class="figma-panel-label" style="margin-top:10px;">Auto Layout</div>
          <div class="figma-al-pills">
            <span>→ 12</span>
            <span>⊞ 14</span>
          </div>
        </aside>
      </div>
    </div>
  `;
}
