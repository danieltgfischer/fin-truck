import { Connection, Repository } from 'typeorm';
import { BillingOption, Truck } from '@/database/entities';

interface ICreateBilling {
	value: number;
	description: string;
	created_at: Date;
	truck: Truck;
	option: string;
}

interface IEditBillingOption extends ICreateBilling {
	id: string;
}

export class BilliginRepository {
	private billingepository: Repository<BillingOption>;

	constructor(connection: Connection) {
		this.billingepository = connection.getRepository(BillingOption);
	}

	public async getAllBillingOptions(): Promise<BillingOption[]> {
		try {
			const bills = await this.billingepository?.find();
			return bills;
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
		option,
	}: ICreateBilling): Promise<BillingOption> {
		try {
			const billingOption = await this.billingepository?.create({
				value,
				description,
				created_at,
				truck,
				option,
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
}
