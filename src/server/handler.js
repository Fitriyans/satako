class PredictHandler {
    constructor(service) {
      this._service = service;
      this.getPredictResult = this.getPredictResult.bind(this);
    }
  
    async getPredictResult(req, res) {
      try {
        console.log('Request received:', req.file);
        const imageBuffer = req.file.buffer; // Mengambil buffer gambar dari multer
        const predict = await this._service.predictImage(imageBuffer);
        const { diseaseLabel, confidenceScore } = predict;
  
        return res.status(200).json({
          status: 'success',
          message: 'Predict success',
          data: {
            disease: diseaseLabel,
            confidenceScore
          }
        });
      } catch (error) {
        console.error('Error in handler:', error);
        return res.status(500).json({
          status: 'error',
          message: 'An internal server error occurred'
        });
      }
    }
  }
  
  module.exports = PredictHandler;  