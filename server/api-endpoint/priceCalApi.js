import express from 'express';
import { getPriceCal } from '../services/priceCalService.js';

const PriceRouter = express.Router();

/**
 * POST /calculate
 * Body yêu cầu:
 * {
 *   "carVerId": "ID của phiên bản xe",
 *   "bankId": "ID của ngân hàng",
 *   "downPayRate": "Phần trăm trả trước",
 *   "loanTerm": "Thời hạn trả góp (năm)"
 * }
 */
PriceRouter.post('/calculate', async (req, res) => {
    const { carVerId, bankId, downPayRate, loanTerm } = req.body;

    
    if (!carVerId || !bankId || typeof downPayRate !== 'number' || typeof loanTerm !== 'number') {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {

        const result = await getPriceCal(carVerId, bankId, downPayRate, loanTerm);

        if (!result) {
            return res.status(404).json({ message: 'Data not found or invalid input' });
        }

        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default PriceRouter;
