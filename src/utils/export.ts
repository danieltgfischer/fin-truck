import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const data = [
	{
		name: 'John',
		city: 'Seattle',
	},
	{
		name: 'Mike',
		city: 'Los Angeles',
	},
	{
		name: 'Zach',
		city: 'New York',
	},
];
const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Cities');

const wbout = XLSX.write(wb, {
	type: 'base64',
	bookType: 'xlsx',
});

export async function shareDatabase(): Promise<void> {
	const uri = `${FileSystem.cacheDirectory}cities.xlsx`;
	console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);

	await FileSystem.writeAsStringAsync(uri, wbout, {
		encoding: FileSystem.EncodingType.Base64,
	});

	await Sharing.shareAsync(uri, {
		dialogTitle: 'MyWater data',
		UTI: 'com.microsoft.excel.xlsx',
	});
}
