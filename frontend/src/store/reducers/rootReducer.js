import {combineReducers} from 'redux';
import acneTreatmentReducer from './acneTreatmentReducer';
const rootReducer = combineReducers({
 acneTreatment:acneTreatmentReducer
});
export default rootReducer;