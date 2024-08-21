import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import  store  from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider, theme } from 'antd';
import enUSIntl from 'antd/lib/locale/en_US';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render( <Provider store={store}>
      <ConfigProvider
          locale={enUSIntl}

        theme={{
          token: {
            "colorPrimary": "#418cc0",
            "fontSize": 16,
            "borderRadius": 6,
            
        },
  
          // 1. Use dark algorithm
          algorithm: theme.darkAlgorithm,
    
          // 2. Combine dark algorithm and compact algorithm
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
  
      >
       

          <App />  </ConfigProvider></Provider>,
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
  