// 给按钮绑定点击事件
document.addEventListener('DOMContentLoaded', () => {
  console.log('popup.js 已加载');
  
  const button = document.getElementById('run');
  const status = document.getElementById('status');
  if (button) {
    console.log('找到启动助手按钮');
    
    button.addEventListener('click', async () => {
      console.log('启动助手按钮被点击');
      
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log('当前标签页:', tab);
        
        // 先注入CSS
        console.log('开始注入CSS...');
        await chrome.scripting.insertCSS({
          target: { tabId: tab.id },
          files: ['agent.css']
        });
        console.log('CSS注入成功');
        
        // 再注入JS
        console.log('开始注入JS...');
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
        console.log('JS注入成功');
        
        console.log('所有文件注入完成');
        if (status) {
          status.textContent = '助手已启动';
        }
        button.disabled = true;
      } catch (error) {
        console.error('注入失败:', error);
        if (status) {
          status.textContent = '启动失败';
          status.style.color = '#e74c3c';
        }
      }
    });
  } else {
    console.error('未找到启动助手按钮');
  }
}); 