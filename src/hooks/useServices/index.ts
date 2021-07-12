import {
	ISerivcesConnectionContext,
	ServicesConnectionContext,
} from '@/contexts/servicesConnection';
import { useContext } from 'react';

export function useSerivces(): ISerivcesConnectionContext {
	const context = useContext(ServicesConnectionContext);
	return context;
}
