import React  from 'react';
import { DialogTitle,  } from '@mui/material';
import ModalBody from '../modalBody/modalBody';
import { Dialog, DialogBody, Button, DialogFooter, DialogHeader } from '@material-tailwind/react';



interface IModalContent {
    isModalOpen : boolean;
    onCloseModal () : void;
    onValidate () : void;
    onSetDescription (e : string) : void;
    onSetProjectName (e: string) : void;
    onSetComments (e: string) : void;
    onSetStatus (e: 'En attente' | 'En cours' | 'Terminé' | undefined ) : void;

}

function ModalLayout ({isModalOpen,
                        onCloseModal, 
                        onValidate, 
                        onSetComments, 
                        onSetDescription, 
                        onSetProjectName,
                        onSetStatus,
                    } : IModalContent) {


    return (
        <div>
             <Dialog open={isModalOpen}
                   handler={onCloseModal}
            >
                <DialogHeader>
                    <DialogTitle> Ajouter un projet</DialogTitle>
                </DialogHeader>
                <DialogBody>

                <ModalBody 
                       onDescriptionSet={onSetDescription}
                       onProjectNameSet={onSetProjectName}
                       onCommentsSet={onSetComments} 
                       onStatusSet={onSetStatus}
                />
                 

                </DialogBody>
                <DialogFooter>
                <Button variant="text"
                        color="red"
                        onClick={() => onCloseModal()  }
                        className="mr-1"
                >
                    <span>Fermer</span>
                </Button>
                <Button variant="text"
                        color="blue"
                        onClick={() => onValidate()  }
                        className="mr-1"
                >
                    <span>Valider</span>
                </Button>
                </DialogFooter>                     
            </Dialog>
    
        </div>
            
        )
    }

    export default ModalLayout;