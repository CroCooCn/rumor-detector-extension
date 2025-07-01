chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'volcengine_deepseek') {
    fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer c24dbb61-96a4-40e2-ae4a-3eaf693caef6`, // 替换为你的API Key
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.body)
    })
    .then(res => res.json())
    .then(data => sendResponse({ data }))
    .catch(err => sendResponse({ error: err.toString() }));
    return true; // 异步响应
  }
}); 