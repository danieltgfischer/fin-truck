import { Connection, Repository } from 'typeorm';
import { Truck } from '@/services/database/entities';

interface ICreateTruck {
	name: string;
	board: string;
}
interface IEditTruck extends ICreateTruck {
	id: string;
}
export class TruckRepository {
	private truckRepository: Repository<Truck>;

	constructor(connection: Connection) {
		this.truckRepository = connection?.getRepository(Truck);
	}

	public async getAllTrucks(): Promise<Truck[]> {
		try {
			const trucks = await this.truckRepository?.find();
			return trucks;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async getTruck(id: string): Promise<Truck> {
		try {
			const truck = await this.truckRepository?.findOne(id, {
				relations: ['billing_options'],
			});
			return truck;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async createTruck({ name, board }: ICreateTruck): Promise<Truck> {
		try {
			const truck = await this.truckRepository?.create({
				name,
				board,
			});
			await this.truckRepository?.save(truck);
			return truck;
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}

	public async editTruck({ id, name, board }: IEditTruck): Promise<Truck> {
		try {
			const truck = await this.truckRepository?.findOne(id);
			truck.board = board;
			truck.name = name;
			await this.truckRepository?.save(truck);
			return truck;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async deleteTruck(id: string): Promise<void> {
		try {
			await this.truckRepository?.delete(id);
		} catch (error) {
			throw new Error(error);
		}
	}
}
