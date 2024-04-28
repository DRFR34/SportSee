import React, {  useState } from 'react';
import './ModalMsgBox.scss';

export default function ModalMsgBox(){

    const [modalClassName, setModalClassName] = useState('modal');

    function closeModal() {
        setModalClassName('modal isInactivated');
    }
 

    return (
        <div className={modalClassName}>
            <div className="msgBox">
                <p className="msgBox__textContent">
                    <span className='msgBox__textContent__title'>
                        titre
                    </span>
                    <span className='msgBox__textContent__text'>
                        texte
                    </span>                                      
                </p>
                <br/><br/>
                <button 
                className="msgBoxBtn" 
                onClick={() => closeModal()}>
                    Fermer	
                    </button>
            </div>
        </div>
    )
}