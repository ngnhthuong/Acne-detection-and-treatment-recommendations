import { combineReducers } from "redux";
import counterReducer from './counterReducer';
import devideReducer from './devideReducer';
import userReducer from "./userReducer";
import userRegisReducer from "./userRegisReducer";
import acnePredictionDailyReducer from "./acnePredictionDailyRouter";

const rootReducer = combineReducers({
    counter: counterReducer,
    devide: devideReducer,
    user: userReducer,
    userRegis: userRegisReducer,
    acnePredictionDaily: acnePredictionDailyReducer,
});

export default rootReducer;