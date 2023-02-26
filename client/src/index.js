import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './authentication/AuthProvider.js';   
import reportWebVitals from './reportWebVitals';
import '../src/styles/main.scss'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)