# North Lions design demos

Three independent visual prototypes of a Lions Club member portal, shared for
design review. All names, events, roles and financial amounts are demonstration
data. These pages do not connect to any production system, API or database.

- Version 1: forest-green club lounge with replaceable theme templates at `v1/index.html`.
- Version 2: violet and lime editorial design at `v2/index.html`.
- Version 3: futuristic interactive 3D portal at `v3/index.html`.
- `index.html` links to all three versions. Versions 2 and 3 remain unchanged in this template update.

Business-demo interactions run in browser memory only and reset on refresh. No authentication,
payments, real registrations, member records, messaging or analytics.
Version 1 stores only one device-local template ID preference in browser localStorage;
all appearance choices work even when storage is blocked. No personal data is stored.
Fonts load from Google Fonts, with system-font fallbacks. All imagery is local.
Static HTML/CSS/JavaScript requires no build dependencies. `.nojekyll` disables
Jekyll processing for branch-based GitHub Pages publication.

Version 1 opens in the original forest-green style by default. Use the top-bar
template picker to apply green, navy or ivory, or restore the default. This changes
only appearance without resetting the current demo's content or registrations.
See [template extension contract](v1/TEMPLATES.md) for adding another template
without changing the business-demo logic. Templates do not set a club-wide default
or sync between devices. No production website has been modified.

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
