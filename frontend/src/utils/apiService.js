import axios from 'axios';
import UserModelisedData from './dataModelisationClass';
import serverOffModal from './serverOffModal/serverOffModal';
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from '../assets/data/mockedData';

export let serverPort = {
  _value: '3000',
  get value() {
    return this._value;
  },
  set value(newValue) {
    console.log('Setting serverPort.value to', newValue);
    this._value = newValue;
    axiosAPI.defaults.baseURL = `http://localhost:${newValue}/user/`;
  }
};

const axiosAPI = axios.create({
  baseURL: `http://localhost:${serverPort.value}/user/`
});


/**
 * API service for handling user-related data.
 * The ApiService class owns static methods.
 * Each of these methods serves to fetch the data from one of the API end-points.
 * If the loading of the distant data fails, the method substitute it with the corresponding local data.
 * When the local data is used, display a modal informing the user.
 *  In any case, the data modelised, and a JSON data is returned.
 * If nor distant or local data is available, the method display an error message
 *
 * @export
 * @class ApiService
 * @typedef {ApiService}
 */
export default class ApiService {

  static srvrOffModalShown = false;
  static serverOffModal = serverOffModal;
  static isUserFound = false;

  /**
  * In case the server is not responding, fetch the local data, and displays an alert informing the user.
  * @static
  * @param {number} currentUserId - The ID of the current user
  * @param {string} idKey - The key used for user ID in the data
  * @param {Array} relevantLocalData - Array of relevant local data objects
  * @returns {object} - User data object
  */
  static handleServerError(currentUserId, idKey, relevantLocalData) {
    try {

      //ApiService.isUserFound is used to avoid displaying the modal on Error 404 page
      if (!ApiService.srvrOffModalShown && ApiService.isUserFound) {
        ApiService.serverOffModal();
        ApiService.srvrOffModalShown = true;
      }

      const currentUserData = relevantLocalData.find((userData) => userData[idKey] === currentUserId);

      if (currentUserData) {

        ApiService.isUserFound = true;

        // In doubt, serialize the currentUserData to JSON
        const currentUserJson = JSON.stringify(currentUserData);

        // Modeling the data, and parsing the JSON in an iterable object => create a deep copy of currentUserData ( keeps it imutable)
        return new UserModelisedData(JSON.parse(currentUserJson));

      } else {
        ApiService.isUserFound = false;
        throw new Error('User not found');
      }

    } catch (error) {

      console.error(error.message === 'User not found' ? 'Utilisateur non trouvé. Redirection vers la page 404...' : error);

    }
  }



  /**
   * Retrieves the main data for a user (online, else local).
   * @static
   * @param {number} currentUserId - The ID of the current user
   * @returns {Promise<UserModelisedData>} - User main data object
   */
  static async getUserMainData(currentUserId) {
    try {
      const response = await axiosAPI.get(`${currentUserId}`);
      console.log("response.data.data", response.data.data)
      return new UserModelisedData(response.data.data);
    } catch (Error) {
      return ApiService.handleServerError(currentUserId, "id", USER_MAIN_DATA)
    };
  }

  /**
   * Retrieves the activity data for a user (online, else local).
   * @static
   * @param {number} currentUserId - The ID of the current user
   * @returns {Promise<UserModelisedData>} - User activity data object
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
    * @returns {Promise<UserModelisedData>} - User average sessions data object
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
     * @returns {Promise<UserModelisedData>} - User performance data object
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


