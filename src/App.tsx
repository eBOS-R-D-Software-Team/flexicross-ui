import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { ConfigProvider, theme } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';
import enUSIntl from 'antd/lib/locale/en_US';

const { compactAlgorithm } = theme;

const App: React.FC = () => (
    <ConfigProvider
    locale={enUSIntl}
        theme={{
            algorithm: compactAlgorithm,
            token: {
                "colorPrimary": "#0e0e0e",
                "fontSize": 16,
                "borderRadius": 14
            }
        }}
    >
        <Router>
        <Provider store={store}>

            <Routes />
            </Provider>
        </Router></ConfigProvider>

);

export default App;
