import express from 'express';
import  handleSecretSanta from '../controllers/secretSantaController.js'

const router = express.Router();

router.post('/secret-santa', handleSecretSanta);

export default router;
