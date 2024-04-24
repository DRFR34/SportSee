

import axios from 'axios';
import UserModelisedData from './dataModelisationClass';
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from '../assets/data/mockedData';



/** The SportSee API includes four kinds of endpoints: 
 * 

- `http://localhost:3000/user/${userId}` 
- `http://localhost:3000/user/${userId}/activity` 
- `http://localhost:3000/user/${userId}/average-sessions` 
- `http://localhost:3000/user/${userId}/performance` 
 */


const axiosAPI = axios.create({
  baseURL: 'http://localhost:3000/user/'
  // baseURL: 'http://localhost:3005/user/'
});

/**
 * The ApiService class owns static methods.
 * Each of these methods serves to fetch the data from one of the API end-points.
 * If the loading of the distant data fails, the method substitute it with the corresponding local data.
 * 
 * If nor distant or local data is available, the method display an error message
 *
 * @export
 * @class ApiService
 * @typedef {ApiService}
 */
export default class ApiService {

  static async getUserMainData(currentUserId) {
    try {
      const response = await axiosAPI.get(`${currentUserId}`);
      return new UserModelisedData(response.data.data);
    } catch (Error) {
      console.log("new UserModelisedData(USER_MAIN_DATA.find((userMainData) => userMainData.id === currentUserId))", new UserModelisedData(USER_MAIN_DATA.find((userMainData) => userMainData.id === currentUserId)));

      // return USER_MAIN_DATA.find((userMainData) => userMainData.id === currentUserId);
      const currentUserMainData = USER_MAIN_DATA.find((userMainData) => userMainData.id === currentUserId)
      return new UserModelisedData(currentUserMainData);

    };
  }

  static async getUserActivity(currentUserId) {
    try {
      const response = await axiosAPI.get(`${currentUserId}/activity`);
      return new UserModelisedData(response.data.data);
    } catch (Error) {
       return USER_ACTIVITY.find((useractivity) => useractivity.userId === currentUserId);
    }
  }



  static async getUserAverageSessions(currentUserId) {
    try {
      const response = await axiosAPI.get(`${currentUserId}/average-sessions`);
      return new UserModelisedData(response.data.data);
    } catch (Error) {
      return USER_AVERAGE_SESSIONS.find((userAverageSessions) => userAverageSessions.userId === currentUserId);
    }
  }

  static async getUserPerformance(currentUserId) {
    try {
      const response = await axiosAPI.get(`${currentUserId}/performance`);
      return new UserModelisedData(response.data.data);
    } catch (Error) {
      return USER_PERFORMANCE.find((userPerformance) => userPerformance.userId === currentUserId);
    }
  }
}


