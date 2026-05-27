/**
 * BICOM PÍSEK — GEO-Marketing Module
 */
export async function render(container, ctx) {
  const { api, showToast } = ctx;
  let geoData = getDemoGeo();
  if (api) {
    const res = await api.getGeoAnalytics();
    if (res.ok && res.data) geoData = res.data;
  }

  const cities = geoData.cities || [];
  const maxCount = Math.max(...cities.map((c) => c.count), 1);

  container.innerHTML = `
    <div class="canvas-header">
      <h1 class="canvas-title">GEO-Marketing</h1>
      <p class="canvas-subtitle">Odkud přicházejí poptávky — analytika a doporučení kampaní</p>
    </div>
    <div class="grid-2 gap-6">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📍 Rozložení poptávek</h3>
          <span class="badge badge-new">Live data</span>
        </div>
        <div class="card-body">
          ${cities.map((c) => {
            const pct = Math.round((c.count / maxCount) * 100);
            return `<div class="geo-bar-item">
              <div class="flex justify-between items-center mb-2">
                <span style="font-size:var(--text-sm);font-weight:500;">${esc(c.name)}</span>
                <span style="font-size:var(--text-xs);color:var(--c-sage);">${c.count} poptávek</span>
              </div>
              <div class="geo-bar"><div class="geo-bar-fill" style="width:${pct}%;"></div></div>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">💡 Doporučení AI</h3>
        </div>
        <div class="card-body">
          ${(geoData.recommendations || getDemoRecommendations()).map((r) => `
            <div class="card mb-4" style="border-left: 3px solid var(--c-champagne); padding: var(--sp-3) var(--sp-4);">
              <p style="font-size:var(--text-sm);font-weight:500;margin-bottom:var(--sp-1);">${esc(r.title)}</p>
              <p style="font-size:var(--text-xs);color:var(--c-sage);">${esc(r.description)}</p>
            </div>
          `).join('')}
          <button class="btn btn-secondary btn-sm mt-4" onclick="this.textContent='Generuji…';setTimeout(()=>this.textContent='🔄 Obnovit doporučení',2000)">🔄 Obnovit doporučení</button>
        </div>
      </div>
    </div>
  `;
}
export function destroy() {}

function getDemoGeo() {
  return {
    cities: [
      { name: 'Písek', count: 42 },
      { name: 'Strakonice', count: 15 },
      { name: 'Vodňany', count: 11 },
      { name: 'Protivín', count: 7 },
      { name: 'Milevsko', count: 4 },
      { name: 'České Budějovice', count: 3 },
      { name: 'Týn nad Vltavou', count: 2 },
    ],
    recommendations: null,
  };
}

function getDemoRecommendations() {
  return [
    { title: 'Nárůst z Vodňan (+38% MoM)', description: 'Zvažte lokální kampaň zaměřenou na pylové alergie — sezóna začíná.' },
    { title: 'Strakonice stabilní', description: 'Nejvíce poptávek na „energii a vitalitu". Doporučuji tematický článek na blog.' },
    { title: 'České Budějovice — nový trh', description: '3 poptávky za měsíc. Otestujte geo-cílený příspěvek na sociální sítě.' },
  ];
}

function esc(s) { if (!s) return ''; const e = document.createElement('span'); e.textContent = s; return e.innerHTML; }
