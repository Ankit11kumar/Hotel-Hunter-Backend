Prerequisites:
-> Make sure you have node and npm setup in your system.

Steps to run:

1. Create a .env file in the root folder of your backend project.
2. Add the following to your .env
    PORT = 3000
    GOOGLE_MAPS_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'
    GOOGLE_API_KEY = your_google_api_key_with_places_api_enabled
3. Navigate to the root folder of your frontend project in the terminal.
4. Run "npm install" to install the required dependencies.
5. You can run your project using -
    npm start (to run for once) 
        or 
    npm run dev (for continuously running server on dev)