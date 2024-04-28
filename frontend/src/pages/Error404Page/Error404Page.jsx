import React from 'react'
import { Link } from 'react-router-dom';


import './Error404Page.scss'

export default function error404Page({errorText='😕 La ressource demandée est introuvable.', homeLinkText="Retouner à la page d'accueil."}) {
  return (
    <main>
      <h1 className="errorCode">404</h1>
      <p className="errorMsg">
        <span>{errorText}</span>
      </p>
      <Link className="linkToHome" to="/"> {homeLinkText}</Link>
    </main>
  )
}

//== Other contents ideas:
//😕 Désolé, aucun utlisateur n'est sélectionné.
//Retourner sur la page d’accueil pour sélectionner un utilisateur.