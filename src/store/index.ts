import { createStore } from 'redux';
import { truckReducer } from './reducer';

const store = createStore(truckReducer);
export default store;
