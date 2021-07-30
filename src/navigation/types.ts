export enum routeNames {
	Home = 'Home',
	AddTruck = 'Add Truck',
	Truck = 'Truck',
	DrawerRoot = 'DrawerRoot',
	AddOption = 'AddOption',
	Timeline = 'Timeline',
	Welcome = 'Welcome',
	Donate = 'Donate',
	License = 'License',
	LicenseDescription = 'LicenseDescription',
}

export type RootStackParamList = {
	[routeNames.Home]: undefined;
	[routeNames.AddTruck]: undefined;
	[routeNames.AddOption]: {
		option: string;
	};
	[routeNames.DrawerRoot]: undefined;
	[routeNames.Timeline]: undefined;
	[routeNames.Welcome]: undefined;
	[routeNames.Donate]: undefined;
	[routeNames.License]: undefined;
	[routeNames.LicenseDescription]: {
		name: string;
		description: string;
	};
};

export type DrawerParamList = {
	[routeNames.Truck]: undefined;
};
