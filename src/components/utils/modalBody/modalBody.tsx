
import React from 'react'
import './modalBody.css'

interface IModalBody {
    onProjectNameSet (e: any) : void;
    onDescriptionSet (e: any) : void;
    onCommentsSet (e: any) : void;
    onStatusSet (e: 'En cours' | 'En attente' | 'Terminé' ) : void;
    status : 'En cours' | 'En attente' | 'Terminé' | undefined;
}


function ModalBody ({onProjectNameSet, 
                     onCommentsSet, 
                     onDescriptionSet, 
                     onStatusSet,
                     status
                    }: IModalBody
                   ) {
    return (
        <div>
            <input name="projectName"
                  onChange={(e) => onProjectNameSet(e.target.value)} 
                  className="input-style"
                  placeholder="Nom du projet"
            />
            <input name="projectDescription"
                   onChange={(e) => onDescriptionSet(e.target.value)}
                   className="input-for-long-text" 
                   placeholder="Description du projet"
            />
            <input name="projectComments"
                   onChange={(e) => onCommentsSet(e.target.value)} 
                   className="input-for-long-text"
                   placeholder="insérez vos commentaires"
            />

            <p> STATUS : </p>
        <div>

        <label>
            <input type="radio" 
                   name="projectStatus" 
                   value={status}
                   onClick={() => onStatusSet('En attente')}
                   className="radio-button-style"
            /> 
            En attente 
        </label>
        <label>
            <input type="radio" 
                   name="projectStatus"
                   value={status} 
                   onClick={() => onStatusSet('En cours')}
                   className="radio-button-style"
            /> 
            En cours 
        </label>
        <label>
            <input type="radio" 
                   name="projectStatus" 
                   value={status} 
                   onClick={() => onStatusSet('Terminé')}
                   className="radio-button-style"
            /> 
            Terminé 
        </label>
    </div>
        </div>
    )
}

export default ModalBody;