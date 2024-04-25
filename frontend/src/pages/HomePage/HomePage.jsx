

import React from 'react'
import { Link } from 'react-router-dom';

import './HomePage.scss'

import karlImg from '../../assets/images/Karl.png';
import ceciliaImg from '../../assets/images/Cecilia.png';


/**
 * @description HomePage component renders the home page content.
 * Currently under construction, the page displays a list of 2 test users with links to their profiles.
 *
 * @returns {JSX.Element} HomePage component
 */
export default function HomePage() {
    return (
            <main>
                <div className='homeHeader'>
                    <h1 className="homeHeader__title">Sélectionnez l'utilisateur </h1>
                    <ul className='homeHeader__homeUl'>
                        <li>
                            <Link to="/profil/18"
                                className='userLink' > <img src={ceciliaImg} alt="Cecilia" />
                                Cecilia
                            </Link>
                        </li>
                        <li>
                            <Link to="/profil/12"
                                className='userLink' > <img src={karlImg} alt="Karl" />
                                Karl
                            </Link>
                        </li>

                    </ul>
                </div>
            </main>
    )
}

