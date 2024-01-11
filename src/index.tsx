import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SharePoint from './contexts/SharePoint';
import App from './App';


const root = createRoot(document.getElementById('statusapp') as HTMLElement);

root.render(
    
        <SharePoint>
            <StrictMode>
            <App />
            </StrictMode>
        </SharePoint>
);

