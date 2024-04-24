import React from 'react'
import './NutritionCard.scss'
export default function NutritionCard({ icon, count, unit, category }) {


  return (
    <article className='nutriCard'>
      <div className="nutriCard__IconBox">
        <img src={icon} alt="icône" />
      </div>
      <div className="nutriCard__textsBox">
        <span className='nutriCard__textsBox__count'> {count} <span></span> <span> {unit} </span></span>
        <span className="nutriCard__textsBox__category"> {category} </span>
      </div>
    </article>
  )
}
