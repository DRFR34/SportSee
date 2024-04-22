import React from 'react'

import "./LoadingOrNoDataMsg.scss"

export default function LoadingOrNoDataMsg({isLoading, expectedData}) {
  
  if (isLoading) {
    return (
      <div className='LoadingOrNoDataMsg'>
        {isLoading && <div className="loading-message">⏳ Chargement en cours...</div>}
        </div>
        )
  }
  
  return (
    <div className='LoadingOrNoDataMsg'>
      {isLoading && <div className="loading-message">Chargement en cours...</div>}
      {!expectedData  && <div className="error-message">Aucune donnée n'est disponible pour l'utilisateur spécifié.</div>}
    </div>
  )
}
