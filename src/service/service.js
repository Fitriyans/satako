const tf = require('@tensorflow/tfjs-node');

class PredictService {
  async predictImage(imageBuffer) {
    try {
      console.log('Starting to process the image...');
      const modelPath = 'https://storage.googleapis.com/model-ai-testing/model_tfjs/model.json';
      const model = await tf.loadLayersModel(modelPath);
      console.log('Model loaded successfully.');

      // Pastikan buffer gambar diterima dengan benar
      console.log('Image buffer size:', imageBuffer.length);

      // Decode the image buffer to a tensor
      const tensor = tf.node
        .decodeImage(imageBuffer, 3) // 3 channels (RGB)
        .resizeBilinear([240, 240]) // Resize to [240, 240]
        .expandDims()
        .toFloat();

      console.log('Image decoded and tensor created:', tensor.shape);

      // Predict using the model
      const prediction = model.predict(tensor);
      const scores = await prediction.data();
      const confidenceScore = Math.max(...scores);
      const label = tf.argMax(prediction, 1).dataSync()[0];

      console.log('Prediction made successfully with score:', scores);

      const diseaseLabels = ['Blight', 'Rust', 'Spot'];
      const diseaseLabel = diseaseLabels[label];

      // Return the prediction result
      return { confidenceScore, diseaseLabel };
    } catch (error) {
      console.error('Error during prediction:', error);
      throw new Error('Prediction failed');
    }
  }
}

module.exports = PredictService;
