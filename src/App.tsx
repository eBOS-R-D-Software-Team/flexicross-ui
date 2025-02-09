import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { ConfigProvider, theme } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';
import enUSIntl from 'antd/lib/locale/en_US';
import keycloak from "./keycloak";
import { ReactKeycloakProvider } from '@react-keycloak/web/lib/provider';

const { darkAlgorithm } = theme;
const initOptions = {
  onLoad: 'login-required',
  checkLoginIframe: false, // Disables iframe-based session check
  enable3PC: false // Disables third-party cookies verification
};

const App: React.FC = () => (
  //   <ReactKeycloakProvider
  //   authClient={keycloak}
  //   initOptions={initOptions}
  // >
    <ConfigProvider
      locale={enUSIntl}
      theme={{
        algorithm: darkAlgorithm,
        token: {
            // "colorPrimary": "#0e0e0e",
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
        //  </ReactKeycloakProvider>

);

export default App;
