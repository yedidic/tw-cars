import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Define the Car interface
export interface Car {
  id?: number; // Optional for new cars
  make: string;
  model: string;
  year: number;
  price: number;
}

// CarService class
export class CarService {
  private api: AxiosInstance;

  constructor(token: string) {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_SERVER_API_URL}/api/cars`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Get all cars
  public async getAllCars(): Promise<Car[]> {
    const response: AxiosResponse<Car[]> = await this.api.get('/');
    return response.data;
  }

  // Upsert a car (Insert if ID is not provided, Update if ID exists)
  public async upsertCar(car: Car): Promise<Car> {
    const response: AxiosResponse<Car> = await this.api.post('/', car);
    return response.data;
  }
}
