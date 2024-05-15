import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.scss'

// import './patch-local-storage-for-github-pages';
// import './polyfills';
import eruda from "eruda";

// import  {StrictMode} from 'react'
// import {render} from 'react-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'

import {App} from './App'
import {runSingleInstance} from "./utils/run-signle-instance";

eruda.init();
/*

async function enableMocking() {
  return new Promise(async (resolve) => {
    const {worker} = await import('./server/worker');

    const startMockWorker = () => worker.start({
      onUnhandledRequest: 'bypass',
      quiet: false,
      serviceWorker: {
        url: `${import.meta.env.VITE_GH_PAGES ? '/ton-crypto-match' : ''}/mockServiceWorker.js`
      }
    });
    let serviceWorkerRegistration = await startMockWorker();
    resolve(serviceWorkerRegistration);

    const verifyAndRestartWorker = runSingleInstance(async () => {
      const serviceWorkerRegistrations = await navigator.serviceWorker.getRegistrations();

      if (serviceWorkerRegistrations.length === 0) {
        await serviceWorkerRegistration?.unregister();
        serviceWorkerRegistration = await startMockWorker();
      }
    });

    setInterval(verifyAndRestartWorker, 1_000);
  });
}
*/
/*
enableMocking().then(() => render(
  <StrictMode>
    <App/>
  </StrictMode>,
  document.getElementById('root') as HTMLElement
));
*/
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
