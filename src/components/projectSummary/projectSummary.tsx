import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";

type Project = {
    id: number,
    nom: string,
    description: string,
    commentaire: string,
    etape : 'En attente' | 'En cours' | 'Terminé';
    
}

function ProjectSummary () {

    const projectId = useParams()

    const fetchUrl = `http://localhost:3000/projects/${projectId.id}`

    const [project, setProject] = useState<Project>()

    const [isFetching, setIsFetching] = useState(false)


    const onFetching = (response: AxiosResponse) => {
        if (response.data) {
            setIsFetching(true)
            setProject(response.data)
        }

    }

    const getProjectById = () => {
        axios.get(fetchUrl)
             .then((response) => {
                onFetching(response)
             })
             .catch ( (error) => {
                const err = error as AxiosError
                console.log(err.response?.data)

             } )
             .finally( () => {
                setIsFetching(false)
             })
    }

    useEffect(() => {

        getProjectById()
    // eslint-disable-next-line 
    }, [isFetching])

    return (
        <div> 
            {project ? (
                    <Card className="mt-6 items-center m-5 w-96">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {project.nom}
                            </Typography>
                            <Typography>
                               Description : {project.description}
                            </Typography>
                            <Typography>
                                Commentaires : {project.commentaire}
                            </Typography>
                            <div className='flex flex-row'>
                                <Typography> Etape :   </Typography>
                                <Typography color={
                                            project.etape === "Terminé"
                                            ? "green"
                                            : project.etape === "En cours"
                                            ? "amber"
                                            : "red"
                                        }>
                                {project.etape}
                                </Typography>
                            </div>
                        </CardBody>
                    </Card>
            ): <p> Aucune description disponible</p>}
        </div>
    )
}

export default ProjectSummary;