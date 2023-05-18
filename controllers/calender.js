// Replace with your client ID and client secret obtained from the Google API Console
const dotenv = require("dotenv");
dotenv.config();
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

// Credentials of the google account
// use your own credentials here
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Create an OAuth2 client
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Configure the Google Calendar API
const calendar = google.calendar({ version: "v3", auth: oauth2Client });
module.exports.GoogleCalendarInitView = (req, res) => {
  try {
    // Generate the URL for the authorization page
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar.readonly"],
    });
    res.redirect(authUrl);
    console.log(authUrl);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.GoogleCalendarRedirectView = async (req, res) => {
  // get the code from the query parameters
  const { code } = req.query;
  try {
    // Exchange the authorization code for an access token
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Retrieve a list of events from the user's calendar
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 20,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items;
    // Handle the events data as needed
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).send("Error retrieving events");
  }
};
