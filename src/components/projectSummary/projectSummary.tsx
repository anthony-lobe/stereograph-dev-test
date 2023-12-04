import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';
import { useParams } from 'react-router-dom';

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

    }, [isFetching])

    return (
        <div> 
            {project ? (
                <div>
                    <p> id : {project.id}</p>   
                    <p>Nom du projet : {project.nom}</p>
                    <p> Description : {project.description}</p>
                    <p> Commentaire : {project.commentaire}</p>
                    <p> Status : {project.etape}</p>
                </div>
            ): <p> Aucune description disponible</p>}
        </div>
    )
}

export default ProjectSummary;