
import { combineReducers } from 'redux';
import menuRD from './menu';
import mediumItemRD from './mediumItem';
import msgErrorRD from './error';
import authRD from './auth';
import messageRD from './message';
import itemsRD from './items';

import salesRD from './sales';
import newItemRD from './newItem';
import videoRD from './video';
import videoDoubleDBRD from './videoDoubleDB,js';

export default combineReducers({
    menuRD,
    mediumItemRD,
    itemsRD,
    msgErrorRD,
    authRD,
    messageRD,
    salesRD,
    newItemRD,
    videoRD,
    videoDoubleDBRD,
    
});