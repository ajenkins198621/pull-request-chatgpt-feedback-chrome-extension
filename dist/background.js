chrome.runtime.onMessage.addListener(((e,t,a)=>{if("fetchDataFromNewTab"===e.action){const t=e.url;return chrome.tabs.create({url:t},(e=>{const t=(o,r)=>{"fetchedData"===o.action&&(a({success:!0,data:o.data}),chrome.tabs.remove(e.id),chrome.runtime.onMessage.removeListener(t))};chrome.runtime.onMessage.addListener(t)})),!0}if("fetchDataFromChatGPTApi"===e.action)return fetch("http://localhost:4175/api/analyze-code-diff",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({diff:e.diff})}).then((e=>e.json())).then((e=>{a({success:!0,data:e})})).catch((e=>{a({success:!1,error:e})})),!0}));