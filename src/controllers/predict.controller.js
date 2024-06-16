const tf = require('@tensorflow/tfjs-node');
const Prediction = require('../models/predict.model');
const fs = require('fs');
const path = require('path');
const getDiseaseInfo = require('../utils/diseaseInfo');


class PredictController {
    constructor() {
        this.getPredictResult = this.getPredictResult.bind(this);
        this.getPredictionHistory = this.getPredictionHistory.bind(this);
    }

    async getPredictResult(req, res) {
        try {
            console.log('Request received:', req.file);
            console.log('Authenticated user:', req.user); // Log the authenticated user

            const imagePath = path.join(__dirname, '..', '..', 'uploads', req.file.filename);

            console.log('Starting to process the image...');
            const modelPath = 'https://storage.googleapis.com/satakoml/model_tfjs/model.json';
            const model = await tf.loadLayersModel(modelPath);
            console.log('Model loaded successfully.');

            // Ensure the image buffer is received correctly
            const imageBuffer = fs.readFileSync(imagePath);
            console.log('Image buffer size:', imageBuffer.length);

            // Decode the image buffer to a tensor
            const tensor = tf.node
                .decodeImage(imageBuffer, 3) // 3 channels (RGB)
                .resizeBilinear([224, 224]) // Resize to [240, 240]
                .expandDims()
                .toFloat();

            console.log('Image decoded and tensor created:', tensor.shape);

            // Predict using the model
            const prediction = model.predict(tensor);
            const scores = await prediction.data();
            const confidenceScore = Math.max(...scores);
            const label = tf.argMax(prediction, 1).dataSync()[0];

            console.log('Prediction made successfully with score:', scores);

            const diseaseInfo = getDiseaseInfo(label);

            // Save prediction to history
            const predictionHistory = new Prediction({
                userId: req.user.id,
                imageUrl: req.file.path, 
                disease: diseaseInfo.name,
                confidenceScore,
                description: diseaseInfo.description,
                causes: diseaseInfo.causes,
                // solutions: diseaseInfo.solutions
                solutions: diseaseInfo.solutions.join('\n')
            });
            await predictionHistory.save();

            return res.status(200).json({
                status: 'success',
                message: 'Predict success',
                data: {
                    disease: diseaseInfo.name,
                    confidenceScore,
                    description: diseaseInfo.description,
                    causes: diseaseInfo.causes,
                    solutions: diseaseInfo.solutions.join('\n'),
                    imageUrl: req.file.path
                }
            });
        } catch (error) {
            console.error('Error in controller:', error);
            return res.status(500).json({
                status: 'error',
                message: 'An internal server error occurred'
            });
        }
    }

    async getPredictionHistory(req, res) {
        try {
            const userId = req.user.id;
            const history = await Prediction.find({ userId }).sort({ createdAt: -1 });
            return res.status(200).json({
                status: 'success',
                data: history
            });
        } catch (error) {
            console.error('Error fetching history:', error);
            return res.status(500).json({
                status: 'error',
                message: 'An internal server error occurred'
            });
        }
    }
}

module.exports = PredictController;