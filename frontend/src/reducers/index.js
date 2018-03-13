// export default (state) => state;

import { combineReducers } from 'redux';

// import reducers
import exchangeInfo from './exchange-info';
import panelToggle from './panelToggle';

export default combineReducers({
    exchangeInfo,
    panelToggle,
});