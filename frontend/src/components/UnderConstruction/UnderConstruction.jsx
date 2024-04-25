import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './UnderConstruction.scss'


/**
 * @description UnderConstruction component displays a message indicating that the page is under construction.
 *
 * @param {Object} props - The props of the UnderConstruction component.
 * @param {string} props.margin - The margin style for the container.
 * @returns {React.Element} UnderConstruction component
 */
export default function UnderConstruction({margin}) {
  return (
    <div className='underConstContainer' style={{ margin: margin }} >
      <h1 className= 'underConstContainer__title' > 🚧 Page en construction 🚧</h1>
      <Link className="underConstContainer__linkToHome" to="/">Retourner sur la page d’accueil</Link>
    </div>
  )
}

UnderConstruction.propTypes = {
  margin: PropTypes.string.isRequired
};