import React from 'react'
import { Link } from 'react-router-dom';

import './UnderConstruction.scss'

export default function UnderConstruction() {
  return (
    <div className='underConstContainer' >
      <h1 underConstContainer__title > 🚧 Page en construction 🚧</h1>
      <Link className="underConstContainer__linkToHome" to="/">Retourner sur la page d’accueil</Link>
    </div>
  )
}
