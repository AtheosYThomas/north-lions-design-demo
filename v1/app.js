'use strict';

// An isolated visual prototype. No SDKs, API requests, storage, or real member data.
const iconPaths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/><circle cx="9" cy="7" r="4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m-13 4h2m4 0h2m-8 3h2"/>',
  megaphone: '<path d="m3 11 18-6v14L3 15zm4 6 1 5h4l-2-6M3 11v4"/>',
  wallet: '<path d="M20 8V5a2 2 0 0 0-2-2L4 6a2 2 0 0 0-1 2v11a2 2 0 0 0 2 2h15V8H5a2 2 0 0 1-2-2m17 7h-5v4h5"/><path d="M16 15h.01"/>',
  receipt: '<path d="M5 3h14v19l-3-2-4 2-4-2-3 2V3zm4 5h6m-6 4h6m-6 4h3"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
  user: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  external: '<path d="M15 3h6v6m0-6L10 14m-1-9H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3m0 3h.01"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-11 12a2 2 0 0 0 4 0"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  sparkle: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
};
function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((element) => {
    element.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[element.dataset.icon] || iconPaths.info}</svg>`;
  });
}
hydrateIcons();

const dialog = document.querySelector('#detail-dialog');
const content = document.querySelector('#dialog-content');
const sidebar = document.querySelector('#sidebar');
const shade = document.querySelector('#sidebar-shade');
const menuButton = document.querySelector('#menu-button');
const demoRegistrations = new Set(['meeting', 'service']);
let priorFocus = null;
let toastTimer;

const eventData = {
  meeting: { title: '九月例會・把好事聚在一起', date: '2026.09.18（五）', time: '18:30–21:00', place: '三峽北大特區', type: '每月例會', copy: '留一個晚上，和熟悉的獅友坐下來聊聊。分享最近的服務故事，也一起討論接下來想完成的好事。', fee: '示意活動・免費' },
  service: { title: '用一個上午，讓社區更美好', date: '2026.09.26（六）', time: '09:00–12:00', place: '三峽社區', type: '公益服務', copy: '從身邊的街道開始，為社區多做一點事。和獅友一起參與環境整理，用實際行動照顧我們生活的地方。', fee: '示意活動・免費' },
  social: { title: '走進山裡・獅友秋日散步', date: '2026.10.04（日）', time: '08:30–11:30', place: '三峽近郊步道', type: '獅友情誼', copy: '把忙碌留在山下，走進秋天的綠意。這次沒有議程，只有一段步道、一群獅友，以及慢慢聊天的好時光。', fee: '示意活動・免費' },
};
const announcements = {
  year: { title: '新年度，一起寫下新的服務篇章', subtitle: '會務公告 · 2026.09.08', body: '新的年度，從一次次小小的參與開始。本期將以在地服務、會員交流與社區關懷為活動方向，邀請每位獅友依自己的時間與專長一起加入。', extra: '本頁所列日期與活動皆為版型示例；實際會務安排請以正式公告為準。' },
  fee: { title: '本期會費繳納與收據申請說明', subtitle: '繳費提醒 · 2026.09.05', body: '你可以從「專屬帳單」查看會費狀態，並在「專屬收據」查看完成繳費後的收據資訊。', extra: '此 demo 不提供付款、匯款或正式收據申請。所有金額皆為展示用途。' },
  profile: { title: '別忘了，更新你的聯絡資訊', subtitle: '會員服務 · 2026.09.01', body: '近期若有更換聯絡方式，記得到「個人設定」檢視會員資料，讓會務通知與活動訊息持續與你保持連結。', extra: '示範表單只會在目前頁面預覽，不會儲存或傳送資料。請勿輸入真實個人資訊。' },
};

function title(text, subtitle) {
  return `<h2 class="dialog-title" id="dialog-title">${text}</h2><p class="dialog-subtitle">${subtitle}</p>`;
}
function openDialog(html, kicker = "MEMBER'S LOUNGE") {
  if (!dialog.open) priorFocus = sidebar.contains(document.activeElement) && window.matchMedia('(max-width:760px)').matches ? menuButton : document.activeElement;
  content.innerHTML = html;
  document.querySelector('#dialog-kicker').textContent = kicker;
  hydrateIcons(content);
  closeMenu(false);
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  document.querySelector('#dialog-close').focus();
}
function toast(message) {
  const element = document.querySelector('#toast');
  clearTimeout(toastTimer);
  element.textContent = message;
  element.hidden = false;
  toastTimer = setTimeout(() => { element.hidden = true; }, 4000);
}
function eventRows(keys) {
  return keys.map((key) => `<button class="detail-list-row" data-event="${key}"><span class="mini-avatar"><i data-icon="calendar"></i></span><div><strong>${eventData[key].title}</strong><small>${eventData[key].date} · ${eventData[key].time}</small></div><i data-icon="chevron"></i></button>`).join('');
}
function showEvent(key) {
  const event = eventData[key];
  if (!event) return;
  const registered = demoRegistrations.has(key);
  openDialog(`${title(event.title, event.type + ' · 活動示意')}<dl class="detail-facts"><div><dt>活動日期</dt><dd>${event.date}</dd></div><div><dt>活動時間</dt><dd>${event.time}</dd></div><div><dt>集合地點</dt><dd>${event.place}</dd></div><div><dt>參與費用</dt><dd>${event.fee}</dd></div></dl><p class="detail-copy">${event.copy}</p><button class="primary-button" data-demo-register="${key}" ${registered ? 'disabled' : ''}><i data-icon="${registered ? 'check' : 'calendar'}"></i>${registered ? '已加入我的活動（示意）' : '體驗活動報名'}</button><p class="dialog-footnote">此操作僅變更展示畫面；重新整理後將重設。</p>`, 'GET TOGETHER');
}
function showAnnouncement(key) {
  const note = announcements[key];
  if (note) openDialog(`${title(note.title, note.subtitle)}<p class="detail-copy">${note.body}</p><p class="dialog-footnote">${note.extra}</p>`, 'CLUB NOTES');
}
const panels = {
  members: () => `${title('熟悉的名字，新的連結。', '會員名冊 · 示意名錄')}<div class="detail-list"><div class="detail-list-row"><span class="mini-avatar">甲</span><div><strong>獅友甲</strong><small>年度會長 · 示意職務</small></div><span class="pill">會員</span></div><div class="detail-list-row"><span class="mini-avatar">乙</span><div><strong>獅友乙</strong><small>會務秘書 · 示意職務</small></div><span class="pill">會員</span></div><div class="detail-list-row"><span class="mini-avatar">丙</span><div><strong>獅友丙</strong><small>服務委員 · 示意職務</small></div><span class="pill">會員</span></div></div><p class="dialog-footnote">正式版本可沿用現有公開名錄與會內職務資訊。</p>`,
  billing: () => `${title('每一份支持，都有方向。', '專屬帳單 · 示意金額')}<div class="detail-list"><div class="detail-list-row"><div><strong>本期會費</strong><small>待處理 · 展示資料</small></div><span class="amount">NT$ 3,000</span></div><div class="detail-list-row"><div><strong>前期會費</strong><small>已完成 · 展示資料</small></div><span class="amount">NT$ 3,000</span></div></div><p class="detail-copy">在同一個地方掌握待繳金額、繳費紀錄與帳單狀態。</p><p class="dialog-footnote">金額不代表真實會費。本頁沒有付款或匯款操作。</p>`,
  receipts: () => `${title('把每一份支持，好好收存。', '專屬收據 · 示意清單')}<div class="detail-list"><div class="detail-list-row"><span class="mini-avatar"><i data-icon="receipt"></i></span><div><strong>前期會費收據</strong><small>個人抬頭 · 展示資料</small></div><span class="pill">已開立</span></div></div><p class="detail-copy">已繳費用的收據與抬頭資訊，整理在這裡。</p><p class="dialog-footnote">此為清單視覺示例，不會產生正式財務文件。</p>`,
  donations: () => `${title('善意的每一步，都記得。', '捐款與繳費明細 · 示意紀錄')}<div class="detail-list"><div class="detail-list-row"><div><strong>社區關懷支持</strong><small>2026.08.20 · 捐款示意</small></div><span class="amount">NT$ 1,000</span></div><div class="detail-list-row"><div><strong>前期會費</strong><small>2026.08.01 · 繳費示意</small></div><span class="amount">NT$ 3,000</span></div></div>`,
  profile: () => `${title('你好，示範會員。', '個人設定 · 請使用虛構資料體驗')}<form class="profile-form" id="profile-demo"><label>顯示名稱<input name="display-name" value="示範會員" autocomplete="off" maxlength="20" required></label><label>聯絡偏好<select name="contact-preference"><option>LINE 通知</option><option>電子郵件</option></select></label><button type="submit" class="primary-button">預覽個人設定<i data-icon="arrow"></i></button></form><div id="profile-result" role="status"></div>`,
  admin: () => `${title('會務的每個細節，都在這裡。', '管理後台 · 入口示意')}<div class="detail-list"><div class="detail-list-row"><i data-icon="calendar"></i><div><strong>活動管理</strong><small>活動安排與報名管理</small></div></div><div class="detail-list-row"><i data-icon="megaphone"></i><div><strong>公告管理</strong><small>會務消息與通知</small></div></div><div class="detail-list-row"><i data-icon="wallet"></i><div><strong>財務管理</strong><small>會費與帳務資料</small></div></div></div><p class="dialog-footnote">正式環境依既有權限顯示功能；此展示不連接後台。</p>`,
  guide: () => `${title('從這裡，找到你需要的。', '會員服務使用指南')}<div class="detail-list"><div class="detail-list-row"><span class="mini-avatar">1</span><div><strong>常用服務，直接進入</strong><small>會員名冊、帳單與收據，都在首頁。</small></div></div><div class="detail-list-row"><span class="mini-avatar">2</span><div><strong>選一場想參與的活動</strong><small>依類型篩選，點開查看時間與地點。</small></div></div><div class="detail-list-row"><span class="mini-avatar">3</span><div><strong>重要消息，不錯過</strong><small>點開公告卡片，即可閱讀完整內容。</small></div></div></div>`,
  notifications: () => `${title('有兩則消息，想告訴你。', '通知中心 · 示意通知')}<div class="detail-list"><button class="detail-list-row" data-announcement="year"><i data-icon="megaphone"></i><div><strong>新年度會務規劃已更新</strong><small>點開閱讀最新會務公告</small></div><i data-icon="chevron"></i></button><button class="detail-list-row" data-event="meeting"><i data-icon="calendar"></i><div><strong>九月例會，期待與你相見</strong><small>點開查看活動安排</small></div><i data-icon="chevron"></i></button></div>`,
  'my-events': () => `${title('把時間，留給美好的相聚。', `我的活動 · 已加入 ${demoRegistrations.size} 場示意活動`)}<div class="detail-list">${eventRows([...demoRegistrations])}</div>`,
  'all-events': () => `${title('下一次相聚，選你喜歡的。', '全部活動 · 3 場示意活動')}<div class="detail-list">${eventRows(Object.keys(eventData))}</div>`,
  announcements: () => `${title('會裡的新鮮事。', '全部公告 · 示意內容')}<div class="detail-list">${Object.entries(announcements).map(([key, value]) => `<button class="detail-list-row" data-announcement="${key}"><div><strong>${value.title}</strong><small>${value.subtitle}</small></div><i data-icon="chevron"></i></button>`).join('')}</div>`,
};

document.addEventListener('click', (event) => {
  const panelButton = event.target.closest('[data-panel]');
  const eventButton = event.target.closest('[data-event]');
  const announcementButton = event.target.closest('[data-announcement]');
  const registerButton = event.target.closest('[data-demo-register]');
  if (panelButton && panels[panelButton.dataset.panel]) openDialog(panels[panelButton.dataset.panel]());
  else if (eventButton) showEvent(eventButton.dataset.event);
  else if (announcementButton) showAnnouncement(announcementButton.dataset.announcement);
  else if (registerButton && !registerButton.disabled) {
    const key = registerButton.dataset.demoRegister;
    if (!eventData[key]) return;
    demoRegistrations.add(key);
    document.querySelector('.member-stats button strong').innerHTML = `${String(demoRegistrations.size).padStart(2, '0')}<span>場</span>`;
    showEvent(key);
    const message = document.createElement('p');
    message.className = 'dialog-confirmation';
    message.setAttribute('role', 'status');
    message.textContent = '已加入本頁的「我的活動」。這是報名流程示範。';
    content.append(message);
  }
});

document.addEventListener('submit', (event) => {
  if (event.target.id !== 'profile-demo') return;
  event.preventDefault();
  const displayName = new FormData(event.target).get('display-name').trim();
  const result = document.querySelector('#profile-result');
  result.className = 'dialog-confirmation';
  result.textContent = `預覽名稱：${displayName}。這次修改只用於畫面預覽。`;
});

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    document.querySelectorAll('[data-category]').forEach((item) => {
      item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter;
      if (!item.hidden) count += 1;
    });
    document.querySelector('#filter-result').textContent = `顯示 ${count} 場${button.textContent}`;
  });
});

document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => { if (priorFocus && document.contains(priorFocus)) priorFocus.focus(); });

function closeMenu(restoreFocus = true) {
  const wasOpen = sidebar.classList.contains('is-open');
  sidebar.classList.remove('is-open');
  shade.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '展開導覽選單');
  if (window.matchMedia('(max-width:760px)').matches) sidebar.inert = true;
  if (wasOpen && restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  if (sidebar.classList.contains('is-open')) return closeMenu();
  sidebar.classList.add('is-open');
  sidebar.inert = false;
  shade.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', '收合導覽選單');
  sidebar.querySelector('a').focus();
});
shade.addEventListener('click', () => closeMenu());
document.addEventListener('keydown', (event) => {
  if (!sidebar.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeMenu();
  if (event.key === 'Tab') {
    const elements = [...sidebar.querySelectorAll('a,button')];
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu(false);
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
    document.querySelectorAll('.main-nav a').forEach((item) => {
      const active = item.getAttribute('href') === link.getAttribute('href');
      item.classList.toggle('active', active);
      if (active) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });
  });
});
const mobileMedia = window.matchMedia('(max-width:760px)');
function syncMenu() { closeMenu(false); sidebar.inert = mobileMedia.matches; }
mobileMedia.addEventListener('change', syncMenu);
syncMenu();
