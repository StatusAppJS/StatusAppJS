import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import SharePoint from './contexts/SharePoint';
const App = lazy(() => import(/* webpackChunkName: "framework" */ './modules/AppFramework'));


const statusapp = document.createElement('div');
statusapp.setAttribute('id', 'statusapp');

const content = document.getElementById('contentRow');
content.innerHTML = "";
content.appendChild(statusapp);

const root = createRoot(statusapp as HTMLElement);

root.render(
    
        <SharePoint>
            <Suspense fallback={<div>Loading Application Components</div>}>
                <App />
            </Suspense>
        </SharePoint>
);