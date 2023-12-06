import React from 'react';
import { 
  createBrowserRouter,
  RouterProvider, 
   } from 'react-router-dom';

import './App.css';
import ProjectList from './components/projectList/projectList';
import ProjectSummary from './components/projectSummary/projectSummary';
import { ThemeProvider } from "@material-tailwind/react";

const router = createBrowserRouter([
  {
    path: '/',
    element:  <ProjectList/>
  },

  {
    path: '/projects',
    element:  <ProjectList/>
  },

  {
    path: '/projects/:id',
    element: <ProjectSummary/>
    
  }

])

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router}/>
    </ThemeProvider>

  );
}

export default App;
