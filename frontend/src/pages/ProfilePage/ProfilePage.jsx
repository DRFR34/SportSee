import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

//-- Components

import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import CallsSwitcher from '../../components/CallsSwitcher/CallsSwitcher';
import NutriCardsList from '../../components/NutriCardsList/NutriCardsList';
import Error404Page, { p404Options } from '../Error404Page/Error404Page';

  //  Charts components
import ActivityChart from '../../components/ActivityChart/ActivityChart';
import SessionsChart from '../../components/SessionsChart/SessionsChart';
import PerformancesChart from '../../components/PerformancesChart/PerformancesChart';
import ScoreChart from '../../components/ScoreChart/ScoreChart';


//--  Style
import "./ProfilePage.scss"

/**
 * @description ProfilePage component displays the profile page for a specific user.
 * It capture the user ID from the URL, and transmits it, to the to its child CallsSwitcher component as props.
 * 
 * @params - none
 * @returns {React.JSX.Element} ProfilePage component
 */

export default function ProfilePage() {
  const { idSlug } = useParams(); // idSlug's name defined in the router
  const currentUserId = Number(idSlug);
  const [userisFound, setUserIsFound] = useState(true);
  


  

  if (!userisFound) {
    return (
      <main>
        <Error404Page
          errorText={p404Options.opt2.errorText}
          homeLinkText={p404Options.opt2.homeLinkText}
        />
      </main>
    );
  }


  return (
    <main>

      <CallsSwitcher 
        currentUserId={currentUserId}
        setUserIsFound={setUserIsFound}
      >
        {({ isLoading, userMainData, userActivityData, userAverageSessions, userPerformance }) => (
          
          <>

            <ProfileHeader 
              isLoading={isLoading}
              userMainData={userMainData}
            />

            <section className='dashboard'>

              <div className="dashboard__chartsCol1">

                <div className='dashboard__chartsCol1__chartsRow1'>
                  <ActivityChart
                    isLoading={isLoading}
                    userActivityData={userActivityData}
                  />
                </div>
                <div className='dashboard__chartsCol1__chartsRow2'>
                  <SessionsChart
                    isLoading={isLoading}
                    userAverageSessions={userAverageSessions}
                  />

                  <PerformancesChart
                    isLoading={isLoading}
                    userPerformance={userPerformance}
                  />

                  <ScoreChart
                    isLoading={isLoading}
                    userMainData={userMainData}
                  />

                </div>
              </div>
              <div className="dashboard__chartsCol2">
                
                <NutriCardsList
                  isLoading={isLoading}
                  userMainData={userMainData}
                />
              </div>
            </section>
          </>
        )}
      </CallsSwitcher>
    </main>
  );
}

ProfilePage.propTypes = {
  idSlug: PropTypes.string // extracted form the page's URL
};
