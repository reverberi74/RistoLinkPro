import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from './App.jsx';

import store from './store/index.js';
import { ApiProvider } from './hooks/useApi.jsx';
import CustomProductModal from './components/shared/CustomProductModal.jsx';
import Toast from './components/shared/Toast.jsx';
import { ToastContainer } from 'react-toastify';

import './index.css';
import './business.css';

createRoot(document.getElementById('root')).render(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <ApiProvider>
                <App />
                <Toast />
                <ToastContainer />
                <CustomProductModal />
            </ApiProvider>
        </BrowserRouter>
    </ReduxProvider>
);