
import React from 'react'
import './modalBody.css'
import { Input, Radio, Typography } from '@material-tailwind/react';

interface IModalBody {
    onProjectNameSet (e: any) : void;
    onDescriptionSet (e: any) : void;
    onCommentsSet (e: any) : void;
    onStatusSet (e: 'En cours' | 'En attente' | 'Terminé' ) : void;
}


function ModalBody ({onProjectNameSet, 
                     onCommentsSet, 
                     onDescriptionSet, 
                     onStatusSet,
                    }: IModalBody
                   ) {
    return (
        <div className="flex  flex-col gap-10">

            <Input label='Nom du projet'
                   variant='outlined'
                   onChange={(e) => onProjectNameSet(e.target.value)} 
                   crossOrigin={undefined}
                   
            />

            <Input label='Description du projet'
                   variant='outlined'
                   onChange={(e) => onDescriptionSet(e.target.value)} 
                   crossOrigin={undefined}
                   className='h-16'

            />

            <Input label='Insérez vos commentaires'
                   variant='outlined'
                   onChange={(e) => onCommentsSet(e.target.value)} 
                   crossOrigin={undefined}
                   className='h-24'

            />

            <div className="flex mt-5 w-max gap-4">

                <div className=' flex  '>
                <Radio name="status"
                    onClick={() => onStatusSet('En attente')} 
                    crossOrigin={undefined} 
                    color='red'
                />

                <Typography className=' mt-2 '> En attente </Typography>

                </div>

                <div className=' flex  '>
                <Radio name="status"
                    onClick={() => onStatusSet('En cours')} 
                    crossOrigin={undefined} 
                    color='orange'
                />

                <Typography className=' mt-2'> En cours  </Typography>

                </div>

                <div className=' flex  '>
                <Radio name="status"
                    onClick={() => onStatusSet('Terminé')} 
                    crossOrigin={undefined} 
                    color='green'
                />

                <Typography className=' mt-2'> Terminé  </Typography>

            </div>
        
      
     
    </div>
        </div>
    )
}

export default ModalBody;