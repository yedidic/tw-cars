import { Router } from 'express';
import { CarController } from '../controllers/car.controller';

export const carRoutes = Router();

carRoutes.get('/', CarController.getCars);
carRoutes.post('/', CarController.upsertCar);
