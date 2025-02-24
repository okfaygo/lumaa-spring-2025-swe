import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Tasks from './components/Tasks';
import ProtectedRoute from './components/ProtectedRoute';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path='register' element={<App />} />
        <Route path="login" element={<Login />} />  
        
        {/* Protect the /tasks route properly */}
        <Route element={<ProtectedRoute />}>
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
// In the index.js file, we have set up the routing for our application using the BrowserRouter and Routes components from react-router-dom. We define three routes: the index route for the App component, the /login route for the Login component, and the /tasks route for the Tasks component.