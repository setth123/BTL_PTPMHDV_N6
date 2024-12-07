import express from 'express';
import { getPriceCal } from '../services/priceCalService.js';

const PriceRouter = express.Router();


PriceRouter.post('/calculate/:carverid/:bankid/:downpayrate/:loanterm', async (req, res) => {
    const { carverid, bankid, downpayrate, loanterm } = req.params;

    const carVerId = carverid;
    const bankId = bankid;
    const downPayRate = parseFloat(downpayrate);
    const loanTerm = parseInt(loanterm);

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
