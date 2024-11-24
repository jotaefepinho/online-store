// server.js
const app = require('./app'); // Import the app configuration from app.js
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
