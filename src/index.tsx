import { createRoot } from 'react-dom/client';
import SharePoint from './contexts/SharePoint';

const root = createRoot(document.getElementById('statusapp'));
import App from './App';

root.render(
    <>
        <SharePoint>
            <App />
        </SharePoint>
    </>
);

