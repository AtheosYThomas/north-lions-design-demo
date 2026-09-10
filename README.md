# North Lions design demos

Three independent visual prototypes of a Lions Club member portal, shared for
design review. All names, events, roles and financial amounts are demonstration
data. These pages do not connect to any production system, API or database.

- Version 1: forest-green club lounge at `v1/index.html`.
- Version 2: violet and lime editorial design at `v2/index.html`.
- Version 3: futuristic interactive 3D portal at `v3/index.html`.
- `index.html` links to all three versions. Versions 1 and 2 remain unchanged.

Interactions run in browser memory only and reset on refresh. No authentication,
payments, real registrations, member records, messaging, analytics or storage.
Fonts load from Google Fonts, with system-font fallbacks. All imagery is local.
Static HTML/CSS/JavaScript requires no build dependencies. `.nojekyll` disables
Jekyll processing for branch-based GitHub Pages publication.

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
