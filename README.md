# North Lions design demos

Three complete interchangeable layout themes of a Lions Club member portal, shared for
design review. All names, events, roles and financial amounts are demonstration
data. These pages do not connect to any production system, API or database.

- Version 1: original forest-green club lounge at `v1/index.html` (default).
- Version 2: violet and lime editorial design at `v2/index.html`.
- Version 3: futuristic interactive 3D portal at `v3/index.html`.
- `portal/index.html` is the stable entry: the stored full theme, otherwise v1.
- `index.html` compares the three themes. Each theme has the same full-theme picker.

All three load the same `shared/app.js` demonstration logic, with no authentication,
payments, real registrations, member records, messaging or analytics.
localStorage holds only a versioned full-theme ID. sessionStorage holds only fixed
fictional event IDs and a filter so a theme switch retains the demo's current state.
Profile input is never stored. Storage denial leaves the demo usable and the picker
warns that fictional activity state will reset on navigation. Preferences and demo
state do not sync across devices. No personal data is stored.
Fonts load from Google Fonts, with system-font fallbacks. All imagery is local.
Static HTML/CSS/JavaScript requires no build dependencies. `.nojekyll` disables
Jekyll processing for branch-based GitHub Pages publication.

Use「切換主題」to switch the entire v1, v2 or v3 layout, or「還原第一版」.
This replaces composition, imagery and component styles, not just color tokens.
The picker renders an extensible `shared/theme-catalog.js`; add a complete new
theme folder and catalog definition to add a fourth/fifth option without editing
the picker or common member-service logic. It is not limited to three themes.
All original per-version CSS/artwork and the v3 WebGL renderer are preserved.
Direct v1/v2/v3 links intentionally open that exact design; `portal/` follows the
last saved choice. See [theme contract](THEMES.md) for extension instructions.
No production website or club-wide setting has been modified.

The superseded v1-only green/navy/ivory picker scripts/styles and old per-version
app scripts remain as unreferenced historical source. They are not loaded by any
active page, and their old browser preference is ignored.

Version 3 uses an original real-time WebGL procedural geometry shader, not a
prerendered rotation video. Drag or use arrow keys to rotate; pause and reset are
available. Motion pauses off-screen and respects reduced-motion preferences.
If WebGL is unavailable or lost, an existing image is shown and explicitly labeled
as static. The shader requires no external library or image-generation service.

## Asset credits

Mountain photograph: “Alishan valley at sunrise” by Eric BARBEAU,
[Unsplash source](https://unsplash.com/photos/green-mountains-under-white-sky-during-daytime-JgFTqBHIHFE),
[Unsplash License](https://unsplash.com/license). Atmospheric illustration, not a
photograph of an actual club event or its announced destination.

Violet chrome sculpture: original ImageGen-generated artwork for this demo.
Club emblem: existing Lions Club logo supplied by the project. No affiliation or
endorsement beyond this design demonstration is asserted.
