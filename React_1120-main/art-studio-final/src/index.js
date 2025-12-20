import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 이 파일은 있을 수도 있고 없을 수도 있습니다. 없으면 이 줄을 제거하세요.
import App from './App'; // App.js 파일이 src 폴더에 있어야 합니다.
import reportWebVitals from './reportWebVitals'; // 이 파일은 있을 수도 있고 없을 수도 있습니다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: bit.ly
reportWebVitals(); // 이 함수 호출은 reportWebVitals 파일이 있을 때만 유지하세요.