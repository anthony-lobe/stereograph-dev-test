import { Button, Modal } from '@mui/material';
import React, {useState} from 'react';
import { Link,} from 'react-router-dom';
import axios from 'axios';

interface IBoardLayout {
    projects: any[];
    onDeleting () : void;

}

function BoardLayout({projects, onDeleting}: IBoardLayout) {


    const onDeletingProject = (projectId: number) => {
        const urlToFetch = `http://localhost:3000/projects/${projectId}`
        axios.delete(urlToFetch,)
             .then( (response) => {
                onDeleting()
                console.log(response.data)
                console.log(`project with id ${projectId} has been Deleted`)
             })
             .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  } else if (error.request) {
                    console.log(error.request);
                  } else {
                    console.log('Error', error.message);
                  }
                  console.log(error.config);

             }
        )
    }
    return(
        <div>
            
            {projects ? (
            <div>
            <table className="table-auto">
                    <thead>
                        <tr>
                        <th>Projets</th>
                        <th>description</th>
                        <th>Statuts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map( (item, index) => {
                            return (

                            <tr>
                            <td>{item.nom} </td>
                            <td>{item.description}</td>
                            <td>{item.etape}</td>
                            <td>
                                <Link to={`/project/${item.id}`}> consulter</Link>
                            </td>
                            <td>
                                <Button variant='outlined' onClick={() => onDeletingProject(item.id) }>
                                    supprimer
                                </Button>
                            </td>
                            </tr>
                            )
                        })
                        }
                        
                    </tbody>
            </table>
                        
            </div>
            ) : <p> Aucun projets disponible</p> }

        </div>

    )
}

export default BoardLayout;