


  // The SportSee API includes four kinds of endpoints:
  // `http://localhost:3000/user/${userId}` 
  // `http://localhost:3000/user/${userId}/activity` 
  // `http://localhost:3000/user/${userId}/average-sessions` 
  // `http://localhost:3000/user/${userId}/performance` 
 





import axios from 'axios';
import UserModelisedData from './dataModelisationClass';
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from '../assets/data/mockedData';


/**
 * Create a new instance of Axios with a custom basURL.
 * the 3005 port is fictiv and it is used to test the failling of the server response
 * @type {import("axios").AxiosInstance}
 */
const axiosAPI = axios.create({
  baseURL: 'http://localhost:3000/user/'
  // baseURL: 'http://localhost:3005/user/'
});

const noServerMsg = `
    **************** ATTENTION ******************** 

            Le serveur n'a pas répondu.
    Les graphiques afficheront vos données locales.

    ***********************************************
`;

/**
 * API service for handling user-related data.
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

  static alertShown = false; 

  /**
   * In case the server is not responding, fetch the local data, and displays an alert informing the user.
   * @static
   * @param {number} currentUserId - The ID of the current user
   * @param {string} idKey - The key used for user ID in the data
   * @param {Array} relevantLocalData - Array of relevant local data objects
   * @returns {object} - User data object
   */
  static handleServerError(currentUserId, idKey, relevantLocalData) {

    if (!ApiService.alertShown) {
      alert(noServerMsg);
      ApiService.alertShown = true;
    }

    const currentUserData = relevantLocalData.find((usersData) => usersData[idKey] === currentUserId);
     
    if (currentUserData) {
      return new UserModelisedData(currentUserData);
    } 
    else {
      throw new Error('User not found');
    }
  }

  /**
   * Retrieves the main data for a user (online, else local).
   * @static
   * @param {number} currentUserId - The ID of the current user
   * @returns {object} - User main data object
   */
  static async getUserMainData(currentUserId) {
    try {
      const response = await axiosAPI.get(`${currentUserId}`);
      return new UserModelisedData(response.data.data);
    } catch (Error) {
      return ApiService.handleServerError(currentUserId, "id", USER_MAIN_DATA)
    };
  }

  /**
   * Retrieves the activity data for a user (online, if not local).
   * @static
   * @param {number} currentUserId - The ID of the current user
   * @returns {object} - User activity data object
   */
  static async getUserActivity(currentUserId) {
    try {
      const response = await axiosAPI.get(`${currentUserId}/activity`);
      return new UserModelisedData(response.data.data);
    } catch (Error) {
      return ApiService.handleServerError(currentUserId, "userId", USER_ACTIVITY)
    }
  }

 /**
   * Retrieves the average sessions data for a user (online, else, local)
   * @static
   * @param {number} currentUserId - The ID of the current user
   * @returns {object} - User average sessions data object
   */
  static async getUserAverageSessions(currentUserId) {
    try {
      const response = await axiosAPI.get(`${currentUserId}/average-sessions`);
      return new UserModelisedData(response.data.data);
    } catch (Error) {
      return ApiService.handleServerError(currentUserId, "userId", USER_AVERAGE_SESSIONS)
    }
  }

/**
   * Retrieves the performance data for a user (online, else local)
   * @static
   * @param {number} currentUserId - The ID of the current user
   * @returns {object} - User performance data object
   */
  static async getUserPerformance(currentUserId) {
    try {
      const response = await axiosAPI.get(`${currentUserId}/performance`);
      return new UserModelisedData(response.data.data);
    } catch (Error) {
      return ApiService.handleServerError(currentUserId, "userId", USER_PERFORMANCE)
    }
  }
}


