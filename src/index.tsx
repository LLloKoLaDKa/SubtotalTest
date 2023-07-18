import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app';
import { setupStore } from './store/store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
const store = setupStore();

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);