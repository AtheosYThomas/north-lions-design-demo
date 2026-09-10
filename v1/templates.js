'use strict';

// Template registry and device-local appearance preference only.
// Add a reviewed definition here and a matching token block in themes.css.
(() => {
  const definitions = Object.freeze([
    Object.freeze({ id: 'clubhouse', name: '墨綠精品會所', description: '原版墨綠、霧金與山景，沉穩而溫暖。', color: '#163c35' }),
    Object.freeze({ id: 'navy', name: '深海藍經典', description: '深藍、銀灰與俐落字體，清晰而從容。', color: '#172f4d' }),
    Object.freeze({ id: 'ivory', name: '暖白典藏', description: '暖白、胡桃棕與細緻襯線，簡淨而優雅。', color: '#493b32' }),
  ]);
  const defaultId = 'clubhouse';
  const storageKey = 'north-lions.demo.lounge-template.v1';
  const find = id => definitions.find(item => item.id === id);
  let currentId = defaultId;
  function paint(id) {
    const definition = find(id);
    if (!definition) return false;
    currentId = id;
    document.documentElement.dataset.template = id;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = definition.color;
    return true;
  }
  function apply(id) {
    if (!paint(id)) return { applied: false, saved: false };
    let saved = false;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ version: 1, template: id }));
      saved = true;
    } catch { /* Appearance still works when browser storage is unavailable. */ }
    return { applied: true, saved };
  }
  function reset() {
    paint(defaultId);
    let saved = false;
    try { localStorage.removeItem(storageKey); saved = true; } catch { /* No other storage is touched. */ }
    return { applied: true, saved };
  }
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw && raw.length < 200) {
      const stored = JSON.parse(raw);
      if (stored && stored.version === 1 && find(stored.template)) paint(stored.template);
    }
  } catch { /* Invalid or denied preferences safely retain the green default. */ }
  paint(currentId);
  window.NorthLionsTemplates = Object.freeze({
    definitions, defaultId, storageKey,
    get currentId() { return currentId; },
    apply, reset,
  });
})();
