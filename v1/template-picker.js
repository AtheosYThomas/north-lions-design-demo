'use strict';

// Appearance UI is independent of app.js and its demonstration data.
(() => {
  const templates = window.NorthLionsTemplates;
  const dialog = document.querySelector('#template-dialog');
  const trigger = document.querySelector('#template-trigger');
  const options = document.querySelector('#template-options');
  const status = document.querySelector('#template-status');
  if (!templates || !dialog || !trigger || !options || !status) return;
  for (const template of templates.definitions) {
    const label = document.createElement('label');
    label.className = 'template-option';
    label.dataset.templateOption = template.id;
    const input = document.createElement('input');
    input.type = 'radio'; input.name = 'lounge-template'; input.value = template.id;
    const preview = document.createElement('span');
    preview.className = 'template-preview'; preview.setAttribute('aria-hidden', 'true');
    for (const part of ['rail', 'hero', 'card', 'line']) {
      const element = document.createElement('span'); element.className = 'preview-' + part; preview.append(element);
    }
    const text = document.createElement('span'); text.className = 'template-option-text';
    const name = document.createElement('strong'); name.textContent = template.name;
    const description = document.createElement('small'); description.textContent = template.description;
    text.append(name, description); label.append(input, preview, text); options.append(label);
  }
  function syncSelection() {
    options.querySelectorAll('input').forEach(input => { input.checked = input.value === templates.currentId; });
  }
  trigger.addEventListener('click', () => {
    syncSelection(); status.textContent = ''; dialog.showModal();
    options.querySelector('input:checked').focus();
  });
  document.querySelector('#template-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => trigger.focus());
  document.querySelector('#template-apply').addEventListener('click', () => {
    const input = options.querySelector('input:checked');
    if (!input) return;
    const result = templates.apply(input.value);
    if (!result.applied) { status.textContent = '這個模板目前無法使用，請重新選擇。'; return; }
    const name = templates.definitions.find(item => item.id === templates.currentId).name;
    status.textContent = result.saved ? `已套用「${name}」，下次開啟會保留。` : `已套用「${name}」。瀏覽器未允許儲存，重新開啟可能回到預設。`;
  });
  document.querySelector('#template-reset').addEventListener('click', () => {
    const result = templates.reset(); syncSelection();
    status.textContent = result.saved ? '已還原「墨綠精品會所」預設模板。' : '已還原墨綠外觀；瀏覽器未允許清除偏好，下次開啟可能仍採用先前選擇。';
  });
})();
