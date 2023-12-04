import React, {useState} from 'react';
import axios from 'axios';
import ModalBody from '../modalBody/modalBody';
import { Button } from '@mui/material';



interface IModalContent {
    latestId : number;
    closingModal(): void;
}

function ModalContent ({latestId, closingModal} : IModalContent) {

    const endPointUrl = 'http://localhost:3000/projects'
    const [projectName, setProjectName] = useState('')
    const [description, setDescription] = useState('')
    const [comments, setComments] = useState('')
    const [status, setStatus] = useState<'En attente' | 'En cours' | 'Terminé'| undefined>(undefined)

    const onValidate = () => {
        if (projectName !== '' 
            && description !== ''
            && comments !== '' 
            && status !== undefined) {
                const credentials = {
                    id : latestId + 1,
                    nom : projectName,
                    description : description,
                    commentaire : comments,
                    etape: status,
                }

                axios.post(endPointUrl, credentials, {
                    headers:  { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
    
                         }
                    }).then((response) => {
                        console.log(response.status, response.data.token);
                    } )

                setTimeout( () => {
                    closingModal();
                    
                }, 1000)
            }
        }
        
        
    return (
        <div>
            <ModalBody status={status}
                       onDescriptionSet={setDescription}
                       onProjectNameSet={setProjectName}
                       onCommentsSet={setComments} 
                       onStatusSet={setStatus}
            />
            <Button onClick={() => onValidate()} 
                    style={buttonStyle} 
            > Valider 
            </Button>

        </div>
            
        )
    }

    const buttonStyle : React.CSSProperties | undefined = {
        backgroundColor: 'grey',
        alignSelf: 'center',
        top: 20,
        left: 150,
    }

    export default ModalContent;