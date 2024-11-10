import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider, createTheme } from '@mui/material';
const myTheme1 = createTheme({
  palette: {
    primary: {
      main: '#a27c07', // צבע כפתור ראשי
    },
    secondary: {
      main: '#920a0a', // צבע כפתור משני
    },
  },
});
const myTheme = createTheme({
  palette: {
    primary: {
      main: '#a27c07', // צבע כפתור ראשי
    },
    secondary: {
      main: '#920a0a', // צבע כפתור משני
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          '&.MuiCard-root': { // Selects all elements with class MuiCard-root
            borderColor: '#e9c1a06e',
          },
        },
      },
    },
  },
});

 const themOption=createTheme({
  palette: {
    background: {
        default: '#1111',
    },
    primary: {
    main: '#a27c07',
    },
    secondary: {
    main: '#920a0a',
    },
    error: {
    main: '#D72A2A',
    },
    warning: {
    main: '#FC7B09',
    },
    info: {
    main: '#6B7D6A',
    },
    success: {
    main: '#09FE00',
    },
    text: {
       main:'#111'
    },
}
  //  palette: {
  //     primary: {
  //       main: '#a27c07', // צבע כפתור ראשי
  //     },
  //     secondary: {
  //       main: '#920a0a', // צבע כפתור משני
  //     },
  //   },
   }
 );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <BrowserRouter>
 <Provider store={store}>
   <ThemeProvider theme={myTheme}>
    <App />
    </ThemeProvider>
    </Provider>
    </BrowserRouter> 
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
