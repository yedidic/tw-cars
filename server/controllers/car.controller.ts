import { Request, Response } from "express";
import { CarService } from "../services/car.service;

export class CarController {
  static async getCars(req: Request, res: Response) {
    try {
      const cars = await CarService.getCars();
      res.json(cars);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async upsertCar(req: Request, res: Response) {
    try {
      const result = await CarService.upsertCar(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
