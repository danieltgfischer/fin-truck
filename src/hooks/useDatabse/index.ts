import {
	DatabaseConnectionContext,
	IDatabaseConnectionContext,
} from '@/contexts/databaseConnection';
import { useContext } from 'react';

export function useDatabaseConnection(): IDatabaseConnectionContext {
	const context = useContext(DatabaseConnectionContext);

	return context;
}
