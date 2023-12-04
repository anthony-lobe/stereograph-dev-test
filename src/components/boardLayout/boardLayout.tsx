import { Button, Modal } from '@mui/material';
import { PencilIcon } from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/solid";
import React, {useState} from 'react';
import { Link,} from 'react-router-dom';
import axios from 'axios';
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
  } from "@material-tailwind/react";

interface IBoardLayout {
    projects: any[];
    onDeleting () : void;

}

const TABLE_HEAD = ['Nom du projet', 'Description', 'Status',  '', '',]

function BoardLayout({projects, onDeleting}: IBoardLayout) {


    const onDeletingProject = (projectId: number) => {
        const urlToFetch = `http://localhost:3000/projects/${projectId}`
        axios.delete(urlToFetch)
             .then( (response) => {
                onDeleting()
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
            <Card className="h-full w-full">
            <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                {TABLE_HEAD.map((head) => (
                    <th
                        key={head}
                        className="border-y border-blue-gray-100  bg-blue-gray-50/50 p-4"
                    >
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal  opacity-70"
                        >
                            {head}
                        </Typography>
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {projects.map( (item, index) => {
                     const isLast = index === projects.length - 1;
                     const classes = isLast
                       ? "p-4"
                       : "p-4 border-b border-blue-gray-50";
                    return (
                        <tr key={item.nom}>
                            <td className={classes}>
                        
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold"
                                    >
                                        {item.nom}
                                    </Typography>

                            </td>
                        
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {item.description}
                                </Typography>

                            </td>
                            <td className={classes}>
                                <div className="w-max">
                                    <Chip
                                    size="sm"
                                    variant="ghost"
                                    value={item.etape}
                                    color={
                                        item.etape === "Terminé"
                                        ? "green"
                                        : item.etape === "En cours"
                                        ? "amber"
                                        : "red"
                                    }
                                    />
                                </div>
                            </td>
                            <td className={classes}>
                                <Tooltip content="Consulter">
                                    <IconButton variant="text">
                                        <Link to={`/project/${item.id}`}>
                                         <PencilIcon className="h-4 w-4" />
                                        </Link>
                                    </IconButton>
                                </Tooltip>
                            </td>
                            <td className={classes}>
                                <Tooltip content="Supprimer">
                                    <IconButton variant="text" onClick={() => onDeletingProject(item.id) }>
                                        <TrashIcon className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                                    
                            </td>


                        </tr>
                


                    )
            })}

            </tbody>
         

            </table>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <div className="flex items-center gap-2">
                    <IconButton variant="outlined" size="sm">
                        1
                    </IconButton>
                    <IconButton variant="text" size="sm">
                        2
                    </IconButton>
                    <IconButton variant="text" size="sm">
                        ...
                    </IconButton>
        
                    <IconButton variant="text" size="sm">
                        10
                    </IconButton>
                </div>
        
            </CardFooter>


            </CardBody>

            </Card>
                        
            </div>
            ) : <p> Aucun projets disponible</p> }

        </div>

    )
}

export default BoardLayout;