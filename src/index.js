import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"; // CSS가 src 폴더에 있을 경우
import { RouterProvider } from 'react-router-dom';
import router from 'router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
