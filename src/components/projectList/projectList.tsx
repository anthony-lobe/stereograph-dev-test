import React, {useState, useEffect} from 'react';
import axios,  { AxiosError, AxiosResponse } from "axios";
import BoardLayout from '../boardLayout/boardLayout';
import { Button, Modal } from '@mui/material';
import ModalContent from '../utils/modalContent/modalContent';

function ProjectList () {

    const fetchUrl = 'http://localhost:3000/projects'
    const [allProjects, setAllProjects] = useState<any[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const onFetching = (response: AxiosResponse) => {
        if (response.data) {
            setIsFetching(true)
            setAllProjects(response.data)
        }

    }
    
    const closingModalAfterAddingProjects = () => {

        setIsFetching(!isFetching);
        setIsModalOpen(false);
    }

    const getAllProjects = (url: string) => {
        axios.get(url)
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

     useEffect( () => {
        getAllProjects(fetchUrl)
     }, [isFetching])


    return (
        <div>
            <BoardLayout projects={allProjects}
                         onDeleting={() => setIsFetching(!isFetching)}
            />
            <Button variant='outlined' onClick={() => setIsModalOpen(true)}> 
                Ajouter un projet 
            </Button>
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