import React from 'react'
import LoadingOrNoDataMsg from '../LoadingOrNoDataMsg/LoadingOrNoDataMsg'

export default function ProfileHeader( { isLoading, userMainData} ) {

    const currentUserFirstName = userMainData?.firstName;

    if (!userMainData || ( !userMainData.firstName)) {
        return (
            <section className='profileHeader'>
                <LoadingOrNoDataMsg isLoading={isLoading} expectedData={userMainData?.firstName} />
            </section>
        )
    }

  return (
    <section className="profileHeader">

        <h1 className="profileHeader__title">
          
          <span className='profileHeader__title--black'>Bonjour </span>

          <span className='profileHeader__title--red'>{currentUserFirstName}</span>
          <span className='profileHeader__title--red'></span>
        </h1>
        <p className="profileHeader__text">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </section>
  )
}
