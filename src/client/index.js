import React from 'react';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); 
import App from './components/App'; //🙂 

root.render(<App></App>);