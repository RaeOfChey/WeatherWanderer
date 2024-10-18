import fs from 'fs/promises';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'node:url';

// Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete the HistoryService class
class HistoryService {
  private filePath = path.join(__dirname, 'searchHistory.json');

  // Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    console.log('Reading search history from:', this.filePath);
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      console.log('Search history data:', data);
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error('Error reading search history:', error);
      return []; // Return an empty array if the file doesn't exist or another error occurs
    }
  }

  // Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      // Write the updated cities array to the file, formatting with 2 spaces
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing to search history:', error);
    }
  }

  // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const citiesData = await this.read();
    return citiesData.map(city => new City(city.name, city.id));
  }

  // Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string) {
    const cities = await this.getCities();
    const newCity = new City(cityName, uuidv4());
    cities.push(newCity);
    await this.write(cities);
  }

  // Bonus: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    let cities = await this.getCities();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();
