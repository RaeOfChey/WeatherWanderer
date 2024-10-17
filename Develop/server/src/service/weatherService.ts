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
    public temperature: number,
    public description: string,
    public humidity: number,
    public windSpeed: number
  ) {}
}

// Complete the WeatherService class
class WeatherService {
  // Define the baseURL, API key, and city name properties
  private baseURL: string = process.env.API_BASE_URL || '';
  private apiKey: string = process.env.API_KEY || '';
  private cityName: string;

  constructor(cityName: string) {
    this.cityName = cityName;
  }

  // Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&appid=${this.apiKey}`);
    return response.json();
  }

  // Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };
  }

  // Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`;
  }

  // Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
  }

  // Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData[0]);
  }

  // Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return response.json();
  }

  // Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.main.temp,
      response.weather[0].description,
      response.main.humidity,
      response.wind.speed
    );
  }

  // Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    return weatherData.map(item => new Weather(
      item.main.temp,
      item.weather[0].description,
      item.main.humidity,
      item.wind.speed
    ));
  }

  // Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

export default new WeatherService();
