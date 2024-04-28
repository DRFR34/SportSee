
import './noServerModal.scss';

/**
 * Creates a modal for when the server is not responding.
 *
 * @return {undefined} No return value.
 */
export default function noServerModal() {

        const modal = document.createElement('div');
        modal.classList.add('modal');

        const msgBox = document.createElement('div');
        msgBox.className = 'msgBox';
        
        const closeModalBtn = document.createElement('button');
        closeModalBtn.className = 'msgBox__closeModalBtn';
        closeModalBtn.textContent = 'Fermer'; 
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('isInactivated');
        });

            msgBox.innerHTML = `
                    <p class="msgBox__text">
                        <span>ATTENTION !</span>
                        <br/>
                        <br/>
                        Le serveur n'a pas répondu.<br/>
                        Les graphiques afficheront vos données locales.                   
                    </p>
                    <br/>
                    <br/>
                    
                </div>
            </div>
        `;

        msgBox.appendChild(closeModalBtn);
        modal.appendChild(msgBox);
        document.querySelector('#root').appendChild(modal);

}

