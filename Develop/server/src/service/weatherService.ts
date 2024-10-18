import dotenv from 'dotenv';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Define a class for the Weather object
class Weather {
  constructor(
    public city: string,
    public tempF: number,
    public date: number,
    public icon: string,
    public iconDescription: string,
    public humidity: number,
    public windSpeed: number
  ) {}
}

// Complete the WeatherService class
class WeatherService {
  private baseURL: string = 'https://api.openweathermap.org';
  private apiKey: string = '9911d5ed9fe8ecd593c1ac1f47d3646f';
  private cityName: string;

  constructor(cityName: string) {
    this.cityName = cityName;
  }

  // Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
        const response = await fetch(this.buildGeocodeQuery(query));
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error; // Rethrow or handle it as needed
    }
}

  // Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.lat,  // Adjust based on the actual API response structure
      longitude: locationData.lon,  // Adjust based on the actual API response structure
    };
  }

  // Create buildGeocodeQuery method
  private buildGeocodeQuery(query: string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${query}&appid=${this.apiKey}`;
  }

  // Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    try {
        const locationData = await this.fetchLocationData(this.cityName);
        console.log('Fetched location data:', locationData); // Log fetched location data

        // Check if locationData has any entries
        if (!locationData || !Array.isArray(locationData) || locationData.length === 0) {
            throw new Error(`No location data found for city: ${this.cityName}`);
        }

        return this.destructureLocationData(locationData[0]);
    } catch (error) {
        console.error('Error in fetchAndDestructureLocationData:', error);
        throw error; // Rethrow or handle it as needed
    }
}

  // Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
        const response = await fetch(this.buildWeatherQuery(coordinates));
        console.log('API response status:', response.status); // Log API response status
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Rethrow or handle it as needed
    }
}

  // Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
  }

  // Create parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    console.log(response)
    return new Weather(
      response.name,
      response.main.temp,
      response.dt,
      response.weather[0].icon,
      response.weather[0].description,
      response.main.humidity,
      response.wind.speed
    );
  }

  // Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);

    return currentWeather;
  }
}

// Export the WeatherService instance
export default new WeatherService('DefaultCityName');