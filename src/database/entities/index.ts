import {
	Entity,
	Column,
	BaseEntity,
	OneToMany,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

@Entity()
export class BillingOption extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('float')
	value: number;

	@Column({ type: 'text' })
	description: string;

	@Column()
	option: string;

	@Column({ type: 'datetime' })
	created_at: Date;

	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	@ManyToOne(() => Truck, truck => truck.billing_option, {
		cascade: true,
		eager: true,
	})
	@JoinColumn()
	truck: Truck;
}

@Entity()
export class Truck extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	board: string;

	@OneToMany(() => BillingOption, billing_option => billing_option.truck, {
		onDelete: 'CASCADE',
	})
	billing_option: BillingOption[];
}
