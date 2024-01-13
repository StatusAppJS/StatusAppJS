import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SharePoint from './contexts/SharePoint';
import App from './App';


const statusapp = document.createElement('div');
statusapp.setAttribute('id', 'statusapp');

const content = document.getElementById('contentRow');
content.innerHTML = "";
content.appendChild(statusapp);

const root = createRoot(statusapp as HTMLElement);

root.render(
    
        <SharePoint>
            <App />
        </SharePoint>
);

