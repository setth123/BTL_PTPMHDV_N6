import express from "express";
import {getRecommendations} from "../services/recommendService.js"; // Đảm bảo rằng bạn đang import đúng

const carRecommendRouter = express.Router();

// Endpoint để gợi ý xe dựa trên số tiền trả trước và số tiền trả hàng tháng
carRecommendRouter.post('/', async (req, res) => {
    try {
        const { downPayment, monthlyPayment } = req.body;
    
         if (typeof downPayment !== 'number' || typeof monthlyPayment !== 'number') {
            return res.status(400).json({ 
            error: "Invalid input",
            details: "Down payment and monthly payment must be numbers"
        });
    }
    
    try {
        const recommendations = await getRecommendations(downPayment, monthlyPayment);
        
        
        if (recommendations.length === 0) {
        return res.status(404).json({ 
        message: "No matching car recommendations found",
        details: { downPayment, monthlyPayment }
        });
    }
    
    return res.status(201).json({
        message: 'Car recommendations successfully retrieved',
        data: recommendations
    });
    
    } catch (recommendationError) {
        console.error('Recommendation generation error:', recommendationError);
        return res.status(500).json({ 
        message: "Failed to generate car recommendations",
        details: recommendationError.message
        });
    }
    } catch (err) {
        console.error("Unexpected error in car recommendation endpoint:", err);
        return res.status(500).json({ 
        message: "Internal server error", 
        details: err.message 
        });
    }
});

export default carRecommendRouter;
