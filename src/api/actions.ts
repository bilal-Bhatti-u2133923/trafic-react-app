import axios, { AxiosError } from "axios";

const API_URL = "https://zany-engine-pvvgrwjjgqjfqp9-3000.app.github.dev/api";/**add https://  */

export const getTrafficData = async (city: string): Promise<TrafficData> => {
  return new Promise<TrafficData>((resolve, reject) => {
    axios
      .get(`${API_URL}/Traffic/${city}`)
      .then((res) => {
        resolve({
          city: city,
          Traffic: res.data.Traffic,
          rain: res.data.rain,
          wind: res.data.wind,
          sun: res.data.sun,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("City not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};

export const getGameData = async (usernumber: string ): Promise<gameData> => {
  return new Promise<gameData>((resolve, reject) => {
    axios
      .get(`${API_URL}/game/${usernumber}`)
      .then((res) => {
        resolve({
          icon: res.data.icon,
          iconName: res.data.iconName,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("level not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
