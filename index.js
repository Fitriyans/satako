const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const multer = require('multer');
const PredictService = require('./src/service/service');
const PredictHandler = require('./src/server/handler'); // Perbarui jalur ini
dotenv.config();

const productRoute = require("./src/routes/product.route");
const userRoute = require('./src/routes/user.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize PredictService and PredictHandler
const predictService = new PredictService();
const predictHandler = new PredictHandler(predictService);

// Define route for prediction
app.post('/api/predict', upload.single('image'), predictHandler.getPredictResult);

// Routes
app.use("/api/products", productRoute);
app.use('/api/users', userRoute);

// Connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Cannot connect to the database!", error);
  });
