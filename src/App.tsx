import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { ConfigProvider, theme } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';
import enUSIntl from 'antd/lib/locale/en_US';
import keycloak from "./keycloak";
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

const { defaultAlgorithm } = theme;

const initOptions = {
  onLoad: 'login-required',
  checkLoginIframe: false,
  enable3PC: false,
  //redirectUri: window.location.origin, // ✅ this is important
};

const KeycloakGroupsLogger: React.FC = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (keycloak?.authenticated && keycloak.tokenParsed?.groups?.length > 0) {
        const rawGroups = keycloak.tokenParsed!.groups;
        const cleanedGroups = rawGroups.map((group: string) =>
          group.replace(/^\//, '').replace(/_events$/, '')
        );
        console.log("user groups: ",cleanedGroups);

        localStorage.setItem("usergroups", JSON.stringify(cleanedGroups));
       if(cleanedGroups.length<2) localStorage.setItem("usergroup", cleanedGroups[0]); // first one stays

        if (window.location.pathname === '/' || window.location.pathname === '/login') {
          navigate('/', { replace: true });
        }
                clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [keycloak, navigate]);

  return null;
};




const App: React.FC = () => (
  <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
    <ConfigProvider
      locale={enUSIntl}
      theme={{
        algorithm: defaultAlgorithm,
        token: {
          fontSize: 16,
          borderRadius: 14
        }
      }}
    >
      <Router>
        <Provider store={store}>
          <KeycloakGroupsLogger />
          <Routes />
        </Provider>
      </Router>
    </ConfigProvider>
  </ReactKeycloakProvider>
);

export default App;
