import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FormBuildReducer from './features-redux/BuildFormData'
import formEditReducers from './features-redux/EditFormRedux'
import FormData from './features-redux/FormData';
import  editForm  from './features-redux/Editform';
const root = ReactDOM.createRoot(document.getElementById('root'));


const store=configureStore({
  reducer:{formBuild:FormBuildReducer,
   formEdit:formEditReducers,
   formData:FormData,
   editForm:editForm
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
