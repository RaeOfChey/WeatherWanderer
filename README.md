# Weather Wanderer

### Status: In Progress

![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Walkthrough](#walkthrough)
6. [Tools and Technologies](#tools-and-technologies)
7. [Dependencies and Installs](#dependencies-and-installs)
8. [License](#license)
9. [Contributing](#contributing)
10. [Tests](#tests)
11. [Questions](#questions)

## Description
Weather Wanderer is a dynamic weather dashboard that fetches 5-day forecasts from the OpenWeather API. Search for any city to view current weather conditions, including temperature, wind speed, and humidity. Save cities to a search history, revisit forecasts, and easily plan your trips!

## Features
- Retrieve current and future weather conditions for any city.
- View 5-day weather forecasts with details like temperature, humidity, wind speed, and weather icons.
- Save searched cities in a search history for quick access.
- Click on any saved city to load its weather data again.
- Responsive and user-friendly interface.

## Installation
To use the application, follow these steps:

1. Clone the repository
2. Navigate to the project directory: `cd weather-wanderer`.
3. Install the necessary dependencies: `npm install`.
4. Create a .env file in the root directory and add your OpenWeather API key: API_KEY=your_openweather_api_key.
5. Start the server: `npm start`.

## Usage
You will be prompted with options to search for a city’s weather or select a city from your search history.

When using the weather dashboard, the 'following prompt will appear: 'Enter City Name'
Input the name of the city you want to retrieve weather data for.

Once a city is entered, the following information will be displayed:
- City Name and Date: The name of the city and the current date.
- Current Weather: Displays temperature, humidity, wind speed, and a weather condition icon.
- 5-Day Forecast: Shows the weather forecast for the next 5 days, including the temperature, wind speed, humidity, and a weather condition icon.
  
When selecting a city from the search history, the following prompt will appear: 'View Current and Future Conditions'
Reload the weather data for the selected city from the search history.

Each time you search for a city, it will automatically be saved to the search history, allowing you to easily revisit past searches.

## Tools and Technologies
**Frontend Framework**:
- React
- React Router

**State Management**:
- useState Hook

**Styling**:
  - Custom CSS
  - CSS Media Queries
  - CSS Animations

**Hosting**:
- Render

## Dependencies and Installs

**NPM Packages**:
  - `react`, `react-dom` - Core React dependencies.
  - `react-router-dom` - For page routing.
  - `typescript` - Provides type safety.
  - `vite` - Used for initial project setup and fast builds.
  - `eslint` - Enforces code standards with `.eslintrc.cjs` configuration

## Walkthrough
A complete walkthrough video demonstrating the application will be available soon.

## License
This project is licensed under the MIT License, which allows you to freely use, modify, and distribute this software, provided proper attribution is given.

## Contributing
This project is part of a coding bootcamp assignment and is not open for contributions. To comply with the course requirements, I must complete this project individually without outside assistance. Therefore, pull requests, issues, or other contributions will not be accepted. Thank you for understanding!

## Tests
Currently, this project does not have any automated tests.

## Questions
If you have any questions about the repository, feel free to reach out by opening an issue or contacting me directly at cheyennaraelynn@gmail.com You can also find more of my work on GitHub at https://github.com/RaeOfChey.
