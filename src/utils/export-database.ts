import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { BillingOption } from '@/database/entities';

interface IDatabase {
	data: BillingOption[];
	path: string;
	xlsx_name: string;
	locale: string;
}

export async function asyncShareDatabase({
	data,
	path,
	xlsx_name,
	locale,
}: IDatabase): Promise<void> {
	const header =
		locale === 'pt-BR'
			? [['Valor', 'Descrição', 'Opção', 'Data', 'Mês', 'Ano']]
			: [['Value', 'Description', 'Option', 'Date', 'Month', 'Year']];
	const dataCleaned = data.map(opt => {
		delete opt.id;
		delete opt.truck;
		return opt;
	});

	const ws = XLSX.utils.json_to_sheet(dataCleaned);
	const wb = XLSX.utils.book_new();
	XLSX.utils.sheet_add_aoa(ws, header);
	XLSX.utils.book_append_sheet(wb, ws, xlsx_name);
	const wbout = XLSX.write(wb, {
		type: 'base64',
		bookType: 'xlsx',
	});
	try {
		const uri = `${FileSystem.cacheDirectory}${path}.xlsx`;
		await FileSystem.writeAsStringAsync(uri, wbout, {
			encoding: FileSystem.EncodingType.Base64,
		});
		await Sharing.shareAsync(uri);
	} catch (error) {
		console.error(error);
	}
}

async function saveDatabase(fileUri: string) {
	try {
		const { status } = await MediaLibrary.requestPermissionsAsync();
		if (status === 'granted') {
			const asset = await MediaLibrary.createAssetAsync(fileUri);
			await MediaLibrary.createAlbumAsync('FinTruck', asset, false);
		}
	} catch (error) {
		console.error(error);
	}
}

export async function asyncDownloadDatabase({
	data,
	path,
	xlsx_name,
	locale,
}: IDatabase): Promise<void> {
	const header =
		locale === 'pt-BR'
			? [['Valor', 'Descrição', 'Opção', 'Data', 'Mês', 'Ano']]
			: [['Value', 'Description', 'Option', 'Date', 'Month', 'Year']];
	const dataCleaned = data.map(opt => {
		delete opt.id;
		delete opt.truck;
		return opt;
	});
	const ws = XLSX.utils.json_to_sheet(dataCleaned);
	XLSX.utils.sheet_add_aoa(ws, header);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, xlsx_name);
	const wbout = XLSX.write(wb, {
		type: 'base64',
		bookType: 'xlsx',
	});
	try {
		const uri = `${FileSystem.cacheDirectory}${path}.xlsx`;
		await FileSystem.writeAsStringAsync(uri, wbout, {
			encoding: FileSystem.EncodingType.Base64,
		});
		saveDatabase(uri);
	} catch (error) {
		console.error(error);
	}
}
