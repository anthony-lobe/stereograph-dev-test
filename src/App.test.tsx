import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import ProjectList from './components/projectList/projectList';
import ProjectSummary from './components/projectSummary/projectSummary';
import { createBrowserRouter } from 'react-router-dom';



describe('App', () => {
  it('renders the App component with ThemeProvider and RouterProvider', () => {
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
    const { getByTestId } = render(<App  />);

    const themeProviderElement = getByTestId('theme-provider');
    const routerProviderElement = getByTestId('router-provider');

    expect(themeProviderElement).toBeInTheDocument();
    expect(routerProviderElement).toBeInTheDocument();
  });
});
