import {INCREMENT} from '../constants';

export default (counterState, action) =>  action.type === INCREMENT? counterState + 1 : (counterState || 0);