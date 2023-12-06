import React, {useState, useEffect} from 'react';
import axios,  { AxiosError, AxiosResponse } from "axios";
import BoardLayout from '../boardLayout/boardLayout';
import Filters from '../utils/filters/filters';
import { Button,  Typography  } from '@material-tailwind/react';
import ModalLayout from '../utils/modalLayout/modalLayout';

function ProjectList () {

    const fetchUrl = 'http://localhost:3000/projects'
    const [searchedStatus, setSearchedStatus] = useState<'En attente' | 'En cours' | 'Terminé' | undefined>(undefined)
    const newUrl = fetchUrl + '?etape_like=' + searchedStatus
    const [allProjects, setAllProjects] = useState<any[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [projectName, setProjectName] = useState('')
    const [description, setDescription] = useState('')
    const [comments, setComments] = useState('')
    const [status, setStatus] = useState<'En attente' | 'En cours' | 'Terminé'| undefined>(undefined)
  
    
    const onFetchingProjects = (response: AxiosResponse) => {
        if (response.data) {
            setIsFetching(true)
            setAllProjects(response.data)
        }

    }

    const onFiltering = (status: 'En attente' | 'En cours' | 'Terminé' | undefined ) => {

        setSearchedStatus(status)
        setIsFetching(!isFetching)

    }

    const onCloseModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    
    const closingModalAfterAddingProjects = () => {

        setIsFetching(!isFetching);
        setIsModalOpen(false);
    }

    const getAllProjects = (url: string) => {
        axios.get(url)
             .then((response) => {
                onFetchingProjects(response)
             })
             .catch ( (error) => {
                const err = error as AxiosError
                console.log(err.response?.data)

             } )
             .finally( () => {
                setIsFetching(false)
             })
     } 

     const onAddingProject = () => {
        if (projectName !== '' 
            && description !== ''
            && comments !== '' 
            && status !== undefined) {
                const credentials = {
                    id : allProjects.length + 1,
                    nom : projectName,
                    description : description,
                    commentaire : comments,
                    etape: status,
                }

                axios.post(fetchUrl, credentials, {
                    headers:  { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
    
                         }
                    }).then((response) => {
                        console.log(response.status, response.data.token);
                    } )

                    closingModalAfterAddingProjects();
               
            }
        }
        

     useEffect( () => {
        if( searchedStatus === undefined) {
            getAllProjects(fetchUrl) 
        } else {
            getAllProjects(newUrl)
        }
        // eslint-disable-next-line 
     }, [isFetching])


    return (
        <div>
            <div className='justify-end flex-row '>

            <Filters onFilteringAllProjects={() => onFiltering(undefined)}
                     onFilteringDoneProjects={() => onFiltering('Terminé')}
                     onFilteringPendingProjects={() => onFiltering('En cours')}
                     onFilteringWaitingProjects={() => onFiltering('En attente')}
            />
            {searchedStatus === undefined ?
                <Button variant='outlined' style={{margin: 10}} onClick={() => setIsModalOpen(true)}> 
                    Ajouter un projet 
                </Button>
            : null}
            </div>
            {allProjects.length !== 0 ? 
            
            <BoardLayout projects={allProjects}
                         onDeleting={() => setIsFetching(!isFetching)}
            />
            : <Typography className=' text-center '> Aucun Projet disponible </Typography>}
            <ModalLayout isModalOpen={isModalOpen}
                         onCloseModal={onCloseModal}
                         onValidate={onAddingProject}
                         onSetDescription={setDescription}
                         onSetProjectName={setProjectName}
                         onSetComments={setComments}
                         onSetStatus={setStatus}

            />

        </div>
    )
}


export default ProjectList;