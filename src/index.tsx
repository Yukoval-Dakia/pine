import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Metric } from 'web-vitals';
import { LanguageProvider } from './contexts/LanguageContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);

// 性能监控
reportWebVitals((metric: Metric) => {
  console.log('性能指标:', {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    delta: metric.delta,
    entries: metric.entries
  });
}); 