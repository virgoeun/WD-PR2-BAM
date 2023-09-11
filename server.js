const app = require("./app");
const { connectDB } = require("./db");
const PORT = process.env.PORT || 3000;

function connectToServer() {
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
}

connectDB().then(connectToServer);
