import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import BoardLayout from './boardLayout';


jest.mock('axios');

const projects = [
  {
    id: 1,
    nom: 'Project 1',
    description: 'Description 1',
    etape: 'En cours',
  },
];

describe('BoardLayout Component', () => {
  it('renders projects when provided', () => {
    render(<BoardLayout projects={projects} onDeleting={() => {}} />);

    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('En cours')).toBeInTheDocument();
  });

  it('renders "Aucun projets disponible" when no projects are provided', () => {
    render(<BoardLayout projects={[]} onDeleting={() => {}} />);

    expect(screen.getByText('Aucun projets disponible')).toBeInTheDocument();
  });

  it('calls onDeleting when delete button is clicked', async () => {
    const onDeletingMock = jest.fn();
    render(<BoardLayout projects={projects} onDeleting={onDeletingMock} />);

    

    fireEvent.click(screen.getAllByTitle('Supprimer')[0]);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        'http://localhost:3000/projects/1'
      );
    });

    expect(onDeletingMock).toHaveBeenCalled();
  });
});
