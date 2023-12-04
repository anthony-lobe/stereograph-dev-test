import React, {useState, useEffect} from 'react';
import axios,  { AxiosError, AxiosResponse } from "axios";
import BoardLayout from '../boardLayout/boardLayout';
import { Button, Modal } from '@mui/material';
import ModalContent from '../utils/modalContent/modalContent';
import Filters from '../utils/filters/filters';

function ProjectList () {

    const fetchUrl = 'http://localhost:3000/projects'
    const [searchedStatus, setSearchedStatus] = useState<'En attente' | 'En cours' | 'Terminé' | undefined>(undefined)
    const newUrl = fetchUrl + '?etape_like=' + searchedStatus
    const [allProjects, setAllProjects] = useState<any[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    
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

     useEffect( () => {
        if( searchedStatus === undefined) {
            getAllProjects(fetchUrl) 
        } else {
            getAllProjects(newUrl)
        }
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
            <BoardLayout projects={allProjects}
                         onDeleting={() => setIsFetching(!isFetching)}
            />
            <Modal open={isModalOpen}
                   onClose={() => setIsModalOpen(!isModalOpen)}
                   style={modalStyle}
            >
                <ModalContent latestId={allProjects.length}
                              closingModal={() => closingModalAfterAddingProjects()}
                />
            </Modal>
        </div>
    )
}


const modalStyle : React.CSSProperties | undefined = {
    position: "absolute",
    border: "2px solid #000",
    borderRadius: 10,
    backgroundColor: 'darkgray',
    height: 350,
    width: 420,
    margin: "auto",
    padding: "2%",

}

export default ProjectList;