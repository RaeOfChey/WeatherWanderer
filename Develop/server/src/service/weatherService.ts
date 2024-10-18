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
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
  }

  private parseCurrentWeather(response: any): [Weather, Weather[]] {
    console.log('API response:', response); // Log the entire response to inspect its structure
  
    const current = response.list[0];
    const currentWeather = new Weather(
      response.city.name, // City's name from the response
      current.main.temp, // Current temperature
      current.dt, // Timestamp for the current weather data
      current.weather[0].icon, // Weather icon for the current condition
      current.weather[0].description, // Description of the current weather
      current.main.humidity, // Humidity
      current.wind.speed // Wind speed
    );
  
    let forecast: Weather[] = [];
    
    // Loop through the forecast entries every 8th item (24-hour intervals)
    for (let i = 4; i < response.list.length; i += 8) {
      const singleDay = response.list[i];
      
      // No 'name' property in forecast data; use city name for each forecast entry
      const forecastDay = new Weather(
        response.city.name, // City's name from the response
        singleDay.main.temp, // Temperature for the forecasted day
        singleDay.dt, // Timestamp for the forecasted day
        singleDay.weather[0].icon, // Weather icon
        singleDay.weather[0].description, // Weather description
        singleDay.main.humidity, // Humidity for the forecasted day
        singleDay.wind.speed // Wind speed for the forecasted day
      );
      
      forecast.push(forecastDay);
    }
  
    return [currentWeather, forecast];
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