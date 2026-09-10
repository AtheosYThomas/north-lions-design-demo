'use strict';
(() => {
  const registry=window.NorthLionsThemes;
  const trigger=document.querySelector('#layout-theme-trigger');
  const current=document.documentElement.dataset.siteTheme;
  if(!registry||!trigger||!registry.url(current))return;
  const dialog=document.createElement('dialog');dialog.id='layout-theme-dialog';
  dialog.setAttribute('aria-labelledby','layout-theme-title');dialog.setAttribute('aria-describedby','layout-theme-description');
  dialog.innerHTML='<div class="layout-dialog-top"><span>PORTAL THEMES</span><button type="button" class="layout-close" aria-label="關閉主題選擇">×</button></div><h2 id="layout-theme-title">不同主題，同一個入口。</h2><p id="layout-theme-description">切換完整的版面、主視覺與元件樣式。</p><fieldset class="layout-options"><legend class="sr-only">選擇整套網站主題</legend></fieldset><p class="layout-note">各主題共用入口功能與示範活動狀態。偏好僅在瀏覽器允許儲存時保留，不變更正式網站設定。</p><p class="layout-status" role="status"></p><div class="layout-actions"><a class="layout-default">還原第一版</a><a class="layout-apply">套用完整主題</a></div>';
  document.body.append(dialog);
  const options=dialog.querySelector('.layout-options'),apply=dialog.querySelector('.layout-apply'),restore=dialog.querySelector('.layout-default'),status=dialog.querySelector('.layout-status');
  for(const theme of registry.themes){
    const label=document.createElement('label');label.className='layout-option';label.dataset.layoutOption=theme.id;
    const input=document.createElement('input');input.type='radio';input.name='portal-theme';input.value=theme.id;
    const image=document.createElement('img');image.src=registry.image(theme.id);image.alt='';image.width=112;image.height=78;image.loading='lazy';
    const text=document.createElement('span');text.className='layout-option-text';
    const title=document.createElement('strong');title.textContent=theme.name;
    const description=document.createElement('small');description.textContent=theme.description;
    const badge=document.createElement('span');badge.className='layout-current';badge.textContent=theme.id===current?'目前使用':theme.id===registry.defaultId?'預設主題':'';
    text.append(title,description,badge);label.append(input,image,text);options.append(label);
    input.addEventListener('change',()=>{apply.href=registry.url(input.value);});
  }
  restore.href=registry.url('v1');
  function close(){dialog.close();}
  trigger.addEventListener('click',()=>{
    options.querySelectorAll('input').forEach(input=>{input.checked=input.value===current;});apply.href=registry.url(current);
    const stored=window.NorthLionsDemoState?.persist();
    status.textContent=stored===false?'瀏覽器未允許保留示範狀態；切換主題仍可使用，但示範報名會回到初始值。':'';
    dialog.showModal();options.querySelector('input:checked').focus();
  });
  dialog.querySelector('.layout-close').addEventListener('click',close);
  dialog.addEventListener('close',()=>trigger.focus());
  function navigate(event,id){
    if(!registry.url(id)){event.preventDefault();return;}
    registry.remember(id);window.NorthLionsDemoState?.persist();
    if(id===current){event.preventDefault();close();}
    // All other choices follow their fixed same-origin native link; no arbitrary URLs.
  }
  apply.addEventListener('click',event=>navigate(event,options.querySelector('input:checked')?.value));
  restore.addEventListener('click',event=>navigate(event,'v1'));
})();
