// ✅ 给所有 console 输出添加时间戳
['log', 'warn', 'error', 'info'].forEach(type => {
  const original = console[type];
  console[type] = function (...args) {
    const now = new Date().toLocaleTimeString();
    original.call(console, `[${now}]`, ...args);
  };
});


// ✅ 正在检测直播是否结束并关闭

console.log("🛠️ 子控脚本启动：自动检测直播是否结束");

function logWithTime(message) {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  console.log(`[${hh}:${mm}] ${message}`);
}

function checkLiveStatusAndCloseIfEnded() {
  logWithTime("📡 正在检测直播是否结束...");

  const playerWrap = document.querySelector('.player-wrap');
  const hasLiveVideo = playerWrap?.querySelector('video, iframe');
  const moreSourceBlock = document.querySelector('.more-source');

  const ended = !hasLiveVideo && moreSourceBlock;

  if (ended) {
    logWithTime("📴 直播已结束，当前为录像或备用源页面 ❌");
    window.close(); // ✅ 自动关闭窗口
  } else {
    logWithTime("✅ 直播仍在进行中 🎥");
  }
}

// ✅ 启动即检查一次
checkLiveStatusAndCloseIfEnded();

// ✅ 每 10 分钟检测一次
setInterval(checkLiveStatusAndCloseIfEnded, 10 * 60 * 1000);




// ✅ 启动预设模式：30 秒内无输入 FF 配置，则自动执行默认话术配置
setTimeout(() => {
  if (!window.__configReady) {
    console.log("⏱️ 30 秒内未配置，自动启用预设模式...");

    const presetMessages = [
      `宝宝您好呀，我们是盘球吧的合作赞助商\n十年以上稳定运营平台【UED体育】\n支持虚拟币/支付宝提款，也可微信代存\n★首存即可进主播推单群＋送免费看球VIP\n★持续在平台玩，可升级永久VIP\n\n一一一一一一一一一一一一一一\n一. 首单包赔（最高1888元）\n首次下注赢了直接提，输了全额包赔\n第二次存款也能再赔一次，共享(两次)保障\n\n二. 首存彩金（存多少送多少）\n首存 100 送 58\n首存 1000 送 228\n一一一一一一一一一一一一一一\n有兴趣喊静静，我发您注册链接＋一步步协助操作。😚`,
      `宝，一起玩球进群，顺便领直播VIP福利吗？我可以帮您安排哦~ \n 喊一下静静，这边发注册链接给您，也支持代充呦~😚`,
      `宝，玩球流程简单，注册成为会员充值后，就能选喜欢的赛事下注，像足球、篮球都可以跟着主播方向玩\n`,
      `宝，UED体育平台 玩球流程很简单：【注册后 ➜ 发账号 ➜ 充值➜ 参加 1.首单包赔 还是 2.首存彩金 ➜ 进群 】静静第一时间给您安排好😊`,
      `我可以帮您安排哦~ \n 喊一下静静，这边发注册链接给您，也支持代充呦~😚`
    ];

    const config = {
      messageList: presetMessages,
      repeatMessageMode: 1, // 默认跳过已发送的句子
      autoMode: true,
      autoDelay: 10
    };

    localStorage.setItem('sentUsers', JSON.stringify([]));
    window.__configReady = true;
    window.__autoMode = true;
    window.__autoDelay = 10;
    window.__repeatMessageMode = 1;
    window.__messageList = presetMessages;
    console.log("✅ 预设私信配置已载入");

    if (typeof main === 'function') {
      main();
    }
  }
}, 30000);































//// 上面的待确认是否可行 ///✅ 通知主控“我上线了”
function notifyPopupReady() {
  try {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({
        type: 'popupReady',
        url: location.href,
        title: document.title
      }, '*');
      console.log("✅ popupReady 已发送给主控");
    }
  } catch (err) {
    console.warn("⚠️ 无法发送 popupReady", err);
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  notifyPopupReady();
} else {
  window.addEventListener('DOMContentLoaded', notifyPopupReady);
}

// ✅ 通知主控“我要下线了”
window.addEventListener('beforeunload', () => {
  try {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({
        type: 'popupClosed',
        url: location.href,
        title: document.title
      }, '*');
      console.log("📩 popupClosed 已发送给主控");
    }
  } catch (err) {
    console.warn("⚠️ 无法发送 popupClosed", err);
  }
});

// ✅ 自动尝试暂停直播
console.log("🛠️ 子控脚本启动，尝试暂停直播...");
const tryPause = setInterval(() => {
  try {
    const pauseIconPath = 'M14.080 4.8q2.88';
    const pathEl = Array.from(document.querySelectorAll('svg path'))
      .find(path => path.getAttribute('d')?.startsWith(pauseIconPath));

    if (pathEl) {
      const clickable = pathEl.closest('button') || pathEl.closest('div');
      if (clickable) {
        clickable.click();
        console.log("⏸️ 成功点击暂停按钮");
        clearInterval(tryPause);
      } else {
        console.log("⚠️ 找到图标但没有可点击容器");
      }
    } else {
      console.log("🔍 暂未找到暂停图标，继续尝试...");
    }
  } catch (e) {
    console.warn("🚫 脚本异常：", e);
  }
}, 1000);

setTimeout(() => clearInterval(tryPause), 10000); // 最多尝试 10 秒






// 🚀 自动// 🚀 自动私信脚本最终升级版
// ✅ 支持多句话术（最多 5 句）自动检测是否重复
// ✅ 自动模式延迟时间支持 FF() 菜单动态修改
// ✅ FF() 导出名单可一键复制用于添加
// ✅ 按 1 发送、按 2 跳过
// ✅ 停止：输入 stop
// ✅ 暂停：输入 ff()，继续：go()

(() => {
  window.bc = new BroadcastChannel('user-sync');
  let confirmSignal = 0;
  window.__autoScriptStopped = false;
  window.__autoMode = false;
  let __waitingForGo = false;
  let sendCount = 0;
  let sentUsers = new Set(JSON.parse(localStorage.getItem('sentUsers') || '[]'));
  let localConfig = null;
  window.__configReady = false;
  let thisTabCount = 0; // ✅ 当前子窗口的发送数


  const tryCloseDialog = () => {
    const closeBtn =
      document.querySelector('.title .close') ||
      document.querySelector('.dialog-close') ||
      document.querySelector('.user-dialog .close') ||
      [...document.querySelectorAll('button')].find(b => b.innerText.includes('关闭'));
    if (closeBtn) {
      closeBtn.click();
      console.log('🔒 已尝试关闭对话框');
    } else {
      console.warn('❗ 未找到关闭按钮，无法关闭弹窗');
    }
  };

  const syncToOtherTabs = (nickname) => {
    bc.postMessage({ type: 'sync-users', nameList: [nickname] });
  };

  const saveUser = (nickname) => {
    sentUsers.add(nickname);
    localStorage.setItem('sentUsers', JSON.stringify([...sentUsers]));
    syncToOtherTabs(nickname);
  };

  const applyConfig = (config) => {
    window.__messageList = config.messageList || ['嗨呀，宝宝，来玩球呀？'];
    window.__repeatMessageMode = config.repeatMessageMode;
    window.__autoMode = config.autoMode;
    window.__autoDelay = config.autoDelay;
    window.__configReady = true;
  };

  bc.onmessage = (event) => {
    const { type, nameList, config, fromRequest } = event.data || {};
    if (type === 'sync-users' && Array.isArray(nameList)) {
      let added = 0;
      nameList.forEach(name => {
        if (!sentUsers.has(name)) {
          sentUsers.add(name);
          added++;
        }
      });
      if (added > 0) {
        localStorage.setItem('sentUsers', JSON.stringify([...sentUsers]));
        console.log(`📡 同步收到 ${added} 个新用户`);
      }
    }
    if (type === 'config-request' && localConfig) {
      bc.postMessage({ type: 'config-broadcast', config: localConfig, fromRequest: true });
    }
    if (type === 'config-broadcast' && !window.__configReady && config) {
      clearTimeout(window.__configTimeout);
      const useShared = confirm(`检测到其他页面已设定私信内容，要使用该设定吗？`);
      if (useShared) {
        applyConfig(config);
        console.log('✅ 已应用共享设定，开始执行');
        main();
      } else {
        askForInput();
      }
    }
  };

  const askForInput = () => {
    const messageList = [];
    const count = parseInt(prompt('请输入你要设置几句私信内容（最多5）：', '3'));
    for (let i = 0; i < count; i++) {
      const msg = prompt(`请输入第 ${i + 1} 句：`, `默认私信内容 ${i + 1}`);
      if (msg) messageList.push(msg);
    }
    const repeatAnswer = prompt('重复消息处理方式？\n1 跳过\n2 发最后一句', '1');
    const repeatMessageMode = repeatAnswer?.trim() === '2' ? 2 : 1;
    const autoMode = prompt('是否启用自动模式？yes / no', 'no').toLowerCase() === 'yes';
    const autoDelay = autoMode ? parseInt(prompt('自动模式延迟秒数（建议 10~15）：', '10')) || 10 : 10;

    const config = { messageList, repeatMessageMode, autoMode, autoDelay };
    localConfig = config;
    applyConfig(config);
    bc.postMessage({ type: 'config-broadcast', config });
    main();
  };

  setTimeout(() => {
    if (!window.__configReady) bc.postMessage({ type: 'config-request' });
  }, 100);

  window.__configTimeout = setTimeout(() => {
    if (!window.__configReady) askForInput();
  }, 1500);

  const getNormalUsers = () => {
  const skipRoles = ['水军', '房管', '主播', '管理员', '群管'];
  const uniqueUsers = new Map();
  const chatContainer = [...document.querySelectorAll('*')].find(el => {
    const style = getComputedStyle(el);
    return (style.overflowY === 'auto' || style.overflowY === 'scroll') && el.scrollHeight > el.clientHeight;
  });
  const nameSpans = (chatContainer || document).querySelectorAll('.name');

  nameSpans.forEach(span => {
    const name = span.innerText.trim().replace(':', '');
    const wrapper = span.closest('.danmu-item, .chat-item, .msg-item');
    const roleSpan = wrapper?.querySelector('.level-icon span');
    const roleText = roleSpan?.innerText?.trim() || '';
    if (!skipRoles.includes(roleText) && name && !uniqueUsers.has(name)) {
      uniqueUsers.set(name, '普通');
    }
  });

  return [...uniqueUsers.entries()].filter(([name]) => !sentUsers.has(name)).map(([name]) => name);
};

  const scrollToChatBottom = () => {
    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el);
      if ((style.overflowY === 'auto' || style.overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        el.scrollTop = el.scrollHeight;
      }
    });
  };

  const processUserList = (normalUsers) => {
    if (window.__autoScriptStopped || __waitingForGo) return;
    let index = 0;
    const processNext = () => {
      if (window.__autoScriptStopped || __waitingForGo) return;
      if (index >= normalUsers.length) {
        console.log("🎉 当前轮处理完毕，60 秒后检测新用户...");
        return setTimeout(() => {
          scrollToChatBottom();
          const updated = getNormalUsers();
          updated.length > 0 ? processUserList(updated) : processNext();
        }, 60000);
      }
      const nickname = normalUsers[index];
      const nameSpan = [...document.querySelectorAll('.name')].find(el => el.innerText.trim().replace(':', '') === nickname);
      if (!nameSpan) {
        saveUser(nickname);
        index++;
        return processNext();
      }
      nameSpan.closest('a')?.removeAttribute('href');
      try { nameSpan.dispatchEvent(new MouseEvent('click', { bubbles: true })); } catch {
        saveUser(nickname);
        index++;
        return processNext();
      }
      setTimeout(() => {
        const float = document.querySelector('.user-float');
        const privateBtn = [...float?.querySelectorAll('.btn') || []].find(btn => btn.innerText.includes('私信'));
        if (!privateBtn) {
          saveUser(nickname);
          index++;
          return processNext();
        }
        privateBtn.click();
        setTimeout(() => {
          const textarea = document.querySelector('textarea#input-elem');
          if (!textarea) {
            saveUser(nickname);
            index++;
            return processNext();
          }
          const messages = [...document.querySelectorAll('.dialog .msg')].map(m => m.innerText.trim());
          let msgToSend = null;
          for (let msg of window.__messageList) {
            if (!messages.includes(msg)) {
              msgToSend = msg;
              break;
            }
          }
          if (!msgToSend) {
            if (window.__repeatMessageMode === 1) {
              console.log(`⚠️ 全部句子都已发过，跳过：${nickname}`);
              saveUser(nickname);
              tryCloseDialog();
              index++;
              return processNext();
            } else {
              msgToSend = window.__messageList[window.__messageList.length - 1];
              console.log('📌 所有句子都发过，强制发送最后一句');
            }
          }
          textarea.value = msgToSend;
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
          console.log(`⏸️ 等待操作：${nickname} 👉 请按 [1] 发送，[2] 跳过`);
          let waited = 0;
          const waitConfirm = setInterval(() => {
            if (window.__autoScriptStopped || __waitingForGo) return clearInterval(waitConfirm);
            waited++;
            if (confirmSignal === 1 || confirmSignal === 2 || (window.__autoMode && waited >= window.__autoDelay * 2)) {
              clearInterval(waitConfirm);
              const action = confirmSignal || 1;
              confirmSignal = 0;
              saveUser(nickname);
              if (action === 1) {
                document.querySelector('button.send-btn')?.click();
                sendCount++;
		thisTabCount++; // ✅ 新增：只记本页

              } else {
                console.log(`⏭️ 跳过：${nickname}`);
              }
              setTimeout(() => {
                tryCloseDialog();
                index++;
                processNext();
              }, 600);
            }
          }, 500);
        }, 800);
      }, 600);
    };
    processNext();
  };

  const main = () => {
    Object.defineProperty(window, 'stop', {
      get() {
        console.log(`🛑 脚本已停止，总共成功发送 ${sendCount} 人`);
        window.__autoScriptStopped = true;
      }
    });

    window.ff = window.FF = () => {
      console.log('🧭 脚本暂停，输入 go() 可继续');
      __waitingForGo = true;
      const input = prompt(
        '功能菜单：\n' +
        '1️⃣ 导出已发送名单\n' +
        '2️⃣ 清除所有已发送名单\n' +
        '3️⃣ 删除指定用户（多个逗号分隔）\n' +
        '4️⃣ 添加指定用户\n' +
        '5️⃣ 查询指定用户是否已发\n' +
        '6️⃣ 修改重复私信策略与话术\n' +
        '7️⃣ 查看当前已发送人数\n' +
        '9️⃣ 修改自动模式等待秒数'
      );
      switch (input?.trim()) {
        case '1': {
          const list = [...sentUsers];
          console.table(list);
          console.log('📋 复制下面这一行，可用于“添加指定用户”：');
          console.log(list.join(','));
        } break;
      	 case '2': {
  	if (confirm('确认清除全部？')) {
   	 sentUsers.clear();
    	localStorage.removeItem('sentUsers');
    	bc.postMessage({ type: 'sync-users', nameList: [] }); // ✅ 广播清空
    	console.log('✅ 已清除');
 	 }
	} break;
        case '3': {
          const names = prompt('要删除哪些用户？');
          names?.split(',').map(n => n.trim()).forEach(n => sentUsers.delete(n));
          localStorage.setItem('sentUsers', JSON.stringify([...sentUsers]));
        } break;
        case '4': {
          const names = prompt('添加哪些用户？');
          names?.split(',').map(n => n.trim()).forEach(n => sentUsers.add(n));
          localStorage.setItem('sentUsers', JSON.stringify([...sentUsers]));
        } break;
        case '5': {
          const names = prompt('查询哪些用户：');
          const list = names?.split(',').map(n => n.trim());
          console.table(list.map(n => ({ 用户: n, 是否已发送: sentUsers.has(n) ? '✅ 是' : '❌ 否' })));
        } break;
        case '6': {
          const count = parseInt(prompt('你要设置几句（最多5）？', '3'));
          window.__messageList = [];
          for (let i = 0; i < count; i++) {
            const msg = prompt(`第 ${i + 1} 句：`, window.__messageList[i] || '');
            if (msg) window.__messageList.push(msg);
          }
          const mode = prompt('重复策略：1 跳过 / 2 发送最后一句：', window.__repeatMessageMode);
          if (mode === '1' || mode === '2') window.__repeatMessageMode = parseInt(mode);
          console.log('✅ 设置完成');
        } break;
        case '7': {
      		  alert(`📊 当前已成功发送人数：${sentUsers.size} 人\n📍 本页面发送人数：${thisTabCount} 人`);
        } break;
        case '9': {
          const sec = parseInt(prompt('请输入自动模式等待秒数（建议 10~15）：', window.__autoDelay || '10'));
          if (!isNaN(sec) && sec > 0) {
            window.__autoDelay = sec;
            console.log(`⏱️ 自动等待秒数已更新为：${sec}`);
          } else {
            console.warn('❌ 输入无效');
          }
        } break;
      }
      console.log('🟢 输入 go() 可继续执行');
    };

    window.go = () => {
      if (__waitingForGo) {
        __waitingForGo = false;
        console.log('▶️ 恢复执行...');
        const newUsers = getNormalUsers();
        processUserList(newUsers);
      } else {
        console.log('⚠️ 当前未暂停，无需继续');
      }
    };

    const users = getNormalUsers();
    console.log(`📋 初始普通用户共 ${users.length} 位`);
    processUserList(users);
  };

  // ✅ 键盘监听：按 1 发送、按 2 跳过
  window.addEventListener('keydown', (e) => {
    if (window.__waitingForGo) return;
    if (e.key === '1') {
      confirmSignal = 1;
      console.log('✅ [键盘] 已选择发送（按键 1）');
    }
    if (e.key === '2') {
      confirmSignal = 2;
      console.log('⏭️ [键盘] 已选择跳过（按键 2）');
    }
  });
})();
