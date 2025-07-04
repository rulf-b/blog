import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';

const MainRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
  </Routes>
);

export default MainRouter;