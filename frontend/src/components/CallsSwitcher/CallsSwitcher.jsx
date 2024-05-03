import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ApiService from '../../utils/apiService.js';

/**
 * A component that fetches user data and renders its children with the fetched data.
 * @param {object} props - The props object.
 * @param {string} props.currentUserId - The ID of the current user.
 * @param {function} props.setUserIsFound - A function to set whether the user is found.
 * @param {function} props.children - The children to render with the fetched data.
 * @returns {ReactNode} The rendered children with the fetched data.
 */export default function CallsSwitcher({ currentUserId, setUserIsFound, children }) {


  //  states declarations
  const [userActivityData, setUserActivityData] = useState({});
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userMainData, setUserMainData] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [userScoreData, setUserScoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
/**
 * Fetches user data from the API and updates the state with the fetched data.
 * It is called every time the currentUserId changes.
 *
 * @return {Promise<void>} A Promise that resolves when the data is fetched and the state is updated.
 */
    const fetchData = async () => {
      setIsLoading(true);

      //  Retrieving User Data with the API service
      const fetchedMainData = await ApiService.getUserMainData(currentUserId);          
      const fetchedActivityData = await ApiService.getUserActivity(currentUserId);
      const fetchedSessionData = await ApiService.getUserAverageSessions(currentUserId);
      const fetchedPerformanceData = await ApiService.getUserPerformance(currentUserId);
      const fetchedScoreData = await ApiService.getUserMainData(currentUserId);

      //  setUserIsFound(false) will cause Error404Page in the ProfilePage if user is not found
      !fetchedMainData ? setUserIsFound(false) : setUserMainData(fetchedMainData);      
      
      setUserActivityData(fetchedActivityData);
      setUserAverageSessions(fetchedSessionData);
      setUserPerformance(fetchedPerformanceData);
      setUserScoreData(fetchedScoreData);
      setIsLoading(false);
    }

    fetchData();
     

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

//  Renders children with the fetched data
  return children({
    isLoading,
    userActivityData,
    userAverageSessions,
    userMainData,
    userPerformance,
    userScoreData
  });
}


// PropTypes
CallsSwitcher.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  setUserIsFound: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
};