// 检查是否已经注入过，避免重复注入
if (!window.rumorAgentInjected) {
  window.rumorAgentInjected = true;
  
  console.log('开始注入谣言检测助手...');
  
  // 创建<link>标签用于引入样式文件
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = chrome.runtime.getURL('agent.css'); // 获取扩展内的agent.css路径
  console.log('CSS文件路径:', style.href);
  
  // 将样式表添加到页面<head>中
  document.head.appendChild(style);
  console.log('CSS文件已添加到页面head');

  // 直接插入 agent.js
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('agent.js'); // 获取扩展内的agent.js路径
  script.onload = () => {
    console.log('agent.js 文件加载完成');
  };
  script.onerror = (error) => {
    console.error('agent.js 文件加载失败:', error);
  };
  document.body.appendChild(script);
  console.log('JS文件已添加到页面body');
  
  console.log('谣言检测助手注入完成');
}

// 桥接 window.postMessage <-> chrome.runtime.sendMessage
window.addEventListener('message', function(event) {
  if (event.source !== window) return;
  if (event.data && event.data.type === 'volcengine_deepseek') {
    chrome.runtime.sendMessage({
      type: 'volcengine_deepseek',
      body: event.data.body
    }, function(response) {
      window.postMessage({
        type: 'volcengine_deepseek_result',
        result: response
      }, '*');
    });
  }
});