import { TYPES } from 'mssql';
import { Database, SQLParam } from '../database';
import { Car } from '../types/car.types';

export class CarService {
  private static mapRowToCar = (row: Record<string, any>): Car => ({
    id: row.ID,
    make: row.Make,
    model: row.Model,
    year: row.Year,
    price: row.Price,
  });

  static async getCars(): Promise<Car[]> {
    const procedureName = 'getAllCars';
    const result = await Database.executeProcedure(procedureName);
    return result?.map(this.mapRowToCar);
  }

  static async upsertCar(data: Partial<Car>) {
    const procedureName = 'upsertCar';

    const params: SQLParam[] = [
      { name: 'ID', type: TYPES.Int, value: data.id || null },
      { name: 'Make', type: TYPES.VarChar(50), value: data.make },
      { name: 'Model', type: TYPES.VarChar(50), value: data.model },
      { name: 'Year', type: TYPES.Int, value: data.year },
      { name: 'Price', type: TYPES.Decimal(10, 2), value: data.price },
    ].filter((param) => param.value !== undefined);
    const result = await Database.executeProcedure(procedureName, params);
    return result?.map(this.mapRowToCar)[0];
  }
}
