import React from 'react';
import { 
  createBrowserRouter,
  RouterProvider, 
   } from 'react-router-dom';

import './App.css';
import ProjectList from './components/projectList/projectList';
import ProjectSummary from './components/projectSummary/projectSummary';

const router = createBrowserRouter([
  {
    path: '/',
    element:  <ProjectList/>
  },

  {
    path: '/project/:id',
    element: <ProjectSummary/>
    
  }

])

function App() {
  return (

    <RouterProvider router={router}/>

  );
}

export default App;
