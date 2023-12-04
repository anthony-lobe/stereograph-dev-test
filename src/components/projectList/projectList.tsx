import React, {useState, useEffect} from 'react';
import axios,  { AxiosError, AxiosResponse } from "axios";
import BoardLayout from '../boardLayout/boardLayout';

function ProjectList () {

    const fetchUrl = 'http://localhost:3000/projects'
    const [allProjects, setAllProjects] = useState<any[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const onFetching = (response: AxiosResponse) => {
        if (response.data) {
            setIsFetching(true)
            setAllProjects(response.data)
        }

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
            <BoardLayout projects={allProjects}/>
        </div>
    )
}

export default ProjectList;