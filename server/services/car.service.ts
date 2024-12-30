import { Database } from "../database";

export class CarService {
  static async getCars() {
    const query = "CALL fetchCars();";
    return await Database.executeQuery(query);
  }

  static async upsertCar(data: {
    ID?: number;
    Make: string;
    Model: string;
    Year: number;
    Price: number;
  }) {
    const query = "CALL upsertCar(?, ?, ?, ?, ?);";
    const params = [
      data.ID || null,
      data.Make,
      data.Model,
      data.Year,
      data.Price,
    ];
    return await Database.executeQuery(query, params);
  }
}
