import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//-- Components
import ActivityChart from '../../components/ActivityChart/ActivityChart';
import SessionsChart from '../../components/SessionsChart/SessionsChart';
import PerformancesChart from '../../components/PerformancesChart/PerformancesChart';
import ScoreChart from '../../components/ScoreChart/ScoreChart';
import NutriCardsList from '../../components/NutriCardsList/NutriCardsList';
import LoadingOrNoDataMsg from '../../components/LoadingOrNoDataMsg/LoadingOrNoDataMsg';

//-- Data files
import ApiService from '../../utils/apiService';


//--  Style
import "./ProfilePage.scss"

export default function ProfilePage() {
  const { idSlug } = useParams();


  const currentUserId = Number(idSlug);

  const [userMainData, setUserMainData] = useState(null); //userMainData is object
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const getUserMainData = async () => {
      setIsLoading(true);

      const fetchedData = await ApiService.getUserMainData(currentUserId);

      setUserMainData(fetchedData);

      setIsLoading(false);
    }

    getUserMainData();
  }, [currentUserId]);


  if (!userMainData) {
    return (
      <main className="nutriCardsContainer">
        <LoadingOrNoDataMsg isLoading={isLoading} expectedData={userMainData} />
      </main>
    )
  }

  const currentUserFirstName = userMainData
    ? userMainData.firstName
    : "prénom inconnu";

  return (

    <main>
      <section className="profileHeader">
        <h1 className="profileHeader__title">
          <span className='profileHeader__title--black'>Bonjour </span>

          <span className='profileHeader__title--red'>{currentUserFirstName}</span>
          <span className='profileHeader__title--red'></span>
        </h1>
        <p className="profileHeader__text">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </section>

      <section className='dashboard'>
        <div className="dashboard__chartsCol1">
          <div className='dashboard__chartsCol1__chartsRow1'>

            <ActivityChart currentUserId={currentUserId} />
          </div>
          <div className='dashboard__chartsCol1__chartsRow2'>
            <SessionsChart currentUserId={currentUserId} />

            <PerformancesChart currentUserId={currentUserId} />

            <ScoreChart currentUserId={currentUserId} />
          </div>
        </div>
        <div className="dashboard__chartsCol2">
          < NutriCardsList currentUserId={currentUserId} />
          {/* < NutriCardsList userMainData={userMainData} isLoading={isLoading} /> */}
        </div>

      </section>
    </main>

  );
}
