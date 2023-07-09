import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import TestUI from './components/TestUI';
import NotFound from './components/NotFound';
import Landing from './components/Landing';
import AllTest from './components/AllTest';
import Result from './components/Result'
import Report from './components/Report'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path='/alltests' element={<AllTest />} />
          <Route path='/results' element={<Result />} />
          <Route path='/results/:id' element={<Report />} />
        </Route>
        <Route path='/test/:testID' element={<TestUI />} />
        <Route path='*' element={<NotFound />} />
        {/* /404 */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
