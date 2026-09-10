'use strict';
// Each theme is a COMPLETE layout with its own HTML/CSS/assets. Not a color preset.
(() => {
  const root=new URL('../',document.currentScript.src);
  const key='north-lions.demo.full-theme.v1';
  const catalog=window.NorthLionsThemeCatalog;
  if(!catalog||!Array.isArray(catalog.themes)||!catalog.themes.length)return;
  const ids=new Set();
  const themes=Object.freeze(catalog.themes.map(theme=>{
    if(!/^[a-z][a-z0-9-]{0,31}$/.test(theme.id)||ids.has(theme.id)||! /^[a-z][a-z0-9-]*\/$/.test(theme.path)||! /^(?:[a-zA-Z0-9_-]+\/)+[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp)$/.test(theme.image)||typeof theme.name!=='string'||typeof theme.description!=='string')throw Error('Invalid built-in theme definition');
    ids.add(theme.id);return Object.freeze({...theme});
  }));
  const defaultId=ids.has(catalog.defaultId)?catalog.defaultId:themes[0].id;
  const find=id=>themes.find(theme=>theme.id===id);
  function preferred(){
    try{const raw=localStorage.getItem(key);if(raw&&raw.length<=100){const data=JSON.parse(raw);if(data&&data.version===1&&find(data.theme))return data.theme;}}catch{}
    return defaultId;
  }
  function remember(id){
    if(!find(id))return false;
    try{localStorage.setItem(key,JSON.stringify({version:1,theme:id}));return true;}catch{return false;}
  }
  window.NorthLionsThemes=Object.freeze({themes,defaultId,storageKey:key,preferred,remember,
    url(id){const theme=find(id);return theme?new URL(theme.path,root).href:null;},
    image(id){const theme=find(id);return theme?new URL(theme.image,root).href:null;},
  });
})();
