import { Connection, Repository } from 'typeorm';
import { BillingOption } from '@/services/database/entities';
import { optionsObj } from '@/screens/addOption/options';
import * as Types from './types';

export class BilliginRepository {
	private billingepository: Repository<BillingOption>;

	constructor(connection: Connection) {
		this.billingepository = connection.getRepository(BillingOption);
	}

	public async getAllBillingOptions({
		truckId,
	}: Types.IGetAll): Promise<BillingOption[]> {
		try {
			const bills = await this.billingepository?.find({
				where: { truck: { id: truckId } },
				cache: true,
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
	}: Types.IGetByMonth): Promise<BillingOption[]> {
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
				cache: true,
			});
			return billingOptions;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async getBillingOptionsByYear({
		truckId,
		year,
	}: Types.IGetByYear): Promise<BillingOption[]> {
		try {
			const billingOptions = await this.billingepository.find({
				where: {
					truck: { id: truckId },
					year,
				},
				order: {
					created_at: 'DESC',
				},
				cache: true,
			});
			return billingOptions;
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
		monthName,
		year,
		option,
	}: Types.ICreateBilling): Promise<BillingOption> {
		try {
			const billingOption = await this.billingepository?.create({
				value,
				description,
				created_at,
				truck,
				option,
				month,
				monthName,
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
	}: Types.IEditBillingOption): Promise<BillingOption> {
		try {
			const billingOption = await this.billingepository?.findOne({
				where: { id },
				cache: true,
			});
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

	public async getYears(id: string): Promise<Types.IYears> {
		try {
			const dates = await this.billingepository.find({
				where: {
					truck: { id },
				},
				select: ['created_at'],
				cache: true,
			});
			const years = Array.from(dates).map(b => {
				const date = new Date(b.created_at);
				return date.getFullYear();
			});
			return {
				total_years: Array.from(new Set(years)).sort((a, b) => b - a) ?? [],
			};
		} catch (error) {
			throw new Error(error);
		}
	}

	public async getYearInfo(
		year: number,
		id: string,
	): Promise<Types.IResumeInfo> {
		try {
			const options = Object.keys(optionsObj);
			const { costs } = await this.billingepository
				.createQueryBuilder('billings')
				.where('billings.truckId = :id', { id })
				.andWhere('billings.year = :year', { year })
				.andWhere('billings.option IN (:...options)', {
					options: options.filter(o => o !== 'shipping'),
				})
				.select('SUM(billings.value)', 'costs')
				.cache(true)
				.getRawOne();
			const { gains } = await this.billingepository
				.createQueryBuilder('billings')
				.where('billings.truckId = :id', { id })
				.andWhere('billings.year = :year', { year })
				.andWhere('billings.option IN (:...options)', {
					options: options.filter(o => o === 'shipping'),
				})
				.select('SUM(billings.value)', 'gains')
				.cache(true)
				.getRawOne();
			const yearInfo = {
				costs: costs ?? 0,
				gains: gains ?? 0,
				sub_total: gains - costs,
			};
			return yearInfo;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async getMonthInfo(
		year: number,
		id: string,
		month: number,
	): Promise<Types.IResumeInfo> {
		try {
			const options = Object.keys(optionsObj);
			const { gains } = await this.billingepository
				.createQueryBuilder('billings')
				.where('billings.truckId = :id', { id })
				.andWhere('billings.month = :month', { month })
				.andWhere('billings.year = :year', { year })
				.andWhere('billings.option IN (:...options)', {
					options: options.filter(o => o === 'shipping'),
				})
				.select('SUM(billings.value)', 'gains')
				.cache(true)
				.getRawOne();

			const { costs } = await this.billingepository
				.createQueryBuilder('billings')
				.where('billings.truckId = :id', { id })
				.andWhere('billings.month = :month', { month })
				.andWhere('billings.year = :year', { year })
				.andWhere('billings.option IN (:...options)', {
					options: options.filter(o => o !== 'shipping'),
				})
				.select('SUM(billings.value)', 'costs')
				.cache(true)
				.getRawOne();

			const monthInfo = {
				costs: costs ?? 0,
				gains: gains ?? 0,
				sub_total: gains - costs,
			};
			return monthInfo;
		} catch (error) {
			throw new Error(error);
		}
	}

	public async getTimelineYearAndMonthUpdated(
		id: string,
		month: number,
		year: number,
	): Promise<Types.ITimelineUpdated> {
		try {
			const monthBillings = await this.getBillingOptionsByMonth({
				truckId: id,
				month,
				year,
			});
			const monthResume = await this.getMonthInfo(year, id, month);
			const yearResume = await this.getYearInfo(year, id);
			const { total_years } = await this.getYears(id);
			return {
				monthBillings,
				monthResume,
				yearResume,
				total_years,
			};
		} catch (error) {
			throw new Error(error);
		}
	}
}
