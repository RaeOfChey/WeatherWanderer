import fs from 'fs/promises';
import path from 'node:path';

// Define a City class with name and id properties
class City {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

// Complete the HistoryService class
class HistoryService {
  constructor() {
    this.filePath = path.join(process.cwd(), 'searchHistory.json');
  }

  // Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  }

  // Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities) {
    try {
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
  async addCity(cityName) {
    const cities = await this.getCities();
    const newCity = new City(cityName, new Date().getTime().toString()); // Using timestamp as unique ID
    cities.push(newCity);
    await this.write(cities);
  }

  // Bonus: Define a removeCity method that removes a city from the searchHistory.json file
async removeCity(id) {
    let cities = await this.getCities();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();
