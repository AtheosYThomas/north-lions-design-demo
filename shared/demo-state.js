'use strict';
// Fixed fictional IDs only. No profile, member identity, account or financial data.
(() => {
  const key='north-lions.demo.portal-state.v1';
  const eventIds=['meeting','service','social'];
  const filters=['all',...eventIds];
  let state={version:1,registrations:['meeting','service'],filter:'all'};
  let persistent=true;
  try {
    const raw=sessionStorage.getItem(key);
    if(raw && raw.length<=300){
      const saved=JSON.parse(raw);
      if(saved && saved.version===1 && Array.isArray(saved.registrations) && saved.registrations.length<=3 && saved.registrations.every(id=>eventIds.includes(id)) && filters.includes(saved.filter))
        state={version:1,registrations:[...new Set(saved.registrations)],filter:saved.filter};
    }
  } catch { persistent=false; }
  function persist(){
    try { sessionStorage.setItem(key,JSON.stringify(state));persistent=true; }
    catch { persistent=false; }
    return persistent;
  }
  window.NorthLionsDemoState=Object.freeze({
    get registrationIds(){return [...state.registrations];},
    get filter(){return state.filter;},
    get persistent(){return persistent;},
    storageKey:key,
    register(id){if(!eventIds.includes(id))return false;if(!state.registrations.includes(id))state.registrations.push(id);persist();return true;},
    setFilter(id){if(!filters.includes(id))return false;state.filter=id;persist();return true;},
    persist,
  });
})();
