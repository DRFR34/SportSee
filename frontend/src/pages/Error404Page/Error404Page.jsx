import React from 'react'
import { Link } from 'react-router-dom';


import './Error404Page.scss'

export default function error404Page() {
  return (
    <main>
      <h1 className="errorCode">404</h1>
      <p className="errorMsg">
        <span>😕 Désolé, la ressource que vous demandez n'existe pas.</span>
      </p>
      <Link className="linkToHome" to="/">Retourner sur la page d’accueil pour sélectionner</Link>
    </main>
  )
}