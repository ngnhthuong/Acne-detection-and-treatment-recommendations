import { combineReducers } from "redux";
import counterReducer from './counterReducer';
import devideReducer from './devideReducer';
import userReducer from "./userReducer";
import userRegisReducer from "./userRegisReducer";
import acnePredictionDailyReducer from "./acnePredictionDailyRouter";
import activeDialog from "./activeDialog";

const rootReducer = combineReducers({
    counter: counterReducer,
    devide: devideReducer,
    user: userReducer,
    userRegis: userRegisReducer,
    acnePredictionDaily: acnePredictionDailyReducer,
    activeDialog: activeDialog,
});

export default rootReducer;