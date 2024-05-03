import React from 'react'
import PropTypes from 'prop-types';



import "./LoadingOrNoDataMsg.scss"
/**
 * Renders a loading or no data message based on the provided props.
 *
 * @param {Object} props - The props object 
 * @param {boolean} porps.isLoading indicating whether the data is currently being loaded.
 * @param {Object} props.expectedData:  the expected data.
 * @return {JSX.Element} The rendered loading or no data message.
 */

export default function LoadingOrNoDataMsg({ isLoading, expectedData }) {

  if (isLoading) {
    return (
      <div className='LoadingOrNoDataMsg'>
        <div className="loading-message">⏳ Chargement en cours...</div>
      </div>
    )
  }

  // if (!isLoading && !expectedData ) {    
  if (!isLoading ) {    
    return (
      <div className='LoadingOrNoDataMsg'>
        <div className="loading-message">Aucune donnée disponible</div>
      </div>
    )
  }
}

LoadingOrNoDataMsg.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  expectedData: PropTypes.object
};