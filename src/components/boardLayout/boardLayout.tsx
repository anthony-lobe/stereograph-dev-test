import React, {useState} from 'react';
import { Link,} from 'react-router-dom';

interface IBoardLayout {
    projects: any[];

}

function BoardLayout({projects}: IBoardLayout) {
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