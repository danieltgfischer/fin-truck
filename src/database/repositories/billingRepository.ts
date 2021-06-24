import { Connection, Repository } from 'typeorm';
import { BillingOption, Truck } from '@/database/entities';

interface ICreateBilling {
	value: number;
	description: string;
	created_at: Date;
	truck: Truck;
	option: string;
	month: number;
	year: number;
}

interface IGetByMonth {
	truckId: string;
	month: number;
	year: number;
}

interface IGetAll {
	truckId: string;
}

interface IEditBillingOption {
	id: string;
	value: number;
	description: string;
}
interface IYears {
	years: number[];
}
export class BilliginRepository {
	private billingepository: Repository<BillingOption>;

	constructor(connection: Connection) {
		this.billingepository = connection.getRepository(BillingOption);
	}

	public async getAllBillingOptions({
		truckId,
	}: IGetAll): Promise<BillingOption[]> {
		try {
			const bills = await this.billingepository?.find({
				where: { truck: { id: truckId } },
			});
			return bills;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async getBillingOptionsByMonth({
		truckId,
		month,
		year,
	}: IGetByMonth): Promise<BillingOption[]> {
		try {
			const billingOptions = await this.billingepository.find({
				where: {
					truck: { id: truckId },
					month,
					year,
				},
				order: {
					created_at: 'DESC',
				},
			});
			return billingOptions;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async getBillingOption(id: number): Promise<BillingOption> {
		try {
			const billing = await this.billingepository?.findOne(id);
			return billing;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async createBillingOption({
		value,
		description,
		created_at,
		truck,
		month,
		year,
		option,
	}: ICreateBilling): Promise<BillingOption> {
		try {
			const billingOption = await this.billingepository?.create({
				value,
				description,
				created_at,
				truck,
				option,
				month,
				year,
			});
			await this.billingepository?.save(billingOption);
			return billingOption;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async editTruck({
		id,
		value,
		description,
	}: IEditBillingOption): Promise<BillingOption> {
		try {
			const billingOption = await this.billingepository?.findOne(id);
			billingOption.value = value;
			billingOption.description = description;
			await this.billingepository?.save(billingOption);
			return billingOption;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async deleteBilling(id: string): Promise<void> {
		try {
			await this.billingepository?.delete(id);
		} catch (error) {
			throw new Error(error);
		}
	}

	public async deleteAllBillings(billings: BillingOption[]): Promise<void> {
		try {
			await this.billingepository?.remove(billings);
		} catch (error) {
			throw new Error(error);
		}
	}

	public async getYears(truckId: string): Promise<IYears> {
		try {
			const dates = await this.billingepository
				?.createQueryBuilder('billingOption')
				.where('billingOption.truckId = :truckId', { truckId })
				.select('billingOption.created_at')
				.getMany();
			const years = Array.from(dates).map(b => {
				const date = new Date(b.created_at);
				return date.getFullYear();
			});
			return { years: Array.from(new Set(years)) };
		} catch (error) {
			throw new Error(error);
		}
	}
}
