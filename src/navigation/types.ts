export enum routeNames {
	Home = 'Home',
	AddTruck = 'Add Truck',
	Truck = 'Truck',
	DrawerRoot = 'DrawerRoot',
	AddOption = 'AddOption',
	Timeline = 'Timeline',
	Welcome = 'Welcome',
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
};

export type DrawerParamList = {
	[routeNames.Truck]: undefined;
};
