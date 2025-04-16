console.log("✅ control.js 已加载并运行");

// 向主控页面 postMessage 报告“我打开了”
window.parent?.postMessage?.({
  type: 'popupReady',
  title: document.title,
  url: location.href
}, '*');

// 当页面即将关闭时，发“我关闭了”
window.addEventListener('beforeunload', () => {
  window.parent?.postMessage?.({
    type: 'popupClosed',
    title: document.title,
    url: location.href
  }, '*');
});
