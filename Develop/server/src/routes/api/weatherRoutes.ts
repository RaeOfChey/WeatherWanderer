import { Router } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (_req, res) => {
  try {
    const { cityName } = _req.body; // Change this line

    // Validate city input
    if (!cityName || typeof cityName !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid city name' });
    }

    // Use WeatherService to get weather data
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    return res.status(200).json({ success: true, data: weatherData });
  } catch (error) {
    console.error('Error in weather route:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving weather data' });
  }
});

// GET search history
router.get('/history', async (_req, res) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json({ success: true, data: cities }); // Return the response here
  } catch (error) {
    console.error('Error retrieving search history:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving search history' }); // Ensure to return the response
  }
});

// BONUS: DELETE city from search history
router.delete('/history/:id', async (_req, res) => {
  try {
    const { id } = _req.params;
    await HistoryService.removeCity(id);
    return res.status(200).json({ success: true, message: `City with id ${id} removed` }); // Return the response here
  } catch (error) {
    console.error('Error removing city from history:', error);
    return res.status(500).json({ success: false, message: 'Error removing city from search history' }); // Ensure to return the response
  }
});

export default router;
