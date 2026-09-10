'use strict';
// A stable entry URL; direct /v1/, /v2/, /v3/ links intentionally keep that theme.
const selectedTheme=window.NorthLionsThemes?.preferred();
const selectedUrl=window.NorthLionsThemes?.url(selectedTheme);
if(selectedUrl)window.location.replace(selectedUrl);
